import { useEffect, useState } from "react";
import axios from "axios";
import myApi from "../assets/lib/axios/myApi";

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
        const response = await myApi.get("/GameProgress");
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
