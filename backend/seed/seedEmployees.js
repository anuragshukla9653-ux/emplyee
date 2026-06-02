import Employee from "../models/Employee.js";

const defaultEmployees = [
  {
    name: "John Doe",
    role: "Developer",
    department: "Engineering",
  },
  {
    name: "Sarah Khan",
    role: "HR Manager",
    department: "Human Resources",
  },
  {
    name: "Mike Wilson",
    role: "Designer",
    department: "Design",
  },
  {
    name: "Ali Ahmed",
    role: "Backend Developer",
    department: "Engineering",
  },
  {
    name: "Emma Smith",
    role: "Recruiter",
    department: "Human Resources",
  },
];

const seedEmployees = async () => {
  // Upsert keeps first-run seed data available without creating duplicates.
  const seedOperations = defaultEmployees.map((employee) => ({
    updateOne: {
      filter: { name: employee.name },
      update: { $setOnInsert: employee },
      upsert: true,
    },
  }));

  await Employee.bulkWrite(seedOperations);
  console.log("Seed data checked");
};

export default seedEmployees;
