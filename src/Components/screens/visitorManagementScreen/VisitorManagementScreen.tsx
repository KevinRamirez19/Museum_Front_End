import { useState } from "react";
import { Table, Input, Modal, message, Button, DatePicker, Select } from "antd";
import useTickets from "../../../hooks/useTickets";
import dayjs from "dayjs";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface Ticket {
  ticketId: number;
  visitDate: string;
  ticketType: { ticketTypeId: number; ticketType: string };
  paymentMethod: { paymentMethodId: number; paymentMethod: string };
  user: {
    user_Id: number;
    names: string;
    lastNames: string;
    identificationNumber: string;
  };
  employeeId: number;
}

const VisitorManagementScreen = () => {
  const { tickets, ticketTypes, paymentMethods, loading, error, updateTicket, deleteTicket } = useTickets();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editedTicket, setEditedTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { state } = useAuth();
  const navigate = useNavigate();

  if (!state.user) {
    navigate("/login");
  }

  const edit = (record: Ticket) => {
    setEditingKey(record.ticketId);
    setEditedTicket({ ...record });
  };

  const save = async () => {
    if (!editedTicket) return;

    Modal.confirm({
      title: "¿Está seguro de que desea guardar los cambios?",
      onOk: async () => {
        const success = await updateTicket(editedTicket);
        if (success) {
          message.success("Cambios guardados exitosamente");
          setEditingKey(null);
          setEditedTicket(null);
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
        ...editedTicket!,
        [field]: { ...editedTicket![field], [`${field}Id`]: value },
      });
    } else {
      setEditedTicket({
        ...editedTicket!,
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

  const filteredTickets = tickets.filter((ticket) => {
    const fullName = `${ticket.user.names} ${ticket.user.lastNames}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const ticketColumns = [
    {
      title: "Usuario",
      dataIndex: "user",
      key: "userName",
      render: (_: any, record: Ticket) => `${record.user.names} ${record.user.lastNames}`,
    },
    {
      title: "Numero de documento",
      dataIndex: "employeeId",
      key: "employee",
      render: (_: any, record: Ticket) => record.user.identificationNumber,
    },
    {
      title: "Fecha de Visita",
      dataIndex: "visitDate",
      key: "visitDate",
      render: (_: any, record: Ticket) =>
        editingKey === record.ticketId ? (
          <DatePicker
            value={dayjs(editedTicket?.visitDate)}
            onChange={(date) => handleFieldChange(date?.toISOString(), "visitDate")}
          />
        ) : (
          formatDate(record.visitDate)
        ),
    },
    {
      title: "Tipo de Ticket",
      dataIndex: ["ticketType", "ticketType"],
      key: "ticketType",
      render: (_: any, record: Ticket) =>
        editingKey === record.ticketId ? (
          <Select
            value={editedTicket?.ticketType?.ticketTypeId}
            onChange={(value) => handleFieldChange(value, "ticketType")}
            style={{ width: 200 }}
          >
            {ticketTypes.map((type) => (
              <Option key={type.ticketTypeId} value={type.ticketTypeId}>
                {type.ticketType}
              </Option>
            ))}
          </Select>
        ) : (
          record.ticketType.ticketType
        ),
    },
    {
      title: "Método de Pago",
      dataIndex: ["paymentMethod", "paymentMethod"],
      key: "paymentMethod",
      render: (_: any, record: Ticket) =>
        editingKey === record.ticketId ? (
          <Select
            value={editedTicket?.paymentMethod?.paymentMethodId}
            onChange={(value) => handleFieldChange(value, "paymentMethod")}
            style={{ width: 200 }}
          >
            {paymentMethods.map((method) => (
              <Option key={method.paymentMethodId} value={method.paymentMethodId}>
                {method.paymentMethod}
              </Option>
            ))}
          </Select>
        ) : (
          record.paymentMethod.paymentMethod
        ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: Ticket) =>
        editingKey === record.ticketId ? (
          <>
            {state.user?.userType === 1 && (
              <>
                <Button onClick={save} type="link">
                  Guardar
                </Button>
                <Button onClick={cancel} type="link">
                  Cancelar
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            {state.user?.userType === 1 && (
              <>
                <Button onClick={() => edit(record)} type="link">
                  Editar
                </Button>
                <Button onClick={() => handleDelete(record.ticketId)} type="link" danger>
                  Eliminar
                </Button>
              </>
            )}
          </>
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
      <Input
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20, width: 300 }}
      />
      <Table
        columns={ticketColumns}
        dataSource={filteredTickets}
        rowKey="ticketId"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default VisitorManagementScreen;
