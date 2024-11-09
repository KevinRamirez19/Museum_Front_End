import { useEffect, useState } from 'react';
import axios from 'axios';

// Define los tipos de datos que esperas de cada API
type ArtObjectType = {
  artObjectId: number;
  exhibition_Id: number;
  categoryId: number;
  state_Id: number;
  name: string;
  description: string;
  artist: string;
  creationDate: string;
  origin: string;
  cost: string;
};

type ExhibitionType = {
  exhibitionId: number;
  name: string;
};

type StateType = {
  stateId: number;
  state: string;
};

type CategoryType = {
  categoryId: number;
  category: string;
};

const useArtObjects = () => {
  const [artObjects, setArtObjects] = useState<ArtObjectType[]>([]);
  const [exhibitions, setExhibitions] = useState<ExhibitionType[]>([]);
  const [states, setStates] = useState<StateType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los objetos de arte
  const fetchArtObjects = async () => {
    setLoading(true);
    try {
      const response = await myApi.get<ArtObjectType[]>("/ArtObject");
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
      await axios.post('https://nationalmuseum2.somee.com/api/ArtObject', artObject);
    } catch (err) {
      setError('Error al crear el objeto de arte');
    }
  };

  const deleteArtObject = async (artObjectId: number) => {
    try {
      await axios.delete(`https://nationalmuseum2.somee.com/api/ArtObject/${artObjectId}`);
    } catch (err) {
      setError('Error al eliminar el objeto de arte');
    }
  };

  return { artObjects, exhibitions, states, categories, loading, error, createArtObject, deleteArtObject };
};

export default useArtObjects;
