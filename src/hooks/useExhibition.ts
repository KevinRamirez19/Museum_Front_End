import { useState } from 'react';
import axios from 'axios';

interface Exhibition {
  exhibitionId: number;
  name: string;
  description: string;
  artRoomId: number;
  artRoom: {
    artRoomId: number;
    location_Id: number;
    collection_Id: number;
    name: string;
    description: string;
    numberExhibitions: string;
  };
}

export const useExhibition = () => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);

  // Función para obtener todas las exhibiciones
  const fetchExhibitions = async () => {
    try {
      const response = await axios.get('https://nationalmuseum2.somee.com/api/Exhibition');
      setExhibitions(response.data);
    } catch (error) {
      console.error('Error fetching exhibitions', error);
    }
  };

  // Función para agregar una nueva exhibición
  const addExhibition = async (newExhibition: Exhibition) => {
    try {
      const response = await axios.post('https://nationalmuseum2.somee.com/api/Exhibition', newExhibition);
      setExhibitions([...exhibitions, response.data]);
    } catch (error) {
      console.error('Error adding exhibition', error);
    }
  };

  // Función para eliminar una exhibición por ID
  const deleteExhibition = async (exhibitionId: number) => {
    try {
      await axios.delete(`https://nationalmuseum2.somee.com/api/Exhibition/1${exhibitionId}`);
      setExhibitions(exhibitions.filter((exhibition) => exhibition.exhibitionId !== exhibitionId));
    } catch (error) {
      console.error('Error deleting exhibition', error);
    }
  };

  return { exhibitions, fetchExhibitions, addExhibition, deleteExhibition };
};
