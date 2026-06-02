import Employee from "../models/Employee.js";

const buildEmployeePayload = (body) => ({
  name: body.name?.trim(),
  role: body.role?.trim(),
  department: body.department?.trim(),
});

const hasMissingFields = ({ name, role, department }) => {
  return !name || !role || !department;
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.log("Get Employees Error :", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const employeePayload = buildEmployeePayload(req.body);

    if (hasMissingFields(employeePayload)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const employee = await Employee.create(employeePayload);

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    console.log("Create Employee Error :", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employeePayload = buildEmployeePayload(req.body);

    if (hasMissingFields(employeePayload)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const employee = await Employee.findByIdAndUpdate(
      id,
      employeePayload,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    console.log("Update Employee Error :", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
