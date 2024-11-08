import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faBullseye, faInfoCircle, faHistory } from "@fortawesome/free-solid-svg-icons";
import './HomeScreen.css';

interface ArtRoom {
  nombre: string;
  descripcion: string;
  resumen: string;
  icon: any; // Ajusta el tipo si tienes un tipo específico para el ícono
  image?: string;
}

const artRooms: ArtRoom[] = [
  { nombre: "Vision", descripcion: "Conoce nuestra visión: Inspirar y preservar el patrimonio cultural de Colombia para promover identidad y diversidad.", resumen: "Colombia sea una sociedad solidaria, respetuosa, que fomente la paz y que reconozca la pluralidad y democracia.", icon: faEye},
  { nombre: "Mision", descripcion: "El Museo Nacional de Colombia evoca los eventos históricos de nuestra nación, preservando y difundiendo su legado cultural.", resumen: "​Reconocemos que al Museo Nacional le corresponde la misión de ser un lugar de encuentro entre los ciudadanos de Colombia y el mundo con nuestros patrimonios, para dialogar, celebrar, reconocer y reflexionar sobre lo que fuimos, lo que somos y lo que seremos.", icon: faBullseye },
  { nombre: "Introduccion", descripcion: "Descubre los secretos del pasado en el Museo Nacional de Colombia, un viaje a través de la historia, el arte y la cultura del país", resumen: "El Museo Nacional de Colombia es una institución emblemática dedicada a la preservación, investigación y divulgación del patrimonio cultural del país. Ubicado en un edificio histórico en Bogotá, el museo alberga una amplia colección que abarca desde la época prehispánica hasta la contemporánea, incluyendo arte, arqueología, historia y etnografía. A través de sus exposiciones y programas educativos, el museo invita a los visitantes a explorar la rica diversidad cultural y la evolución histórica de Colombia, contribuyendo a la reflexión sobre la identidad nacional y el legado cultural de la nación.", icon: faInfoCircle },
  { nombre: "Historia", descripcion: "Conoce nuestra travesía a través del tiempo y la evolución cultural de Colombia", resumen: "El Museo Nacional de Colombia, fundado el 28 de julio de 1823 por la Ley del primer Congreso de la República, es el museo más antiguo del país y uno de los más antiguos de América. Abrió al público en 1824, y a lo largo de su historia ha ocupado varias sedes, incluida la antigua Penitenciaría Central de Cundinamarca desde 1948. El edificio, que fue una prisión hasta 1946, fue restaurado y adaptado como museo, y fue declarado Monumento Nacional en 1975. Entre 1989 y 2001 se realizó un proyecto de restauración integral. Actualmente, el museo está llevando a cabo un proyecto de renovación que reorganizará sus exposiciones permanentes, permitiendo una mejor comprensión de la historia y la cultura colombiana.", icon: faHistory },
];

const artRoomImages = [
  { nombre: "Vision", image: "https://www.museonacional.gov.co/el-museo/Documents/vision.jpg" },
  { nombre: "Mision", image: "https://www.museonacional.gov.co/el-museo/quienes-somos/Documents/mision.jpg" },
  { nombre: "Introduccion", image: "https://www.museonacional.gov.co/el-museo/Documents/renov2.jpg" },
  { nombre: "Historia", image: "https://concepto.de/wp-content/uploads/2024/05/etnografia-item-8.jpeg" },
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
