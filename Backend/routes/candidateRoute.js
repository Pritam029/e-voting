import express from 'express';
import { createCandidate, getCandidates, editCandidate, deleteCandidate, updateVote } from '../controllers/candidateController.js';
import upload from '../middleware/multer.js';

const candidateRouter = express.Router();

// Route for creating a candidate with two image uploads
candidateRouter.post("/createCandidate", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'symbol', maxCount: 1 }]), createCandidate);

// Route to get all candidates
candidateRouter.get("/getCandidate", getCandidates);

// Route to edit a candidate
candidateRouter.put("/editCandidate/:id", editCandidate);  // PUT route for updating candidate

// Route to delete a candidate
candidateRouter.delete("/deleteCandidate/:id", deleteCandidate);

// Route to update the vote count for a candidate
candidateRouter.patch("/updateVote/:id", updateVote);  // PATCH route to update the vote count

export default candidateRouter;
