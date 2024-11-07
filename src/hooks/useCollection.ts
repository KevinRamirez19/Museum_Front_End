// hooks/useCollection.ts
import { useState, useEffect } from "react";
import axios from "axios";

export interface Collection {
  collectionId: number;
  name: string;
  descriptiom: string;
}

const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener las colecciones
  const fetchCollections = async () => {
    try {
      const response = await axios.get<Collection[]>("https://nationalmuseum2.somee.com/api/Collection");
      setCollections(response.data);
    } catch (error) {
      setError("Error al cargar las colecciones.");
      console.error("Error al cargar las colecciones:", error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una colección
  const deleteCollection = async (collectionId: number) => {
    try {
      await axios.delete(`https://nationalmuseum2.somee.com/api/Collection/${collectionId}`);
      setCollections((prevCollections) =>
        prevCollections.filter((collection) => collection.collectionId !== collectionId)
      );
      return true;
    } catch (error) {
      setError("Error al eliminar la colección.");
      console.error("Error al eliminar la colección:", error);
      return false;
    }
  };

  // Actualizar una colección
  const updateCollection = async (updatedCollection: Collection) => {
    try {
      await axios.put(
        "https://nationalmuseum2.somee.com/api/Collection",
        {
          collectionId: updatedCollection.collectionId,
          name: updatedCollection.name,
          descriptiom: updatedCollection.descriptiom,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection.collectionId === updatedCollection.collectionId ? updatedCollection : collection
        )
      );
      return true;
    } catch (error) {
      setError("Error al actualizar la colección.");
      console.error("Error al actualizar la colección:", error);
      return false;
    }
  };

  // Agregar una nueva colección
  const addCollection = async (newCollection: Collection) => {
    try {
      const response = await axios.post(
        "https://nationalmuseum2.somee.com/api/Collection",
        newCollection,
        { headers: { "Content-Type": "application/json" } }
      );
      setCollections((prevCollections) => [...prevCollections, response.data]);
      return true;
    } catch (error) {
      setError("Error al agregar la colección.");
      console.error("Error al agregar la colección:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return {
    collections,
    loading,
    error,
    deleteCollection,
    updateCollection,
    addCollection, 
  };
};

export default useCollections;
