import EmployeeCard from "./EmployeeCard";

const EmployeeList = ({ employees, onEdit }) => {
  if (employees && employees.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2
          className="
          text-lg
          font-medium
          text-gray-500
        "
        >
          No employees found
        </h2>
      </div>
    );
  }

  return (
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-6
    "
    >
      {employees.map((employee) => (
        <EmployeeCard
          key={employee._id}
          employee={employee}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
