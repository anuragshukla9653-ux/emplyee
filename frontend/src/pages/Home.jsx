import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import SearchBar from "../components/SearchBar";
import {
  createEmployee,
  getAllEmployees,
  updateEmployee,
} from "../services/employeeService";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;

    getAllEmployees()
      .then((response) => {
        if (isMounted) {
          setEmployees(response.data.employees || []);
        }
      })
      .catch((error) => {
        if (isMounted) {
          toast.error(
            error.response?.data?.message || "Failed to fetch employees"
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return employees;
    }

    // Search checks both recruiter-requested fields and ignores casing.
    return employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(normalizedSearch) ||
        employee.department.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [employees, searchTerm]);

  const openAddForm = () => {
    setSelectedEmployee(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedEmployee(null);
    setIsFormOpen(false);
  };

  const handleSave = async (employeeData) => {
    try {
      setSubmitting(true);

      // Update local state from the API response so changes appear immediately.
      if (selectedEmployee) {
        const response = await updateEmployee(
          selectedEmployee._id,
          employeeData
        );

        setEmployees((currentEmployees) =>
          currentEmployees.map((employee) =>
            employee._id === response.data.employee._id
              ? response.data.employee
              : employee
          )
        );
        toast.success("Employee updated successfully");
      } else {
        const response = await createEmployee(employeeData);

        setEmployees((currentEmployees) => [
          response.data.employee,
          ...currentEmployees,
        ]);
        toast.success("Employee created successfully");
      }

      closeForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to save employee"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Employee Directory
            </h1>
            <p className="mt-2 text-gray-600">
              Manage employee roles and departments.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Add Employee
          </button>
        </header>

        {isFormOpen && (
          <EmployeeForm
            key={selectedEmployee?._id || "new-employee"}
            selectedEmployee={selectedEmployee}
            onCancel={closeForm}
            onSave={handleSave}
            submitting={submitting}
          />
        )}

        <div className="mb-6">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading employees...</div>
        ) : (
          <EmployeeList
            employees={filteredEmployees}
            onEdit={handleEdit}
          />
        )}
      </div>
    </main>
  );
};

export default Home;
