import express from "express";
import cookie from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import accountRoute from "./routes/account.route.js";
import transactionRoutes from "./routes/transaction.routes.js";

const app = express();

app.use(express.json());
app.use(cookie());

app.use("/api/auth", authRoute);
app.use("/api/account", accountRoute);
app.use("/api/transaction", transactionRoutes);

export default app;
