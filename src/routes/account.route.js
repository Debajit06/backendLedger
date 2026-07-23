import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import accountController from "../controllers/account.controller.js";

const accountRouter = express.Router();

accountRouter.post(
  "/",
  authMiddleware.authMiddleware,
  accountController.createAccountController,
);

accountRouter.get(
  "/",
  authMiddleware.authMiddleware,
  accountController.getUserAccountsController,
);

accountRouter.get(
  "/balance/:accountId",
  authMiddleware.authMiddleware,
  accountController.getAccountBalanceController,
);

export default accountRouter;
