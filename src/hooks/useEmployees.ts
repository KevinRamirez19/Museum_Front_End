// src/hooks/useEmployees.ts
import { useState, useEffect } from "react";
import axios from "axios";

// Tipos de datos para empleados y sus relaciones
interface EmployeeType {
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
      const response = await axios.get<EmployeeType[]>(API_EMPLOYEES);
      setEmployees(response.data);
    } catch (err) {
      setError("Error al cargar los empleados.");
    }
  };

  // Función para obtener usuarios
  const fetchUsers = async () => {
    try {
      const response = await axios.get<UserType[]>(API_USERS);
      setUsers(response.data);
    } catch (err) {
      setError("Error al cargar los usuarios.");
    }
  };

  // Función para obtener tipos de empleado
  const fetchTypeEmployees = async () => {
    try {
      const response = await axios.get<TypeEmployeeType[]>(API_TYPE_EMPLOYEE);
      setTypeEmployees(response.data);
    } catch (err) {
      setError("Error al cargar los tipos de empleados.");
    }
  };

  // Función para obtener horarios de trabajo
  const fetchWorkSchedules = async () => {
    try {
      const response = await axios.get<WorkSheduleType[]>(API_WORK_SHEDULE);
      setWorkSchedules(response.data);
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
  const updateEmployee = async (updatedEmployee: EmployeeType) => {
    try {
      await axios.put(API_EMPLOYEES, updatedEmployee);
      setEmployees((prev) =>
        prev.map((emp) => (emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp))
      );
    } catch (err: any) {
      setError("Error al actualizar el empleado.");
    }
  };

  // Función para eliminar un empleado
  const deleteEmployee = async (employeeId: number) => {
    try {
      await axios.delete(`${API_EMPLOYEES}/${employeeId}`);
      setEmployees((prev) => prev.filter((employee) => employee.employeeId !== employeeId));
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
