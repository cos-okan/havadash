import express from "express";
import bodyParser from "body-parser";
import knex from "./db/db.js";
//import userRoutes from "./api/user/user.routes.js";
//import authRoutes from "./api/auth/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
app.use(bodyParser.json());

//app.use("/api/users", userRoutes);
//app.use("/api/auth", authRoutes);

app.get("/health", async (req, res) => {
  try {
    // DB bağlantısını test et
    await knex.raw("SELECT 1+1 AS result");
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
