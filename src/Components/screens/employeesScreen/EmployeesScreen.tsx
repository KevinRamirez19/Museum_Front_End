import { useState } from "react";
import { Table, Input, Modal, message, Button, Select, DatePicker } from "antd";
import useEmployees from "../../../hooks/useEmployees";
import dayjs from "dayjs";

const { Option } = Select;

interface Employee {
  employeeId: number;
  user_Id: number;
  typeEmployee_Id: number;
  workShedule_Id: number;
  hiringDate: string;
  user: {
    names: string;
    lastNames: string;
    identificationNumber: string;
    contact: string;
  };
}

const EmployeeManagementScreen = () => {
  const {
    employees,
    typeEmployees,
    workSchedules,
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
        setEditedEmployee(null);
        message.info("Los cambios no fueron guardados");
      },
    });
  };

  const cancel = () => {
    setEditingKey(null);
    setEditedEmployee(null);
  };

  const handleFieldChange = (value: any, field: string) => {
    setEditedEmployee({
      ...editedEmployee!,
      [field]: value,
    });
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
      onCancel: () => {
        message.info("El empleado no fue eliminado");
      },
    });
  };

  const filteredEmployees = employees.filter((employee) => {
    const names = employee.user.names || "";
    const lastNames = employee.user.lastNames || "";
    return `${names} ${lastNames}`.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const employeeColumns = [
    {
      title: "Nombre",
      dataIndex: ["user", "names"],
      key: "names",
      render: (_: any, record: Employee) =>
        `${record.user.names} ${record.user.lastNames}`,
    },
    {
      title: "Número de Identificación",
      dataIndex: ["user", "identificationNumber"],
      key: "identificationNumber",
      render: (_: any, record: Employee) =>
        record.user.identificationNumber,
    },
    {
      title: "Contacto",
      dataIndex: ["user", "contact"],
      key: "contact",
      render: (_: any, record: Employee) =>
        record.user.contact,
    },
    {
      title: "Fecha de Contratación",
      dataIndex: "hiringDate",
      key: "hiringDate",
      render: (_: any, record: Employee) =>
        editingKey === record.employeeId ? (
          <DatePicker
            value={dayjs(editedEmployee?.hiringDate)}
            onChange={(date) => handleFieldChange(date?.toISOString(), "hiringDate")}
          />
        ) : (
          dayjs(record.hiringDate).format("DD/MM/YYYY")
        ),
    },
    {
      title: "Tipo de Empleado",
      dataIndex: "typeEmployee_Id",
      key: "typeEmployee",
      render: (_: any, record: Employee) =>
        editingKey === record.employeeId ? (
          <Select
            value={editedEmployee?.typeEmployee_Id}
            onChange={(value) => handleFieldChange(value, "typeEmployee_Id")}
            style={{ width: 200 }}
          >
            {typeEmployees.map((type) => (
              <Option key={type.typeEmployee_Id} value={type.typeEmployee_Id}>
                {type.typeEmployee}
              </Option>
            ))}
          </Select>
        ) : (
          typeEmployees.find((type) => type.typeEmployee_Id === record.typeEmployee_Id)?.typeEmployee || "Sin tipo"
        ),
    },
    {
      title: "Horario de Trabajo",
      dataIndex: "workShedule_Id",
      key: "workSchedule",
      render: (_: any, record: Employee) =>
        editingKey === record.employeeId ? (
          <Select
            value={editedEmployee?.workShedule_Id}
            onChange={(value) => handleFieldChange(value, "workShedule_Id")}
            style={{ width: 200 }}
          >
            {workSchedules.map((schedule) => (
              <Option key={schedule.workShedule_Id} value={schedule.workShedule_Id}>
                {schedule.schedule}
              </Option>
            ))}
          </Select>
        ) : (
          workSchedules.find((schedule) => schedule.workShedule_Id === record.workShedule_Id)?.schedule || "Sin horario"
        ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: Employee) =>
        editingKey === record.employeeId ? (
          <>
            <Button onClick={save} type="primary" style={{ marginRight: 8 }}>
              Guardar
            </Button>
            <Button onClick={cancel}>Cancelar</Button>
          </>
        ) : (
          <>
            <Button onClick={() => edit(record)} style={{ marginRight: 8 }}>
              Editar
            </Button>
            <Button onClick={() => handleDelete(record.employeeId)} danger>
              Eliminar
            </Button>
          </>
        ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Buscar empleado por nombre o apellido"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table
        columns={employeeColumns}
        dataSource={filteredEmployees}
        rowKey="employeeId"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default EmployeeManagementScreen;
