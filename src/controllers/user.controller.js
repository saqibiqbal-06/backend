import { asynchHandler } from "../utils/asynchandler.js";

const registerUser = asynchHandler(async (req, res) => {
  res.status(200).json({
    message: "users api",
  });
})

export { registerUser };