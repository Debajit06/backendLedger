import express from "express";
import cookie from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import accountRoute from "./routes/account.route.js";
import transactionRoutes from "./routes/transaction.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookie());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend Ledger API is live and operational 🚀",
    endpoints: {
      auth: "/api/auth",
      account: "/api/account",
      transaction: "/api/transaction",
    },
    documentation: "https://github.com/Debajit06/backendLedger",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/account", accountRoute);
app.use("/api/transaction", transactionRoutes);

export default app;
