import { useState } from "react";

const initialFormData = {
  name: "",
  role: "",
  department: "",
};

const EmployeeForm = ({
  selectedEmployee,
  onCancel,
  onSave,
  submitting,
}) => {
  const [formData, setFormData] = useState(() => {
    if (!selectedEmployee) {
      return initialFormData;
    }

    return {
      name: selectedEmployee.name,
      role: selectedEmployee.role,
      department: selectedEmployee.department,
    };
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!formData.role.trim()) {
      nextErrors.role = "Role is required";
    }

    if (!formData.department.trim()) {
      nextErrors.department = "Department is required";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave({
      name: formData.name.trim(),
      role: formData.role.trim(),
      department: formData.department.trim(),
    });
  };

  return (
    <section className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {selectedEmployee ? "Edit Employee" : "Add Employee"}
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-4"
      >
        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name}</p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Role</span>
          <input
            type="text"
            name="role"
            placeholder="Frontend Developer"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.role && (
            <p className="text-sm text-red-600">{errors.role}</p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">
            Department
          </span>
          <input
            type="text"
            name="department"
            placeholder="Engineering"
            value={formData.department}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.department && (
            <p className="text-sm text-red-600">{errors.department}</p>
          )}
        </label>

        <div className="flex items-end gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {submitting ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EmployeeForm;
