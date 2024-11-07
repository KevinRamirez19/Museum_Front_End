import { useEffect, useState } from 'react';
import axios from 'axios';

interface Exhibition {
  estado: string;
  fechaFinal: string;
  fechaDeInicio: string;
  nombre: string;
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

// Configura axios con una URL base para reutilizarla en todas las solicitudes
const api = axios.create({
  baseURL: 'https://nationalmuseum2.somee.com/api', 
});

export const useExhibition = () => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener todas las exhibiciones
  const fetchExhibitions = async () => {
    try {
      setLoading(true);
      const response = await api.get<Exhibition[]>('/Exhibition');
      console.log('Datos de Exhibiciones:', response.data);  // Depuración de datos
      setExhibitions(response.data);
      setError(null);  // Si la respuesta es exitosa, limpiamos el error
    } catch (error: any) {
      setError('Error al cargar las exhibiciones');
      console.error('Error al cargar las exhibiciones', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar una nueva exhibición
  const addExhibition = async (newExhibition: Exhibition) => {
    try {
      const response = await api.post('/Exhibition', newExhibition); 
      setExhibitions((prevExhibitions) => [...prevExhibitions, response.data]);
    } catch (error: any) {
      setError('Error al agregar la exhibición');
      console.error('Error al agregar la exhibición', error);
    }
  };

  // Función para eliminar una exhibición por ID
  const deleteExhibition = async (exhibitionId: number) => {
    try {
      await api.delete(`/Exhibition/${exhibitionId}`);
      setExhibitions((prevExhibitions) =>
        prevExhibitions.filter((exhibition) => exhibition.exhibitionId !== exhibitionId)
      );
    } catch (error: any) {
      setError('Error al eliminar la exhibición');
      console.error('Error al eliminar la exhibición', error);
    }
  };

  // Ejecuta fetchExhibitions cuando el componente se monta
  useEffect(() => {
    fetchExhibitions();
  }, []);

  return { exhibitions, loading, error, fetchExhibitions, addExhibition, deleteExhibition };
};
