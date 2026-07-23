import accountModel from "../models/account.model.js";

async function createAccountController(req, res) {
  const user = req.user;
  try {
    const existingAccount = await accountModel.findOne({ user: user.id });
    if (existingAccount) {
      return res.status(400).json({
        success: false,
        message: "Account already exists",
      });
    }

    const account = await accountModel.create({
      user: user.id,
    });
    return res.status(201).json({
      account,
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function getUserAccountsController(req, res) {
  const accounts = await accountModel.find({ user: req.user._id });

  res.status(200).json({
    accounts,
  });
}

async function getAccountBalanceController(req, res) {
  const { accountId } = req.params;

  const account = await accountModel.findOne({
    _id: accountId,
    user: req.user._id,
  });

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  const balance = await account.getBalance();

  res.status(200).json({
    accountId: account._id,
    balance: balance,
  });
}

export default {
  createAccountController,
  getUserAccountsController,
  getAccountBalanceController,
};
