import { useState } from "react";
import { Table, Button, message, Modal, Input, Form, Select, DatePicker } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import useEmployees from "../../../hooks/useEmployees";
import { useAuth } from "../../../Context/AuthContext";

const { Column } = Table;
const { Search } = Input;
const { Option } = Select;

const EmployeesScreen = () => {
  const { employees, users, typeEmployees, workSchedules, loading, error, updateEmployee, deleteEmployee, createEmployee } = useEmployees();
  const { state } = useAuth();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.userId === userId);
    return user ? `${user.names} ${user.lastNames}` : "Desconocido";
  };

  const getTypeEmployee = (typeEmployeeId: number) => {
    const typeEmployee = typeEmployees.find((t) => t.typeEmployeeId === typeEmployeeId);
    return typeEmployee ? typeEmployee.typeEmployee : "Desconocido";
  };

  const getWorkSchedule = (workSheduleId: number) => {
    const schedule = workSchedules.find((w) => w.workSheduleId === workSheduleId);
    return schedule ? schedule.workShedule : "Desconocido";
  };

  const startEditing = (record: any) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.employeeId);
  };

  const cancelEditing = () => {
    setEditingKey(null);
    form.resetFields();
  };

  const save = async (record: any) => {
    try {
      const updatedFields = form.getFieldsValue();
      const updatedEmployee = { ...record, ...updatedFields, workShedule_Id: updatedFields.workShedule_Id };
      await updateEmployee(updatedEmployee);
      setEditingKey(null);
      message.success("Empleado actualizado correctamente.");
    } catch {
      message.error("Error al actualizar el empleado.");
    }
  };

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

  const openCreateModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCreate = async () => {
    try {
      const newEmployee = form.getFieldsValue();
      newEmployee.hiringDate = newEmployee.hiringDate.format("YYYY-MM-DD");
      await createEmployee(newEmployee);
      setIsModalVisible(false);
      message.success("Empleado creado correctamente.");
      form.resetFields();
    } catch {
      message.error("Error al crear el empleado.");
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const userName = getUserName(employee.user_Id).toLowerCase();
    const workScheduleName = getWorkSchedule(employee.workShedule_Id).toLowerCase();
    const search = searchText.toLowerCase();

    return userName.includes(search) || workScheduleName.includes(search);
  });

  const userType = state.user?.userType;

  return (
    <div>
      <h3>Gestión de Empleados</h3>

      {/* Botón de creación disponible para admin y tipo 5 */}
      {(userType === 1 || userType === 5) && (
        <Button type="primary" onClick={openCreateModal} icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
          Crear Empleado
        </Button>
      )}

      <Search
        placeholder="Buscar por nombre de usuario o horario de trabajo"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Form form={form} component={false}>
        <Table dataSource={filteredEmployees} rowKey="employeeId" pagination={{ pageSize: 5 }} loading={loading}>
          <Column title="Nombre de Usuario" key="user_Id" render={(_, record: any) => getUserName(record.user_Id)} />
          <Column title="Tipo de Empleado" key="typeEmployee_Id" render={(_, record: any) => getTypeEmployee(record.typeEmployee_Id)} />
          <Column
            title="Horario de Trabajo"
            key="workShedule_Id"
            render={(_, record: any) => {
              const editable = editingKey === record.employeeId;
              return editable ? (
                <Form.Item name="workShedule_Id" style={{ margin: 0 }}>
                  <Select>
                    {workSchedules.map((schedule) => (
                      <Option key={schedule.workSheduleId} value={schedule.workSheduleId}>
                        {schedule.workShedule}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : (
                getWorkSchedule(record.workShedule_Id)
              );
            }}
          />
          <Column
            title="Fecha de Contratación"
            dataIndex="hiringDate"
            key="hiringDate"
            render={(hiringDate: string) =>
              new Date(hiringDate).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }
          />
          <Column
            title="Acciones"
            key="actions"
            render={(_, record: any) => {
              const editable = editingKey === record.employeeId;

              // Admin puede editar y eliminar
              if (userType === 1) {
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
              }

              // Tipo 5 no puede editar ni eliminar
              return null;
            }}
          />
        </Table>
      </Form>

      <Modal title="Crear Empleado" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={handleCreate}>
        <Form form={form} layout="vertical">
          <Form.Item name="user_Id" label="Usuario" rules={[{ required: true, message: "Seleccione un usuario" }]}>
            <Select placeholder="Seleccione un usuario">
              {users.map((user) => (
                <Option key={user.userId} value={user.userId}>
                  {`${user.names} ${user.lastNames}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="typeEmployee_Id" label="Tipo de Empleado" rules={[{ required: true, message: "Seleccione un tipo de empleado" }]}>
            <Select placeholder="Seleccione el tipo de empleado">
              {typeEmployees.map((type) => (
                <Option key={type.typeEmployeeId} value={type.typeEmployeeId}>
                  {type.typeEmployee}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="workShedule_Id" label="Horario de Trabajo" rules={[{ required: true, message: "Seleccione un horario de trabajo" }]}>
            <Select placeholder="Seleccione un horario">
              {workSchedules.map((schedule) => (
                <Option key={schedule.workSheduleId} value={schedule.workSheduleId}>
                  {schedule.workShedule}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="hiringDate" label="Fecha de Contratación" rules={[{ required: true, message: "Seleccione una fecha de contratación" }]}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default EmployeesScreen;
