import { useEffect, useState } from "react";
import myApi from "../assets/lib/axios/myApi";

interface Categories {
  idCategoria: number;
  categoria: string;
  isDeleted: boolean;
}

function useCategories() {
  const [categories, setCategories] = useState<Categories[]>([]);
  useEffect(() => {
    getCategories();
    return () => {};
  }, []);
  const getCategories = async () => {
    try {
      const categoriesRequest = await myApi.get<Categories[]>("/Categoria");
      setCategories(categoriesRequest.data);
    } catch (error) {
      console.log(error);
    }
  };
  return { categories };
}

export default useCategories;
