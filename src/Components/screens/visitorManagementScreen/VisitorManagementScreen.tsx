import React, { useState } from "react";
import { Table, Input, Modal, message, Button, DatePicker, Select } from "antd";
import useTickets from "../../../hooks/useTickets";
import dayjs from "dayjs";

const { Option } = Select;

const VisitorManagementScreen = () => {
  const { tickets, loading, error, updateTicket, deleteTicket } = useTickets();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editedTicket, setEditedTicket] = useState<any>(null);

  const edit = (record: any) => {
    setEditingKey(record.ticketId);
    setEditedTicket({ ...record });
  };

  const save = async () => {
    Modal.confirm({
      title: "¿Está seguro de que desea guardar los cambios?",
      onOk: async () => {
        const success = await updateTicket(editedTicket);
        if (success) {
          message.success("Cambios guardados exitosamente");
          setEditingKey(null);
        } else {
          message.error("Error al guardar los cambios");
        }
      },
      onCancel: () => {
        message.info("Los cambios no fueron guardados");
        setEditingKey(null);
      },
    });
  };
  

  const cancel = () => {
    setEditingKey(null);
    setEditedTicket(null);
  };

  const handleFieldChange = (value: any, field: string) => {
    if (field === "ticketType" || field === "paymentMethod") {
      setEditedTicket({
        ...editedTicket,
        [field]: { [`${field}Id`]: value },
      });
    } else {
      setEditedTicket({
        ...editedTicket,
        [field]: value,
      });
    }
  };

  const handleDelete = (ticketId: number) => {
    Modal.confirm({
      title: "¿Está seguro de que desea eliminar este ticket?",
      onOk: async () => {
        const success = await deleteTicket(ticketId);
        if (success) {
          message.success("Ticket eliminado exitosamente");
        } else {
          message.error("Error al eliminar el ticket");
        }
      },
      onCancel: () => {
        message.info("El ticket no fue eliminado");
      },
    });
  };

  const ticketColumns = [
    { title: "ID Ticket", dataIndex: "ticketId", key: "ticketId" },
    {
      title: "Usuario",
      dataIndex: "user",
      key: "userName",
      render: (_: any, record: any) => `${record.user.names} ${record.user.lastNames}`,
    },
    {
      title: "Fecha de Visita",
      dataIndex: "visitDate",
      key: "visitDate",
      render: (_: any, record: any) => (
        editingKey === record.ticketId ? (
          <DatePicker
            value={dayjs(editedTicket?.visitDate)}
            onChange={(date) => handleFieldChange(date?.toISOString(), "visitDate")}
          />
        ) : (
          formatDate(record.visitDate)
        )
      ),
    },
    {
      title: "Tipo de Ticket",
      dataIndex: ["ticketType", "ticketType"],
      key: "ticketType",
      render: (_: any, record: any) => (
        editingKey === record.ticketId ? (
          <Select
            value={editedTicket?.ticketType?.ticketTypeId}
            onChange={(value) => handleFieldChange(value, "ticketType")}
            style={{ width: 200 }}
          >
            <Option value={7}>Ticket para Exposiciones Temporales</Option>
            <Option value={8}>Ticket General</Option>
          </Select>
        ) : (
          record.ticketType.ticketType
        )
      ),
    },
    {
      title: "Método de Pago",
      dataIndex: ["paymentMethod", "paymentMethod"],
      key: "paymentMethod",
      render: (_: any, record: any) => (
        editingKey === record.ticketId ? (
          <Select
            value={editedTicket?.paymentMethod?.paymentMethodId}
            onChange={(value) => handleFieldChange(value, "paymentMethod")}
            style={{ width: 200 }}
          >
            <Option value={1}>Pago en Efectivo</Option>
            <Option value={2}>Pago con Tarjeta</Option>
          </Select>
        ) : (
          record.paymentMethod.paymentMethod
        )
      ),
    },
    {
      title: "Empleado",
      dataIndex: "employeeId",
      key: "employee",
      render: (_: any, record: any) => record.user.identificationNumber,
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: any) => (
        editingKey === record.ticketId ? (
          <>
            <Button onClick={save} type="link">Guardar</Button>
            <Button onClick={cancel} type="link">Cancelar</Button>
          </>
        ) : (
          <>
            <Button onClick={() => edit(record)} type="link">Editar</Button>
            <Button onClick={() => handleDelete(record.ticketId)} type="link" danger>
              Eliminar
            </Button>
          </>
        )
      ),
    },
  ];

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  if (loading) return <div>Cargando datos de tickets...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Gestión de Visitantes</h3>
      <Table
        columns={ticketColumns}
        dataSource={tickets}
        rowKey="ticketId"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default VisitorManagementScreen;
