// src/components/EmployeesScreen.tsx
import { useState } from "react";
import { Table, Button, message, Modal, Input, Form } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import useEmployees from "../../../hooks/useEmployees"; // Ajusta la ruta según tu estructura de carpetas

const { Column } = Table;
const { Search } = Input;

const EmployeesScreen = () => {
  const { employees, users, typeEmployees, workSchedules, loading, error, updateEmployee, deleteEmployee } = useEmployees();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  // Función para obtener el nombre completo del usuario
  const getUserName = (userId: number) => {
    const user = users.find((u) => u.userId === userId);
    return user ? `${user.names} ${user.lastNames}` : "Desconocido";
  };

  // Función para obtener el tipo de empleado
  const getTypeEmployee = (typeEmployeeId: number) => {
    const typeEmployee = typeEmployees.find((t) => t.typeEmployeeId === typeEmployeeId);
    return typeEmployee ? typeEmployee.typeEmployee : "Desconocido";
  };

  // Función para obtener el horario de trabajo
  const getWorkSchedule = (workSheduleId: number) => {
    const workSchedule = workSchedules.find((w) => w.workSheduleId === workSheduleId);
    return workSchedule ? workSchedule.workShedule : "Desconocido";
  };

  // Función para iniciar la edición de un registro
  const startEditing = (record: any) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.employeeId);
  };

  // Función para cancelar la edición
  const cancelEditing = () => {
    setEditingKey(null);
  };

  // Función para guardar los cambios de edición
  const save = async (record: any) => {
    try {
      const updatedEmployee = { ...record, ...form.getFieldsValue() };
      await updateEmployee(updatedEmployee);
      setEditingKey(null);
      message.success("Empleado actualizado correctamente.");
    } catch {
      message.error("Error al actualizar el empleado.");
    }
  };

  // Función para confirmar y eliminar un empleado
  const confirmDelete = (record: any) => {
    Modal.confirm({
      title: "¿Estás seguro de que deseas eliminar este empleado?",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteEmployee(record.employeeId);
          message.success("Empleado eliminado correctamente.");
        } catch {
          message.error("Error al eliminar el empleado.");
        }
      },
    });
  };

  // Renderizado de la tabla y sus columnas
  return (
    <div>
      <h3>Gestión de Empleados</h3>
      <Search
        placeholder="Buscar por ID de empleado"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Form form={form} component={false}>
        <Table dataSource={employees} rowKey="employeeId" pagination={{ pageSize: 5 }} loading={loading}>
          <Column title="ID Empleado" dataIndex="employeeId" key="employeeId" />
          <Column title="Nombre de Usuario" key="user_Id"
            render={(_, record: any) => getUserName(record.user_Id)}
          />
          <Column title="Tipo de Empleado" key="typeEmployee_Id"
            render={(_, record: any) => getTypeEmployee(record.typeEmployee_Id)}
          />
          <Column title="Horario de Trabajo" key="workShedule_Id"
            render={(_, record: any) => getWorkSchedule(record.workShedule_Id)}
          />
          <Column
            title="Fecha de Contratación"
            dataIndex="hiringDate"
            key="hiringDate"
            render={(hiringDate: string) => new Date(hiringDate).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
          
          <Column
            title="Acciones"
            key="actions"
            render={(_, record: any) => {
              const editable = editingKey === record.employeeId;
              return editable ? (
                <>
                  <Button onClick={() => save(record)} icon={<SaveOutlined />} />
                  <Button onClick={cancelEditing} icon={<CloseOutlined />} />
                </>
              ) : (
                <>
                  <Button onClick={() => startEditing(record)} icon={<EditOutlined />} />
                  <Button onClick={() => confirmDelete(record)} icon={<DeleteOutlined />} danger />
                </>
              );
            }}
          />
        </Table>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EmployeesScreen;
