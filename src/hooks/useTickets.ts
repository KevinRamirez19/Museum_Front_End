import { useState, useEffect } from "react";
import dayjs from "dayjs";
import myApi from "../assets/lib/axios/myApi";

// Definir la interfaz de un Ticket
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

// Definir interfaces para los tipos de tickets y métodos de pago
interface TicketType {
  ticketTypeId: number;
  ticketType: string;
}

interface PaymentMethod {
  paymentMethodId: number;
  paymentMethod: string;
}

const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los tickets
  const fetchTickets = async () => {
    try {
      const response = await myApi.get<Ticket[]>("https://nationalmuseum2.somee.com/api/Tickets");
      setTickets(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los datos de tickets.");
      console.error("Error al cargar los datos de tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener los tipos de tickets
  const fetchTicketTypes = async () => {
    try {
      const response = await myApi.get<TicketType[]>("https://nationalmuseum2.somee.com/api/TicketType");
      setTicketTypes(response.data);
    } catch (err) {
      console.error("Error al cargar los tipos de ticket:", err);
    }
  };

  // Función para obtener los métodos de pago
  const fetchPaymentMethods = async () => {
    try {
      const response = await myApi.get<PaymentMethod[]>("https://nationalmuseum2.somee.com/api/PaymentMethod");
      setPaymentMethods(response.data);
    } catch (err) {
      console.error("Error al cargar los métodos de pago:", err);
    }
  };

  // Función para actualizar un ticket
  const updateTicket = async (updatedTicket: Ticket) => {
    try {
      const requestBody = {
        ticketId: updatedTicket.ticketId,
        employeeId: updatedTicket.employeeId,
        user_Id: updatedTicket.user.user_Id,
        visitDate: dayjs(updatedTicket.visitDate).toISOString(),
        ticketType_Id: updatedTicket.ticketType.ticketTypeId,
        paymentMethod_Id: updatedTicket.paymentMethod.paymentMethodId,
      };

      console.log("Request body:", requestBody);

      await myApi.put("/Tickets", requestBody);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) => (ticket.ticketId === updatedTicket.ticketId ? updatedTicket : ticket))
      );
      return true;
    } catch (err) {
      setError("Error al actualizar el ticket.");
      console.error("Error al actualizar el ticket:", err);
      return false;
    }
  };

  // Función para eliminar un ticket
  const deleteTicket = async (ticketId: number) => {
    try {
      await myApi.delete(`https://nationalmuseum2.somee.com/api/Tickets/${ticketId}`);
      setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.ticketId !== ticketId));
      return true;
    } catch (err) {
      setError("Error al eliminar el ticket.");
      console.error("Error al eliminar el ticket:", err);
      return false;
    }
  };

  // Cargar datos al montar el hook
  useEffect(() => {
    fetchTickets();
    fetchTicketTypes();
    fetchPaymentMethods();
  }, []);

  return {
    tickets,
    ticketTypes,
    paymentMethods,
    loading,
    error,
    updateTicket,
    deleteTicket,
  };
};

export default useTickets;
