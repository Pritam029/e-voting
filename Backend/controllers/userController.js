import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';


// Route for user login (this is not fully implemented yet)
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.json({ success: false, message: "User doesn't exist!" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        res.json({ success: true, message: "Login successful", voterObject: user });
    } else {
        return res.json({ success: false, message: "Invalid credentials!" });
    }
}
const getVoter = async (req, res) => {
    try {
        const voters = await userModel.find();
        res.json(voters);
    } catch (error) {
        console.error('Error getting voters:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteVoter = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from the request parameters
        console.log(id);

        if (!id) {
            return res.status(400).json({ message: "Voter ID is required" });
        }
        const result = await userModel.findById(id); // Delete voter by ID
        if (result.profilePicture) {
            const parts = result.profilePicture.split('/');
            const lastPart = parts[parts.length - 1];
            const publicId = lastPart.split('.')[0];
            await cloudinary.uploader.destroy(publicId);
            console.log(`Image with public_id ${publicId} deleted from Cloudinary`);
        } else {
            console.log("No image found for this voter.");
        }

        await userModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Voter not found" });
        }

        res.json({ message: "Voter deleted successfully", voter: result });
    } catch (error) {
        console.error("Error deleting voter:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Route for user registration
const registerUser = async (req, res) => {
    try {


        const { firstName, lastName, email, pass, phone, voterId, dob, state, city } = req.body;
        const calculateAge = (dob) => {
            const dobi = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - dobi.getFullYear();
            const monthDifference = today.getMonth() - dobi.getMonth();
            const dayDifference = today.getDate() - dobi.getDate();

            if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
                age--;
            }

            return age;
        }
        const age = calculateAge(dob);
        // Validate required fields
        if (!firstName || !lastName || !email || !pass || !phone || !voterId || !dob || !state || !city) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        // console.log("Request received", firstName, lastName, email, pass, phone, voterId, dob, state, city );

        // Check if the email or voterId already exists
        const existingUser = await userModel.findOne({ $or: [{ email }, { voterId }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email or Voter ID already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);

        let imageUrl = null;
        // console.log(req.file);
        // Check if there's an uploaded file (image)
        if (req.file) {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
            imageUrl = result.secure_url; // Store the image URL
            console.log(imageUrl)
        }
        // console.log(imageUrl);

        // Create new user with the image URL (if uploaded)
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            voterId,
            dob,
            age,
            state,
            city,
            profilePicture: imageUrl || null, // Store Cloudinary URL or null if no image
        });

        // Save user to the database
        await newUser.save();
        // const users=await userModel.find();
        // console.log(users);
        // Send success response
        res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updateVoter = async (req, res) => {
    try {
        // Get the voter's ID from the URL parameters
        const voterId = req.params.id;

        // Find the voter by their ID
        const voter = await userModel.findById(voterId);
        console.log(voterId);

        // Check if the voter exists
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }

        // Check if the voter has already voted
        if (voter.voteStatus) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        // Set the voteStatus to true
        voter.voteStatus = true;

        // Save the updated voter data
        await voter.save();

        // Return the updated voter object in the response
        res.json({
            message: 'Vote status updated successfully.',
            voter: voter,
        });
    } catch (error) {
        console.error('Error updating voter vote status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateVoterDetails = async (req, res) => {
    try {
        // Get the voter's ID from the URL parameters
        const voterId = req.params.id;

        // Find the voter by their ID
        const voter = await userModel.findById(voterId);

        // Check if the voter exists
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }

        // Extract the fields to update from the request body
        const { profilePicture, voteStatus, ...updates } = req.body;

        // Prevent updates to profilePicture and voteStatus
        if (profilePicture || voteStatus !== undefined) {
            return res.status(400).json({
                message: 'Cannot update profile picture or vote status through this endpoint.',
            });
        }

        // Update the allowed fields
        Object.assign(voter, updates);

        // Save the updated voter data
        await voter.save();

        // Return the updated voter object in the response
        res.json({
            message: 'Voter details updated successfully.',
            voter,
        });
    } catch (error) {
        console.error('Error updating voter details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export { loginUser, registerUser, updateVoter, getVoter, deleteVoter, updateVoterDetails };
