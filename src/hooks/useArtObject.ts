import { useState, useEffect } from "react";
import myApi from "../assets/lib/axios/myApi";

// Tipos de datos para el hook
interface StateType {
  stateId: number;
  state: string;
}

interface CategoryType {
  categoryId: number;
  category: string;
}

interface ArtRoom {
  artRoomId: number;
  location_Id: number;
  collection_Id: number;
  name: string;
  description: string;
  numberExhibitions?: string;
}

interface ExhibitionType {
  exhibitionId: number;
  name: string;
  description: string;
  artRoom: ArtRoom;
}

interface ArtObjectType {
  artObjectId: number;
  exhibition_Id: number;
  category_Id: number;
  state_Id: number;
  name: string;
  description: string;
  artist: string;
  creationDate: string;
  origin: string;
  cost: string;
  exhibition: ExhibitionType;
  category: CategoryType;
  state: StateType;
}

// Hook para manejar los objetos de arte
const useArtObjects = () => {
  const [artObjects, setArtObjects] = useState<ArtObjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los objetos de arte
  const fetchArtObjects = async () => {
    setLoading(true);
    try {
      const response = await myApi.get<ArtObjectType[]>("ArtObject");
      setArtObjects(response.data);
    } catch (err) {
      setError("Error al cargar los objetos de arte.");
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar un objeto de arte
  const updateArtObject = async (updatedArtObject: ArtObjectType) => {
    try {
      const completeObject = {
        artObjectId: updatedArtObject.artObjectId,
        exhibition_Id: updatedArtObject.exhibition.exhibitionId,
        category_Id: updatedArtObject.category.categoryId,
        state_Id: updatedArtObject.state.stateId,
        name: updatedArtObject.name,
        description: updatedArtObject.description,
        artist: updatedArtObject.artist,
        creationDate: updatedArtObject.creationDate,
        origin: updatedArtObject.origin,
        cost: updatedArtObject.cost,
        exhibition: {
          exhibitionId: updatedArtObject.exhibition.exhibitionId,
          name: updatedArtObject.exhibition.name,
          description: updatedArtObject.exhibition.description,
          artRoomId: updatedArtObject.exhibition.artRoom.artRoomId, // Cambiado aquí
          artRoom: {
            artRoomId: updatedArtObject.exhibition.artRoom.artRoomId,
            location_Id: updatedArtObject.exhibition.artRoom.location_Id,
            collection_Id: updatedArtObject.exhibition.artRoom.collection_Id,
            name: updatedArtObject.exhibition.artRoom.name,
            description: updatedArtObject.exhibition.artRoom.description,
            numberExhibitions: updatedArtObject.exhibition.artRoom.numberExhibitions ?? "",
          }
        },
        category: {
          categoryId: updatedArtObject.category.categoryId,
          category: updatedArtObject.category.category,
        },
        state: {
          stateId: updatedArtObject.state.stateId,
          state: updatedArtObject.state.state,
        }
      };
            
      console.log("Datos enviados a la API:", JSON.stringify(completeObject, null, 2));
  
      // Solicitud PUT a la API
      const response = await myApi.put("/ArtObject", completeObject);
      console.log("Respuesta de la API:", response.data);
  
      // Actualizar el estado local
      setArtObjects((prev) =>
        prev.map((obj) => (obj.artObjectId === updatedArtObject.artObjectId ? completeObject : obj))
      );
    } catch (err: any) {
      console.error("Error al enviar la solicitud:", err?.response?.data || err.message);
      setError("Error al actualizar el objeto de arte.");
    }
  };
  
  
  // Función para eliminar un objeto de arte
  const deleteArtObject = async (artObjectId: number) => {
    try {
      await myApi.delete(`/ArtObject/${artObjectId}`);
      setArtObjects((prev) => prev.filter((artObject) => artObject.artObjectId !== artObjectId));
    } catch (err) {
      setError("Error al eliminar el objeto de arte.");
    }
  };

  // Hook de efecto para obtener los datos al cargar el componente
  useEffect(() => {
    fetchArtObjects();
  }, []);

  return {
    artObjects,
    loading,
    error,
    updateArtObject,
    deleteArtObject,
  };
};

export default useArtObjects;
