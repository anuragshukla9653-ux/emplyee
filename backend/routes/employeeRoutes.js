import express from "express";

import {
  createEmployee,
  getAllEmployees,
  updateEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);

export default router;
