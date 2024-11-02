import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faLandmark, faFlask, faLeaf } from "@fortawesome/free-solid-svg-icons";
import './HomeScreen.css';
interface ArtRoom {
  nombre: string;
  descripcion: string;
  resumen: string;
  icon: any; // Si tienes un tipo específico para el ícono, cámbialo
  image?: string;
}

const artRooms: ArtRoom[] = [
  { nombre: "arte", descripcion: "Explora una rica colección de arte visual.", resumen: "El arte visual muestra la creatividad humana en todas sus formas.", icon: faPalette },
  { nombre: "historia", descripcion: "Revive los eventos históricos de nuestra nación.", resumen: "Revive los momentos históricos que marcaron nuestra cultura y sociedad.", icon: faLandmark },
  { nombre: "arqueología", descripcion: "Descubre los secretos del pasado.", resumen: "Sumérgete en los descubrimientos arqueológicos y el legado de las antiguas civilizaciones.", icon: faFlask },
  { nombre: "etnografia", descripcion: "Explora la diversidad de la vida.", resumen: "Conoce la diversidad cultural y las tradiciones de nuestra sociedad.", icon: faLeaf },
];

const artRoomImages = [
  { nombre: "arte", image: "https://media.admagazine.com/photos/618a6acacc7069ed5077ca7c/16:9/w_1920,c_limit/69052.jpg" },
  { nombre: "historia", image: "https://www.unir.net/wp-content/uploads/2021/11/cabecerahistoriografia-min.jpg" },
  { nombre: "arqueología", image: "https://static.nationalgeographicla.com/files/styles/image_3200/public/1_archeologygallery_nationalgeographic_611691.webp?w=1190&h=884" },
  { nombre: "etnografia", image: "https://concepto.de/wp-content/uploads/2024/05/etnografia-item-8.jpeg" },
];

const artRoomsXImage = artRooms.map((artRoom) => ({
  ...artRoom,
  image: artRoomImages.find((image) => image.nombre === artRoom.nombre)?.image,
}));

const HomeScreen: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<ArtRoom | null>(null);

  const handleRoomClick = (artRoom: ArtRoom) => {
    setSelectedRoom(artRoom);
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="home-screen">
      <div className="welcome-section">
        <h1 className="welcome-title">Bienvenidos al Museo Nacional</h1>
        <p className="welcome-subtitle">
          Explora la historia y cultura de nuestra nación, revive épocas pasadas y sumérgete en el patrimonio de Colombia.
        </p>
      </div>

      <h2 className="title">Salas de Arte</h2>
      <div className="art-rooms-container">
        {artRoomsXImage.map((artRoom) => (
          <div
            className="art-room-card"
            key={artRoom.nombre}
            onClick={() => handleRoomClick(artRoom)}
          >
            <img src={artRoom.image} alt={artRoom.nombre} className="art-room-image" />
            <div className="art-room-info">
              <h3 className="art-room-title">
                <FontAwesomeIcon icon={artRoom.icon} /> {artRoom.nombre.charAt(0).toUpperCase() + artRoom.nombre.slice(1)}
              </h3>
              <p className="art-room-description">{artRoom.descripcion}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Ventana emergente para mostrar el resumen */}
      {selectedRoom && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Resumen de {selectedRoom.nombre.charAt(0).toUpperCase() + selectedRoom.nombre.slice(1)}</h3>
            <p>{selectedRoom.resumen}</p>
            <button onClick={closeModal} className="close-modal">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
