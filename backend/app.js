import cors from "cors";
import express from "express";

import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Directory API Running",
  });
});

app.use("/api/employees", employeeRoutes);

export default app;
