import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faLandmark, faFlask, faLeaf } from "@fortawesome/free-solid-svg-icons"; // Iconos para cada sala

import './HomeScreen.css';

// Información de las salas de arte
const artRooms = [
  { nombre: "arte", descripcion: "Explora una rica colección de arte visual.", icon: faPalette },
  { nombre: "historia", descripcion: "Revive los eventos históricos de nuestra nación.", icon: faLandmark },
  { nombre: "arqueología", descripcion: "Descubre los secretos del pasado.", icon: faFlask },
  { nombre: "etnografia", descripcion: "Explora la diversidad de la vida.", icon: faLeaf },
];

// Imágenes de las salas de arte
const artRoomImages = [
  { nombre: "arte", image: "https://media.admagazine.com/photos/618a6acacc7069ed5077ca7c/16:9/w_1920,c_limit/69052.jpg" },
  { nombre: "historia", image: "https://www.unir.net/wp-content/uploads/2021/11/cabecerahistoriografia-min.jpg" },
  { nombre: "arqueología", image: "https://static.nationalgeographicla.com/files/styles/image_3200/public/1_archeologygallery_nationalgeographic_611691.webp?w=1190&h=884" },
  { nombre: "etnografia", image: "https://concepto.de/wp-content/uploads/2024/05/etnografia-item-8.jpeg" },
];

// Combina los datos de las salas con las imágenes
const artRoomsXImage = artRooms.map((artRoom) => ({
  ...artRoom,
  image: artRoomImages.find((image) => image.nombre === artRoom.nombre)?.image,
}));

const HomeScreen: React.FC = () => {
  return (
    <div className="home-screen">
      {/* Sección de bienvenida */}
      <div className="welcome-section">
        <h1 className="welcome-title">Bienvenidos al Museo Nacional</h1>
        <p className="welcome-subtitle">
          Explora la historia y cultura de nuestra nación, revive épocas pasadas y sumérgete en el patrimonio de Colombia.
        </p>
        <button className="explore-button">Explorar Salas</button>
      </div>

      {/* Sección de tarjetas de salas */}
      <h2 className="title">Salas de Arte</h2>
      <div className="art-rooms-container">
        {artRoomsXImage.map((artRoom) => (
          <div className="art-room-card" key={artRoom.nombre}>
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
    </div>
  );
};

export default HomeScreen;
