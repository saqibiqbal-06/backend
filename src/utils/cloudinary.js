import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

clodinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try{
    if(!localFilePath) return null
    // Upload the file to Cloudinary 
    const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type: "auto",
    })
    //file has been uploaded to cloudinary
    console.log('File uploaded to Cloudinary:', response.secure_url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Delete the file from local storage
    return null;
  }
}

export {uploadOnCloudinary}