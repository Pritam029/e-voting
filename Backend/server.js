import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import userModel from "./models/userModel.js";
import migrateRefundField from "./config/migrateRefundField.js";
import candidateRouter from "./routes/candidateRoute.js";

// App config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();
// To add new field in existing documents
// migrateRefundField();
// const users=await userModel.find();
// users[1].voteStatus = true;
// await users[1].save();
// console.log(users);

// Middlewares
app.use(express.json())
app.use(cors())

// Api endpoints
app.use('/api/createVoter', userRouter);
app.use('/api/newCandidate',candidateRouter);

app.get('/', (req, res) => {
    res.send('API WORKING');
})

// Listen
app.listen(port, () => console.log('😎 Server started on PORT : ' + port))