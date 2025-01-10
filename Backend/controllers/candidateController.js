import validator from "validator";
import candidateModel from "../models/candidateModel.js";
import { v2 as cloudinary } from 'cloudinary';

const createCandidate = async (req, res) => {
  try {
    const { fullName, age, party, bio } = req.body;

    // Validate required fields
    if (!fullName || !age || !party || !bio) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate age as a number
    if (!validator.isNumeric(age) || age < 18) {
      return res.status(400).json({ success: false, message: "Invalid age. Candidates must be at least 18 years old." });
    }

    let imageUrl = null;
    let symbolUrl = null;

    // Handle image uploads to Cloudinary
    if (req.files) {
      if (req.files.image) {
        const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, { resource_type: "image" });
        imageUrl = imageResult.secure_url;
      }

      if (req.files.symbol) {
        const symbolResult = await cloudinary.uploader.upload(req.files.symbol[0].path, { resource_type: "image" });
        symbolUrl = symbolResult.secure_url;
      }
    }

    // Ensure both images are uploaded
    if (!imageUrl || !symbolUrl) {
      return res.status(400).json({ success: false, message: "Both image and symbol are required" });
    }

    // Create new candidate
    const newCandidate = new candidateModel({
      fullName,
      age,
      party,
      bio,
      image: imageUrl,
      symbol: symbolUrl,
    });

    // Save candidate to the database
    await newCandidate.save();

    // Send success response
    res.status(201).json({ success: true, message: "Candidate created successfully", candidate: newCandidate });
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getCandidates = async (req, res) => {
    try {
      const candidates = await candidateModel.find(); // Fetch all candidates from the database
    //   console.log(candidates)
      res.status(200).json({
        success: true,
        message: "Candidates retrieved successfully",
        data: candidates,
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
  const editCandidate = async (req, res) => {
    try {
      const { id } = req.params;
      const { fullName, age, party, bio } = req.body;
      // Validate required fields
      if (!fullName || !age || !party || !bio) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
     
  
      // Find the candidate by ID
      const candidate = await candidateModel.findById(id);
      if (!candidate) {
        return res.status(404).json({ success: false, message: "Candidate not found" });
      }
  
      // Update candidate's data
      candidate.fullName = fullName;
      candidate.age = age;
      candidate.party = party;
      candidate.bio = bio;
  
  
      // Save the updated candidate
      await candidate.save();
  
      // Send success response
      res.status(200).json({ success: true, message: "Candidate updated successfully", candidate });
    } catch (error) {
      console.error("Error updating candidate:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  const deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params; // Get the candidate ID from the URL parameters

        // Find and delete the candidate by its ID
        const candidate = await candidateModel.findByIdAndDelete(id);

        // Check if the candidate was found and deleted
        if (!candidate) {
            return res.status(404).json({ success: false, message: "Candidate not found" });
        }

        // Send success response
        res.status(200).json({ success: true, message: "Candidate deleted successfully" });
    } catch (error) {
        console.error("Error deleting candidate:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
  
const updateVote = async (req, res) => {
  try {
      const candidateId = req.params.id;
      // Find the candidate by ID
      const candidate = await candidateModel.findById(candidateId);
      if (!candidate) {
          return res.status(404).json({ message: 'Candidate not found' });
      }
      // Increment the vote count by 1
      candidate.voteCount += 1;


      // Save the updated candidate back to the database
      const updatedCandidate = await candidate.save();

      // Send the updated candidate data in the response
      res.json({
          message: 'Vote successfully updated',
          data: updatedCandidate,
      });
  } catch (error) {
      console.error('Error updating vote count:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

export { createCandidate,getCandidates,editCandidate,deleteCandidate,updateVote };
