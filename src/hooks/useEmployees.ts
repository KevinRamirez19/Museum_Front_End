import { useState, useEffect } from "react";
import axios from "axios";
import myApi from "../assets/lib/axios/myApi";

interface User {
  names: string;
  lastNames: string;
  identificationNumber: string;
  contact: string;
}

interface Employee {
  employeeId: number;
  hireDate: string;
  workShedule: { workSheduleId: number; workShedule: string };
  typeEmployee: { typeEmployeeId: number; typeEmployee: string };
  user: {
    user_Id: number;
    names: string;
    lastNames: string;
    identificationNumber: string;
  };
}

// Definir interfaces 
interface WorkShedule {
  workSheduleId: number;
  workShedule: string;
}

interface TypeEmployee {
  typeEmployeeId: number;
  typeEmployee: string;
}

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [workShedule, setWorkShedule] = useState<WorkShedule[]>([]);
  const [typeEmployee, setTypeEmployee] = useState<TypeEmployee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los empleados
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
      setError("Error al cargar los datos de empleados.");
      console.error("Error al cargar los datos de empleados:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener los horarios de trabajo
  const fetchWorkShedule = async () => {
    try {
      const response = await myApi.get("/typeEmployees");
      setTypeEmployees(response.data);
    } catch (err) {
      console.error("Error al cargar los horarios:", err);
    }
  };

  // Función para obtener los tipos de empleados
  const fetchTypeEmployees = async () => {
    try {
      const response = await myApi.get("/workSchedules");
      setWorkSchedules(response.data);
    } catch (err) {
      console.error("Error al cargar los tipos de empleados:", err);
    }
  };

  // Función para actualizar un empleado
  const updateEmployee = async (updatedEmployee: Employee) => {
    try {
      await myApi.put(`/employees/${employee.employeeId}`, employee);
      await fetchEmployees();
      return true;
    } catch (err) {
      setError("Error al actualizar el empleado.");
      console.error("Error al actualizar el empleado:", err);
      return false;
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
      console.error("Error al eliminar el empleado:", err);
      return false;
    }
  };

  // Cargar datos al montar el hook
  useEffect(() => {
    fetchEmployees();
    fetchWorkShedule();
    fetchTypeEmployees();
  }, []);

  return {
    employees,
    workShedule,
    typeEmployee,
    loading,
    error,
    updateEmployee,
    deleteEmployee,
  };
};

export default useEmployees;
