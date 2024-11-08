import { useState, useEffect } from "react";
import axios from "axios";

// Definir la interfaz de una Sala de Arte (ArtRoom)
interface ArtRoom {
  artRoomId: number;
  location_Id: number;
  collection_Id: number;
  name: string;
  description: string;
  numberExhibitions: string;
}

// Definir interfaces para Ubicación y Colección
interface Location {
  location_Id: number;
  name: string;
}

interface Collection {
  collection_Id: number;
  name: string;
}

const useArtRooms = () => {
  const [artRooms, setArtRooms] = useState<ArtRoom[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener las salas de arte
  const fetchArtRooms = async () => {
    try {
      const response = await axios.get<ArtRoom[]>("https://nationalmuseum2.somee.com/api/ArtRoom");
      setArtRooms(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los datos de las salas de arte.");
      console.error("Error al cargar los datos de las salas de arte:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener las ubicaciones
  const fetchLocations = async () => {
    try {
      const response = await axios.get<Location[]>("https://nationalmuseum2.somee.com/api/Location");
      setLocations(response.data);
    } catch (err) {
      console.error("Error al cargar las ubicaciones:", err);
    }
  };

  // Función para obtener las colecciones
  const fetchCollections = async () => {
    try {
      const response = await axios.get<Collection[]>("https://nationalmuseum2.somee.com/api/Collection");
      setCollections(response.data);
    } catch (err) {
      console.error("Error al cargar las colecciones:", err);
    }
  };

  // Función para actualizar una sala de arte
  const updateArtRoom = async (updatedArtRoom: ArtRoom) => {
    try {
      const requestBody = {
        artRoomId: updatedArtRoom.artRoomId,
        location_Id: updatedArtRoom.location_Id,
        collection_Id: updatedArtRoom.collection_Id,
        name: updatedArtRoom.name,
        description: updatedArtRoom.description,
        numberExhibitions: updatedArtRoom.numberExhibitions,
      };

      console.log("Request body:", requestBody);

      await axios.put("https://nationalmuseum2.somee.com/api/ArtRoom", requestBody);
      setArtRooms((prevArtRooms) =>
        prevArtRooms.map((artRoom) =>
          artRoom.artRoomId === updatedArtRoom.artRoomId ? updatedArtRoom : artRoom
        )
      );
      return true;
    } catch (err) {
      setError("Error al actualizar la sala de arte.");
      console.error("Error al actualizar la sala de arte:", err);
      return false;
    }
  };

  // Función para eliminar una sala de arte
  const deleteArtRoom = async (artRoomId: number) => {
    try {
      await axios.delete(`https://nationalmuseum2.somee.com/api/ArtRoom/${artRoomId}`);
      setArtRooms((prevArtRooms) =>
        prevArtRooms.filter((artRoom) => artRoom.artRoomId !== artRoomId)
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
    fetchArtRooms();
    fetchLocations();
    fetchCollections();
  }, []);

  return {
    artRooms,
    locations,
    collections,
    loading,
    error,
    updateArtRoom,
    deleteArtRoom,
  };
};

export default useArtRooms;
