import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  fullName: {type: String,required: true},
  age: {type: Number,required: true,min: 18},
  party: {type: String,required: true},
  bio: {type: String,required: true},
  image: {type: String,required: true},
  symbol: {type: String,required: true},
  createdAt: {type: Date,default: Date.now },
  voteCount:{type: Number,default:0},
});

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
