// src/hooks/useEmployees.ts
import { useState, useEffect } from "react";
import myApi from "../assets/lib/axios/myApi";

interface User {
  names: string;
  lastNames: string;
  identificationNumber: string;
  contact: string;
}

interface Employee {
  employeeId: number;
  user_Id: number;
  typeEmployee_Id: number;
  workShedule_Id: number;
  hiringDate: string;
}

interface UserType {
  userId: number;
  names: string;
  lastNames: string;
}

interface TypeEmployeeType {
  typeEmployeeId: number;
  typeEmployee: string;
}

interface WorkSheduleType {
  workSheduleId: number;
  workShedule: string;
}

// URL de la API
const API_EMPLOYEES = "https://nationalmuseum2.somee.com/api/Employees";
const API_USERS = "https://nationalmuseum2.somee.com/api/User";
const API_TYPE_EMPLOYEE = "https://nationalmuseum2.somee.com/api/TypeEmployee";
const API_WORK_SHEDULE = "https://nationalmuseum2.somee.com/api/WorkShedule";

const useEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [typeEmployees, setTypeEmployees] = useState<TypeEmployeeType[]>([]);
  const [workSchedules, setWorkSchedules] = useState<WorkSheduleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener empleados
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await myApi.get("/employees");
      const employeesData = response.data.map((employee: any) => ({
        ...employee,
        user: employee.user || {
          names: "N/A",
          lastNames: "N/A",
          identificationNumber: "N/A",
          contact: "N/A",
        },
      }));
      setEmployees(employeesData);
    } catch (err) {
      setError("Error al cargar los empleados.");
    }
  };

  // Función para obtener usuarios
  const fetchUsers = async () => {
    try {
      const response = await myApi.get("/typeEmployees");
      setTypeEmployee(response.data);
    } catch (err) {
      setError("Error al cargar los usuarios.");
    }
  };

  // Función para obtener tipos de empleado
  const fetchTypeEmployees = async () => {
    try {
      const response = await myApi.get("/workSchedules");
      setWorkShedule(response.data);
    } catch (err) {
      setError("Error al cargar los horarios de trabajo.");
    }
  };

  // Hook de efecto para cargar todos los datos al iniciar el componente
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchEmployees(), fetchUsers(), fetchTypeEmployees(), fetchWorkSchedules()])
      .catch(() => setError("Error al cargar datos iniciales."))
      .finally(() => setLoading(false));
  }, []);

  // Función para actualizar un empleado
  const updateEmployee = async (_updatedEmployee: Employee) => {
    try {
      await myApi.put(`/employees/${employees.employeeId}`, employees);
      await fetchEmployees();
      return true;
    } catch (err) {
      setError("Error al actualizar el empleado.");
    }
  };

  // Función para eliminar un empleado
  const deleteEmployee = async (employeeId: number) => {
    try {
      await myApi.delete(`/employees/${employeeId}`);
      await fetchEmployees();
      return true;
    } catch (err) {
      setError("Error al eliminar el empleado.");
    }
  };

  return {
    employees,
    users,
    typeEmployees,
    workSchedules,
    loading,
    error,
    updateEmployee,
    deleteEmployee,
  };
};

export default useEmployees;
