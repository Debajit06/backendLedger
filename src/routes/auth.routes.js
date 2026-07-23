import express from "express";
import {
  registerController,
  loginController,
  userLogoutController,
} from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.post("/logout", userLogoutController);

export default authRoute;
