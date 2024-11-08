import { useState } from "react";
import { Table, Input, Modal, message, Button, DatePicker, Select } from "antd";
import useEmployees from "../../../hooks/useEmployees";
import dayjs from "dayjs";

const { Option } = Select;

// Definir Empleado
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

const EmployeesScreen = () => {
  const {
    employees,
    workShedule,
    typeEmployee,
    loading,
    error,
    updateEmployee,
    deleteEmployee,
  } = useEmployees();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const edit = (record: Employee) => {
    setEditingKey(record.employeeId);
    setEditedEmployee({ ...record });
  };

  const save = async () => {
    if (!editedEmployee) return;

    Modal.confirm({
      title: "¿Está seguro de que desea guardar los cambios?",
      onOk: async () => {
        const success = await updateEmployee(editedEmployee);
        if (success) {
          message.success("Cambios guardados exitosamente");
          setEditingKey(null);
          setEditedEmployee(null);
        } else {
          message.error("Error al guardar los cambios");
        }
      },
      onCancel: () => {
        setEditingKey(null);
      },
    });
  };

  const cancel = () => {
    setEditingKey(null);
    setEditedEmployee(null);
  };

  const handleFieldChange = (value: any, field: string) => {
    if (field === "workShedule" || field === "typeEmployee") {
      setEditedEmployee({
        ...editedEmployee!,
        [field]: { ...editedEmployee![field], [`${field}Id`]: value },
      });
    } else {
      setEditedEmployee({
        ...editedEmployee!,
        [field]: value,
      });
    }
  };

  const handleDelete = (employeeId: number) => {
    Modal.confirm({
      title: "¿Está seguro de que desea eliminar este empleado?",
      onOk: async () => {
        const success = await deleteEmployee(employeeId);
        if (success) {
          message.success("Empleado eliminado exitosamente");
        } else {
          message.error("Error al eliminar el empleado");
        }
      },
    });
  };

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.user.names} ${employee.user.lastNames}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const employeeColumns = [
    { title: "ID Empleado", dataIndex: "employeeId", key: "employeeId" },
    {
      title: "Nombre Completo",
      dataIndex: "user",
      key: "userName",
      render: (_: any, record: Employee) => `${record.user.names} ${record.user.lastNames}`,
    },
    {
      title: "Fecha de Contratación",
      dataIndex: "hireDate",
      key: "hireDate",
      render: (_: any, record: Employee) =>
        editingKey === record.employeeId ? (
          <DatePicker
            value={dayjs(editedEmployee?.hireDate)}
            onChange={(date) => handleFieldChange(date?.toISOString(), "hireDate")}
          />
        ) : (
          dayjs(record.hireDate).format("DD/MM/YYYY")
        ),
    },
    {
      title: "Cargo",
      dataIndex: ["workShedule", "workShedule"],
      key: "workShedule",
      render: (_: any, record: Employee) =>
        editingKey === record.employeeId ? (
          <Select
            value={editedEmployee?.workShedule?.workSheduleId}
            onChange={(value) => handleFieldChange(value, "workShedule")}
            style={{ width: 200 }}
          >
            {workShedule.map((position) => (
              <Option key={position.workSheduleId} value={position.workSheduleId}>
                {position.workShedule}
              </Option>
            ))}
          </Select>
        ) : (
          record.workShedule.workShedule
        ),
    },
    {
      title: "Tipo de Empleado",
      dataIndex: ["typeEmployee", "typeEmployee"],
      key: "typeEmployee",
      render: (_: any, record: Employee) =>
        editingKey === record.employeeId ? (
          <Select
            value={editedEmployee?.typeEmployee?.typeEmployeeId}
            onChange={(value) => handleFieldChange(value, "typeEmployee")}
            style={{ width: 200 }}
          >
            {typeEmployee.map((type) => (
              <Option key={type.typeEmployeeId} value={type.typeEmployeeId}>
                {type.typeEmployee}
              </Option>
            ))}
          </Select>
        ) : (
          record.typeEmployee.typeEmployee
        ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: Employee) =>
        editingKey === record.employeeId ? (
          <>
            <Button onClick={save}>Guardar</Button>
            <Button onClick={cancel}>Cancelar</Button>
          </>
        ) : (
          <>
            <Button onClick={() => edit(record)}>Editar</Button>
            <Button onClick={() => handleDelete(record.employeeId)}>Eliminar</Button>
          </>
        ),
    },
  ];

  return (
    <div>
      <h1>Gestión de Empleados</h1>
      <Input.Search
        placeholder="Buscar por nombre"
        onSearch={(value) => setSearchTerm(value)}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={employeeColumns}
        dataSource={filteredEmployees}
        rowKey="employeeId"
        loading={loading}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default EmployeesScreen;
