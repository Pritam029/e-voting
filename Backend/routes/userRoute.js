import express from 'express';
import { loginUser, registerUser, updateVoter,getVoter,deleteVoter,updateVoterDetails } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

// Route for user registration with image upload
userRouter.post("/register", upload.single('image'), registerUser);

// Route for user login
userRouter.post("/login", loginUser);

// Route to update the voter's vote status
userRouter.patch("/updateVote/:id", updateVoter);  // PATCH route to update voter's vote status
userRouter.get("/getVoters", getVoter);
userRouter.delete("/deleteVoters/:id", deleteVoter);
userRouter.put("/updateVoterDetails/:id", updateVoterDetails);

export default userRouter;
