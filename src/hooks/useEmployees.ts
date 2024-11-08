import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

// Definir la interfaz de un Empleado
interface Employee {
  employeeId: number;
  user_Id: number;
  typeEmployee_Id: number;
  workShedule_Id: number;
  hiringDate: string;
}

// Definir interfaces para los tipos de empleados y horarios de trabajo
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

  // Función para obtener los empleados
  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>("https://nationalmuseum2.somee.com/api/Employees");
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los datos de empleados.");
      console.error("Error al cargar los datos de empleados:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener los tipos de empleados
  const fetchTypeEmployees = async () => {
    try {
      const response = await axios.get<TypeEmployee[]>("https://nationalmuseum2.somee.com/api/TypeEmployee");
      setTypeEmployees(response.data);
    } catch (err) {
      console.error("Error al cargar los tipos de empleado:", err);
    }
  };

  // Función para obtener los horarios de trabajo
  const fetchWorkSchedules = async () => {
    try {
      const response = await axios.get<WorkSchedule[]>("https://nationalmuseum2.somee.com/api/WorkSchedule");
      setWorkSchedules(response.data);
    } catch (err) {
      console.error("Error al cargar los horarios de trabajo:", err);
    }
  };

  // Función para actualizar un empleado
  const updateEmployee = async (updatedEmployee: Employee) => {
    try {
      const requestBody = {
        employeeId: updatedEmployee.employeeId,
        user_Id: updatedEmployee.user_Id,
        typeEmployee_Id: updatedEmployee.typeEmployee_Id,
        workShedule_Id: updatedEmployee.workShedule_Id,
        hiringDate: dayjs(updatedEmployee.hiringDate).toISOString(),
      };

      console.log("Request body:", requestBody);

      await axios.put("https://nationalmuseum2.somee.com/api/Employees", requestBody);
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.employeeId === updatedEmployee.employeeId ? updatedEmployee : employee
        )
      );
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
      await axios.delete(`https://nationalmuseum2.somee.com/api/Employees/${employeeId}`);
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.employeeId !== employeeId));
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
