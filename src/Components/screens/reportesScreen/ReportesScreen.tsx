import React from "react";
import { PieChart, Legend, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import useGameStates from "../../../hooks/useGameStates"; 
import useGameProgress from "../../../hooks/useGameProgress"; 
import "./reportesScreen.css"; 

const COLORS = ["#0088FE", "#FF8042"]; 

const GameStateReportScreen = () => {
  const chartData = useGameStates(); // Datos del estado de las partidas
  const { gameProgressData, loading, error } = useGameProgress(); // Datos del progreso del juego

  if (loading) {
    return <div>Cargando datos del progreso del juego...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos del progreso: {error}</div>;
  }

  // Contar ocurrencias de cada etapa
  const progressCount = gameProgressData.reduce((acc, item) => {
    acc[item.gameProgress] = (acc[item.gameProgress] || 0) + 1; // Contar ocurrencias
    return acc;
  }, {});

  // Convertir a formato para la gráfica
  const lineChartData = Object.keys(progressCount).map((key) => ({
    name: key,              // Nombre de la etapa
    value: progressCount[key], // Conteo de ocurrencias
  }));

  return (
<div>
      <h3>Reporte del Estado de las Partidas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <h3>Progreso Acumulativo del Juego</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lineChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: "Etapas", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Logros obtenidos por usuarios", angle: -90, position: "insideLeft" }} />
          <Tooltip formatter={(value) => [`${value} veces`, "Conteo"]} />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GameStateReportScreen;
