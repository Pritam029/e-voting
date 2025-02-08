import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('🙌 MongoDB connected!!!!!');
    })

<<<<<<< HEAD
   // await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
   await mongoose.connect(`mongodb+srv://pritamgarai2003:rtiwFtPNvfr50pOB@cluster0.r2md9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/e-commerce`)
=======
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
>>>>>>> fffcf01800345ce8923ee9c6c32c2b776f98b814
}

export default connectDB;