import { useState, useEffect } from "react";
import myApi from "../assets/lib/axios/myApi";

interface GameStateData {
  gameStateId: number;
  gameState: string;
}

const useGameStates = () => {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    myApi.get("/GameState")
      .then((response) => {
        const gameStates: GameStateData[] = response.data;

        // Procesar los datos para la gráfica
        const gameStateCounts = gameStates.reduce((acc, item) => {
          const state = item.gameState === "Partida en juego" ? "Partida en juego" : "Partida finalizada";
          acc[state] = (acc[state] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Formatear los datos para la gráfica
        const formattedData = Object.keys(gameStateCounts).map((key) => ({
          name: key,
          value: gameStateCounts[key],
        }));

        setChartData(formattedData);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de GameState:", error);
      });
  }, []);

  return chartData;
};

export default useGameStates;
