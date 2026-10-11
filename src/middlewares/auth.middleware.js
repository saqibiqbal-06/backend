import { User } from "../models/user.model.js";
import { Apierror } from "../utils/Apierror.js";
import { asynchHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asynchHandler(async (req, _, next) => {
try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
  
    if (!token) {
      throw new Apierror(401, "unautorized request");
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken "
    );
  
    if (!user) {
      throw new Apierror(401, "Invalid Access Token");
    }
  
    req.user = user;
    next();
} catch (error) {
  throw new Apierror(401, error?.message || "Invalid Access Token")
}
});
