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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [artObjectsResponse, exhibitionsResponse, statesResponse, categoriesResponse] = await Promise.all([
          axios.get('https://nationalmuseum2.somee.com/api/ArtObject'),
          axios.get('https://nationalmuseum2.somee.com/api/Exhibition'),
          axios.get('https://nationalmuseum2.somee.com/api/State'),
          axios.get('https://nationalmuseum2.somee.com/api/Category'),
        ]);
  
        setArtObjects(artObjectsResponse.data);
        setExhibitions(exhibitionsResponse.data);
        setStates(statesResponse.data);
        setCategories(categoriesResponse.data);
  
        console.log('Art Objects:', artObjectsResponse.data); // Agrega este log
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const createArtObject = async (artObject: ArtObjectType) => {
    try {
      await axios.post('http://www.museumnational.somee.com/api/ArtObject', artObject);
    } catch (err) {
      setError('Error al crear el objeto de arte');
    }
  };

  const deleteArtObject = async (artObjectId: number) => {
    try {
      await axios.delete(`http://www.museumnational.somee.com/api/ArtObject/${artObjectId}`);
    } catch (err) {
      setError('Error al eliminar el objeto de arte');
    }
  };

  return { artObjects, exhibitions, states, categories, loading, error, createArtObject, deleteArtObject };
};

export default useArtObjects;
