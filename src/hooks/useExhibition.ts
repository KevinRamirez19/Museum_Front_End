import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

// Definir la interfaz de Exhibition y ArtRoom
interface ArtRoomType {
  artRoomId: number;
  location_Id: number;
  collection_Id: number;
  name: string;
  description: string;
  numberExhibitions: string;
}

interface ExhibitionType {
  exhibitionId: number;
  name: string;
  description: string;
  artRoomId: number;
  artRoom: ArtRoomType; // Relación con la sala de arte
  fechaDeInicio: string;
  fechaFinal: string;
  estado: string;
}

const useExhibitions = () => {
  const [exhibitions, setExhibitions] = useState<ExhibitionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener las exhibiciones
  const fetchExhibitions = async () => {
    try {
      const response = await axios.get<ExhibitionType[]>("https://nationalmuseum2.somee.com/api/Exhibition");
      setExhibitions(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los datos de exhibiciones.");
      console.error("Error al cargar los datos de exhibiciones:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar una exhibición
  const addExhibition = async (newExhibition: ExhibitionType) => {
    try {
      const requestBody = {
        name: newExhibition.name,
        description: newExhibition.description,
        artRoomId: newExhibition.artRoomId,
        fechaDeInicio: dayjs(newExhibition.fechaDeInicio).toISOString(),
        fechaFinal: dayjs(newExhibition.fechaFinal).toISOString(),
        estado: newExhibition.estado,
      };

      await axios.post("https://nationalmuseum2.somee.com/api/Exhibition", requestBody);
      setExhibitions((prevExhibitions) => [...prevExhibitions, newExhibition]);
      return true;
    } catch (err) {
      setError("Error al agregar la exhibición.");
      console.error("Error al agregar la exhibición:", err);
      return false;
    }
  };

  // Función para actualizar una exhibición
  const updateExhibition = async (updatedExhibition: ExhibitionType) => {
    try {
      const requestBody = {
        exhibitionId: updatedExhibition.exhibitionId,
        name: updatedExhibition.name,
        description: updatedExhibition.description,
        artRoomId: updatedExhibition.artRoomId,
        fechaDeInicio: dayjs(updatedExhibition.fechaDeInicio).toISOString(),
        fechaFinal: dayjs(updatedExhibition.fechaFinal).toISOString(),
        estado: updatedExhibition.estado,
      };

      await axios.put("https://nationalmuseum2.somee.com/api/Exhibition", requestBody);
      setExhibitions((prevExhibitions) =>
        prevExhibitions.map((exhibition) =>
          exhibition.exhibitionId === updatedExhibition.exhibitionId ? updatedExhibition : exhibition
        )
      );
      return true;
    } catch (err) {
      setError("Error al actualizar la exhibición.");
      console.error("Error al actualizar la exhibición:", err);
      return false;
    }
  };

  // Función para eliminar una exhibición
  const deleteExhibition = async (exhibitionId: number) => {
    try {
      await axios.delete(`https://nationalmuseum2.somee.com/api/Exhibition/${exhibitionId}`);
      setExhibitions((prevExhibitions) =>
        prevExhibitions.filter((exhibition) => exhibition.exhibitionId !== exhibitionId)
      );
      return true;
    } catch (err) {
      setError("Error al eliminar la exhibición.");
      console.error("Error al eliminar la exhibición:", err);
      return false;
    }
  };

  // Función para eliminar una sala de arte (ArtRoom)
  const deleteArtRoom = async (artRoomId: number) => {
    try {
      await axios.delete(`https://nationalmuseum2.somee.com/api/ArtRoom/${artRoomId}`);
      // Eliminar las exposiciones asociadas a la sala de arte también, si es necesario
      setExhibitions((prevExhibitions) =>
        prevExhibitions.filter(
          (exhibition) => exhibition.artRoom.artRoomId !== artRoomId
        )
      );
      return true;
    } catch (err) {
      setError("Error al eliminar la sala de arte.");
      console.error("Error al eliminar la sala de arte:", err);
      return false;
    }
  };

  // Cargar datos al montar el hook
  useEffect(() => {
    fetchExhibitions();
  }, []);

  return {
    exhibitions,
    loading,
    error,
    addExhibition,
    updateExhibition,
    deleteExhibition,
    deleteArtRoom,
  };
};

export default useExhibitions;
