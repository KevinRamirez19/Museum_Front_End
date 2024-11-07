import { useState, useEffect } from "react";
import axios from "axios";

interface Ticket {
  ticketId: number;
  visitDate: string;
  ticketType: { ticketTypeId: number; ticketType: string };
  paymentMethod: { paymentMethodId: number; paymentMethod: string };
  user: {
    names: string;
    lastNames: string;
    identificationNumber: string;
  };
  employeeId: number;
}

const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los tickets
  const fetchTickets = async () => {
    try {
      const response = await axios.get<Ticket[]>("https://nationalmuseum2.somee.com/api/Tickets");
      setTickets(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los datos de tickets.");
      console.error("Error al cargar los datos de tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar un ticket
  const updateTicket = async (updatedTicket: Ticket) => {
    try {
      const requestBody = {
        ticketId: updatedTicket.ticketId,
        user_Id: updatedTicket.user.identificationNumber,
        visitDate: updatedTicket.visitDate,
        ticketType_Id: updatedTicket.ticketType.ticketTypeId,
        paymentMethod_Id: updatedTicket.paymentMethod.paymentMethodId,
        employeeId: updatedTicket.employeeId,
      };
  
      console.log("Request body:", requestBody); // Verifica los datos enviados
  
      await axios.put("https://nationalmuseum2.somee.com/api/Tickets", requestBody);
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
  

  useEffect(() => {
    fetchTickets();
  }, []);

  return { tickets, loading, error, updateTicket };
};

export default useTickets;
