import { useState } from "react";
import { Table, Input, Button, Popconfirm, message } from "antd";
import { PieChart, Legend, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import useGameStates from "../../../hooks/useGameStates";
import useGameProgress from "../../../hooks/useGameProgress";
import useScenaries from "../../../hooks/useScenary";
import { useAuth } from "../../../Context/AuthContext";
import "./ReportesScreen.css";

const COLORS = ["#0088FE", "#FF8042"];

const GameStateReportScreen = () => {
  const chartData = useGameStates();
  const { gameProgressData, loading, error } = useGameProgress();
  const { scenaries, deleteScenary } = useScenaries();
  const { state } = useAuth();
  const [searchText, setSearchText] = useState("");

  if (loading) {
    return <div>Cargando datos del progreso del juego...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos del progreso: {error}</div>;
  }

  const filteredScenaries = scenaries.filter((scenary) =>
    scenary.scenaryName.toLowerCase().includes(searchText.toLowerCase())
  );

  const scenaryColumns = [
    { title: "Nombre", dataIndex: "scenaryName", key: "scenaryName" },
    { title: "Descripción", dataIndex: "description", key: "description" },
    { title: "Orden", dataIndex: "order", key: "order" },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: any) =>
        state.user?.userType === 1 && (
          <Popconfirm
            title="¿Estás seguro de eliminar este escenario?"
            onConfirm={() => handleDelete(record.scenaryId)}
            okText="Sí"
            cancelText="No"
          >
            <Button type="link" danger>
              Eliminar
            </Button>
          </Popconfirm>
        ),
    },
  ];

  const handleDelete = async (scenaryId: number) => {
    const success = await deleteScenary(scenaryId);
    if (success) {
      message.success("Escenario eliminado correctamente.");
    } else {
      message.error("No se pudo eliminar el escenario.");
    }
  };

  const progressCount = gameProgressData.reduce((acc: { [key: string]: number }, item) => {
    acc[item.gameProgress] = (acc[item.gameProgress] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const lineChartData = Object.keys(progressCount).map((key) => ({
    name: key,
    value: progressCount[key],
  }));

  return (
    <div>
      <h3>Estado de las Partidas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
            {chartData.map((_, index) => (
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

      <h3>Reporte de Escenarios</h3>
      <Input
        placeholder="Buscar escenario por nombre"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 20 }}
      />
      <Table
        columns={scenaryColumns}
        dataSource={filteredScenaries}
        rowKey="scenaryId"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default GameStateReportScreen;
