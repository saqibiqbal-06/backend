import { asynchHandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/Apierror.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {Apiresponse} from "../utils/Apiresponse.js"

const registerUser = asynchHandler(async (req, res) => {
  // get users detail from frontend
  //validation of user input
  //check if user already exists: username, email
  //check for images, check for avatar
  //upload image to cloudinary
  //crteate user object  - create entry in the database
  //remove password and refresh token from the response
  //check for user creation
  //send response to frontend

  const { fullname, username, email, password } = req.body;
  console.log("email:", email);

  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new Apierror(400, "All fields are required");
  }

  const existedUser = User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new Apierror(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalpath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new Apierror(400, "avatar file is required")
  }

  const avatar = await(uploadOnCloudinary(avatarLocalPath));
  const coverImage = await(uploadOnCloudinary(coverImageLocalpath));

  if(!avatar){
        throw new Apierror(400, "avatar file is required")
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await user.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new Apierror(500, "something went wrong while reistring the user")
  }

  return res.status(201).json(
    new Apiresponse(200, createdUser, "User registered successfully")
  )
});

export { registerUser };
