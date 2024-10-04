import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from './ApiError';
import fs from 'fs';

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (loaclFilePath: string) => {
    try {
        if (!loaclFilePath)
            return null;

        const response = await cloudinary.uploader
            .upload(loaclFilePath, { resource_type: 'auto' })
            .catch((e) => {
                throw new Error(e);
            });

        fs.unlinkSync(loaclFilePath);
        return response;
    } catch (error) {
        console.error(error);

        fs.unlinkSync(loaclFilePath);
    }
};

const deleteSingleAsset = async (public_uri: string) => {
    try {
        if (!public_uri){
            return null
        } 

        const response = await cloudinary.uploader
            .destroy(public_uri)
            .catch((e) => {
                throw new Error(e);
            });

        return response;
    } catch (error) {
        console.error(error);
    }
};

export { uploadOnCloudinary, deleteSingleAsset };
