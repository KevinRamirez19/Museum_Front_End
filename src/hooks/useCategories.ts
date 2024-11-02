import { useEffect, useState } from "react";
import myApi from "../assets/lib/axios/myApi";

interface Categories {
  idCategoria: number;
  categoria: string;
  isDeleted: boolean;
}

function useCategories() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await myApi.get<Categories[]>("");
      setCategories(response.data);
    } catch (err) {
      setError("Error fetching categories.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, loading, error };
}

export default useCategories;
