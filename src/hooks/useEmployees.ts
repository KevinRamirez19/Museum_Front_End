import { useState, useEffect } from "react";
import axios from "axios";

// Definir la interfaz de un Empleado
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

  // Función para obtener los horarios de trabajo
  const fetchWorkShedule = async () => {
    try {
      const response = await axios.get<WorkShedule[]>("https://nationalmuseum2.somee.com/api/Workshedule");
      setWorkShedule(response.data);
    } catch (err) {
      console.error("Error al cargar los horarios:", err);
    }
  };

  // Función para obtener los tipos de empleados
  const fetchTypeEmployees = async () => {
    try {
      const response = await axios.get<TypeEmployee[]>("https://nationalmuseum2.somee.com/api/TypeEmployee");
      setTypeEmployee(response.data);
    } catch (err) {
      console.error("Error al cargar los tipos de empleados:", err);
    }
  };

  // Función para actualizar un empleado
  const updateEmployee = async (updatedEmployee: Employee) => {
    try {
      const requestBody = {
        employeeId: updatedEmployee.employeeId,
        hireDate: updatedEmployee.hireDate,
        workSheduleId: updatedEmployee.workShedule.workSheduleId,
        employeeTypeId: updatedEmployee.typeEmployee.typeEmployeeId,
        user_Id: updatedEmployee.user.user_Id,
      };

      await axios.put("https://nationalmuseum2.somee.com/api/Employees", requestBody);
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) => (employee.employeeId === updatedEmployee.employeeId ? updatedEmployee : employee))
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
