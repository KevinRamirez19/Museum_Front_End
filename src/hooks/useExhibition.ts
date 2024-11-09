import { useState, useEffect } from "react";
import axios from "axios";

import myApi from "../assets/lib/axios/myApi";

interface ArtRoomType {
  artRoomId: number;
  location_Id?: number;
  collection_Id: number;
  name: string;
  description: string;
  numberExhibitions?: string;
}

interface ExhibitionType {
  exhibitionId: number;
  name: string;
  description: string;
  artRoomId: number;
  artRoom: ArtRoomType;
  fechaDeInicio?: string;
  fechaFinal?: string;
  estado?: string;
}

const useExhibitions = () => {
  const [exhibitions, setExhibitions] = useState<ExhibitionType[]>([]);
  const [artRooms, setArtRooms] = useState<ArtRoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExhibitions = async () => {
    try {
      const response = await myApi.get<ExhibitionType[]>("/Exhibition");
      setExhibitions(response.data);
    } catch (err) {
      setError("Error al cargar las exposiciones.");
    } finally {
      setLoading(false);
    }
  };

  const fetchArtRooms = async () => {
    try {
      const response = await myApi.get<ArtRoomType[]>("/ArtRoom");
      setArtRooms(response.data);
    } catch (err) {
      setError("Error al cargar las salas de arte.");
    } finally {
      setLoading(false);
    }
  };

  const updateExhibition = async (updatedExhibition: ExhibitionType) => {
    try {
      await myApi.put("/Exhibition", updatedExhibition);
      setExhibitions((prev) => prev.map((e) => (e.exhibitionId === updatedExhibition.exhibitionId ? updatedExhibition : e)));
    } catch (err) {
      setError("Error al actualizar la exposición.");
    }
  };

  const updateArtRoom = async (updatedArtRoom: ArtRoomType) => {
    try {
      await myApi.put("/ArtRoom", updatedArtRoom);
      setArtRooms((prev) => prev.map((a) => (a.artRoomId === updatedArtRoom.artRoomId ? updatedArtRoom : a)));
    } catch (err) {
      setError("Error al actualizar la sala de arte.");
    }
  };

  const deleteExhibition = async (exhibitionId: number) => {
    try {
      await myApi.delete(`/Exhibition/${exhibitionId}`);
      setExhibitions((prev) => prev.filter((e) => e.exhibitionId !== exhibitionId));
    } catch (err) {
      setError("Error al eliminar la exposición.");
    }
  };

  const deleteArtRoom = async (artRoomId: number) => {
    try {
      await axios.delete(`/ArtRoom/${artRoomId}`);
      setArtRooms((prev) => prev.filter((a) => a.artRoomId !== artRoomId));
    } catch (err) {
      setError("Error al eliminar la sala de arte.");
    }
  };

  useEffect(() => {
    fetchExhibitions();
    fetchArtRooms();
  }, []);

  return {
    exhibitions,
    artRooms,
    loading,
    error,
    updateExhibition,
    updateArtRoom,
    deleteExhibition,
    deleteArtRoom,
  };
};

export default useExhibitions;
