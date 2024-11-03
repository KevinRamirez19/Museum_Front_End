import { useEffect, useState } from "react";
import axios from "axios";

interface GameProgress {
  gameProgressId: number;
  gameProgress: string;
  description: string;
}

const useGameProgress = () => {
  const [gameProgressData, setGameProgressData] = useState<GameProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameProgress = async () => {
      try {
        const response = await axios.get("https://nationalmuseum2.somee.com/api/GameProgress");
        setGameProgressData(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameProgress();
  }, []);

  return { gameProgressData, loading, error };
};

export default useGameProgress;
