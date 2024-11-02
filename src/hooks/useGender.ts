import { useState, useEffect } from "react";
import axios from "axios";

interface GenderData {
  name: string;
  value: number;
}

function useGenderData() {
  const [genderData, setGenderData] = useState<GenderData[]>([]);

  useEffect(() => {
    const fetchGenderData = async () => {
      try {
        const response = await axios.get("https://nationalmuseum2.somee.com/api/Gender");
        const users = response.data;

        const genderCounts = users.reduce((acc, user) => {
          const genderName = user.gender;
          acc[genderName] = (acc[genderName] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const formattedData: GenderData[] = Object.keys(genderCounts).map((gender) => ({
          name: gender,
          value: genderCounts[gender],
        }));

        setGenderData(formattedData);
      } catch (error) {
        console.error("Error fetching gender data:", error);
      }
    };

    fetchGenderData();
  }, []);

  return genderData;
}

export default useGenderData;
