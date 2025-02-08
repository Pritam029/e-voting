import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });

        // Log confirmation message
        console.log('Cloudinary configured successfully');
    } catch (error) {
        console.error('Error configuring Cloudinary:', error);
    }
};

export default connectCloudinary;
