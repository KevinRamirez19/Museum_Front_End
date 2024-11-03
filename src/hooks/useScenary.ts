import { useState, useEffect } from "react";
import axios from "axios";

interface Scenary {
  scenaryId: number;
  scenaryName: string;
  description: string;
  order: number;
}

const useScenaries = () => {
  const [scenaries, setScenaries] = useState<Scenary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener los escenarios
  const fetchScenaries = async () => {
    try {
      const response = await axios.get<Scenary[]>('https://nationalmuseum2.somee.com/api/Scenary');
      setScenaries(response.data);
    } catch (error) {
      setError("Error al cargar los escenarios.");
      console.error("Error al cargar los escenarios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un escenario
  const deleteScenary = async (scenaryId: number) => {
    try {
      await axios.delete('https://nationalmuseum2.somee.com/api/Scenary/${scenaryId}');
      setScenaries((prevScenaries) => prevScenaries.filter((scenary) => scenary.scenaryId !== scenaryId));
      return true;
    } catch (error) {
      setError("Error al eliminar el escenario.");
      console.error("Error al eliminar el escenario:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchScenaries();
  }, []);

  return {
    scenaries,
    loading,
    error,
    deleteScenary,
  };
};

export default useScenaries;