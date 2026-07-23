import userModel from "../models/user.model.js";
import tokenBlackListModel from "../models/blackList.model.js";
import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const isBlacklisted = await tokenBlackListModel.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json({
        message: "Unauthorized access, token is invalid",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded.userId || decoded.user?._id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function authSystemUserMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access, token is missing",
    });
  }

  const isBlacklisted = await tokenBlackListModel.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({
      message: "Unauthorized access, token is invalid",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded.userId || decoded.user?._id;

    const user = await userModel.findById(userId).select("+systemUser");
    if (!user || !user.systemUser) {
      return res.status(403).json({
        message: "Forbidden access, not a system user",
      });
    }

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized access, token is invalid",
    });
  }
}

export default { authMiddleware, authSystemUserMiddleware };
