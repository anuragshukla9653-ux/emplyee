const EmployeeCard = ({ employee, onEdit }) => {
  return (
    <div
      className="
      bg-white
      shadow-md
      rounded-xl
      p-5
      hover:shadow-lg
      transition-all
      duration-300
    "
    >
      <h2
        className="
        text-xl
        font-bold
        text-gray-800
      "
      >
        {employee.name}
      </h2>

      <div className="mt-3 space-y-2">
        <p className="text-gray-600">
          <span className="font-semibold">Role :</span> {employee.role}
        </p>

        <p className="text-gray-600">
          <span className="font-semibold">Department :</span>{" "}
          {employee.department}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onEdit(employee)}
        className="
        mt-4
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-4
        py-2
        rounded-lg
      "
      >
        Edit
      </button>
    </div>
  );
};

export default EmployeeCard;
