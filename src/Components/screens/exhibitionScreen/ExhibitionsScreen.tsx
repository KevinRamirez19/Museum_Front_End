import { useState, useEffect } from "react";
import { Table, Button, message, Modal } from "antd";
import useExhibitions from "../../../hooks/useExhibition";


interface ArtRoomType {
  artRoomId: number; 
  name: string;
  description: string;
  collection_Id: number; 
}

interface ExhibitionType {
  exhibitionId: number;
  name: string;
  description: string;
  artRoomId: number;
  artRoom: ArtRoomType;  
}

const ExhibitionManagementScreen = () => {
  const { exhibitions, loading, error, deleteExhibition, deleteArtRoom } = useExhibitions();

  // Función para manejar la eliminación de una exhibición
  const handleDeleteExhibition = (exhibitionId: number) => {
    Modal.confirm({
      title: "¿Está seguro de que desea eliminar esta exposición?",
      onOk: async () => {
        const success = await deleteExhibition(exhibitionId);
        if (success) {
          message.success("Exposición eliminada exitosamente");
        } else {
          message.error("Error al eliminar la exposición");
        }
      },
      onCancel: () => {
        message.info("La exposición no fue eliminada");
      },
    });
  };

  // Función para manejar la eliminación de una sala de arte
  const handleDeleteArtRoom = (artRoomId: number) => {
    Modal.confirm({
      title: "¿Está seguro de que desea eliminar esta sala de arte?",
      onOk: async () => {
        const success = await deleteArtRoom(artRoomId);
        if (success) {
          message.success("Sala de arte eliminada exitosamente");
        } else {
          message.error("Error al eliminar la sala de arte");
        }
      },
      onCancel: () => {
        message.info("La sala de arte no fue eliminada");
      },
    });
  };

  // Columnas de las exposiciones
  const exhibitionColumns = [
    { title: "Nombre de la Exposición", dataIndex: "name", key: "name" },
    { title: "Descripción de la Exposición", dataIndex: "description", key: "description" },
    {
      title: "Sala a la que pertenece",
      dataIndex: "artRoom",
      key: "artRoomId",
      render: (artRoom: ArtRoomType) => artRoom?.artRoomId, // Mostrar artRoomId
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: ExhibitionType) => (
        <Button onClick={() => handleDeleteExhibition(record.exhibitionId)} danger>
          Eliminar
        </Button>
      ),
    },
  ];

  // Columnas de las salas de arte (artRoom)
  const artRoomColumns = [
    {
      title: "Nº Sala",
      dataIndex: "artRoomId",
      key: "artRoomId",
    },
    { title: "Nombre de la Sala", dataIndex: "name", key: "name" },
    { title: "Descripción de la Sala", dataIndex: "description", key: "description" },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: ArtRoomType) => (
        <Button onClick={() => handleDeleteArtRoom(record.artRoomId)} danger>
          Eliminar
        </Button>
      ),
    },
  ];

  if (loading) return <div>Cargando exposiciones...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Gestión de Exposiciones</h3>
      <Table
        columns={exhibitionColumns}
        dataSource={exhibitions}
        rowKey="exhibitionId"
        pagination={{ pageSize: 5 }}
      />
      <h3>Salas de Arte</h3>
      <Table
        columns={artRoomColumns}
        dataSource={[...new Map(exhibitions.map((exhibition) => [exhibition.artRoom.artRoomId, exhibition.artRoom])).values()]}
        rowKey="artRoomId"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ExhibitionManagementScreen;
