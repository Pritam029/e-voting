import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('🙌 MongoDB connected!!!!!');
    })

   // await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
   await mongoose.connect(`mongodb+srv://pritamgarai2003:rtiwFtPNvfr50pOB@cluster0.r2md9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/e-commerce`)
}

export default connectDB;