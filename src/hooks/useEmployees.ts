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
  user_Id: number;
  typeEmployee_Id: number;
  workShedule_Id: number;
  hiringDate: string;
  user: User;
}

interface TypeEmployee {
  typeEmployee_Id: number;
  typeEmployee: string;
}

interface WorkSchedule {
  workShedule_Id: number;
  schedule: string;
}

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [typeEmployees, setTypeEmployees] = useState<TypeEmployee[]>([]);
  const [workSchedules, setWorkSchedules] = useState<WorkSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    } finally {
      setLoading(false);
    }
  };

  const fetchTypeEmployees = async () => {
    try {
      const response = await myApi.get("/typeEmployees");
      setTypeEmployees(response.data);
    } catch (err) {
      setError("Error al cargar los tipos de empleados.");
    }
  };

  const fetchWorkSchedules = async () => {
    try {
      const response = await myApi.get("/workSchedules");
      setWorkSchedules(response.data);
    } catch (err) {
      setError("Error al cargar los horarios de trabajo.");
    }
  };

  const updateEmployee = async (employee: Employee) => {
    try {
      await myApi.put(`/employees/${employee.employeeId}`, employee);
      await fetchEmployees();
      return true;
    } catch (err) {
      return false;
    }
  };

  const deleteEmployee = async (employeeId: number) => {
    try {
      await myApi.delete(`/employees/${employeeId}`);
      await fetchEmployees();
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchTypeEmployees();
    fetchWorkSchedules();
  }, []);

  return {
    employees,
    typeEmployees,
    workSchedules,
    loading,
    error,
    updateEmployee,
    deleteEmployee,
  };
};

export default useEmployees;
