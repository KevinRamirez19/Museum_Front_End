import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faBullseye, faInfoCircle, faHistory } from "@fortawesome/free-solid-svg-icons";
import './HomeScreen.css';
import { useAuth } from "../../../Context/AuthContext";
import { useState } from "react";

interface ArtRoom {
  nombre: string;
  descripcion: string;
  resumen: string;
  icon: any; // Ajusta el tipo si tienes un tipo específico para el ícono
  image?: string;
}

const artRooms: ArtRoom[] = [
  {
    nombre: "Visión",
    descripcion: "Inspirar y preservar el patrimonio cultural de Colombia para promover identidad y diversidad.",
    resumen: "Colombia sea una sociedad solidaria, respetuosa, que fomente la paz y que reconozca la pluralidad y democracia.",
    icon: faEye,
  },
  {
    nombre: "Misión",
    descripcion: "El Museo Nacional de Colombia evoca los eventos históricos de nuestra nación, preservando y difundiendo su legado cultural.",
    resumen: "Reconocemos que al Museo Nacional le corresponde la misión de ser un lugar de encuentro...",
    icon: faBullseye,
  },
  {
    nombre: "Introducción",
    descripcion: "Descubre los secretos del pasado en el Museo Nacional de Colombia, un viaje a través de la historia, el arte y la cultura del país.",
    resumen: "El Museo Nacional de Colombia es una institución emblemática dedicada a la preservación, investigación...",
    icon: faInfoCircle,
  },
  {
    nombre: "Historia",
    descripcion: "Conoce nuestra travesía a través del tiempo y la evolución cultural de Colombia.",
    resumen: "El Museo Nacional de Colombia, fundado el 28 de julio de 1823 por la Ley del primer Congreso...",
    icon: faHistory,
  },
];

const artRoomImages = [
  { nombre: "Visión", image: "https://www.museonacional.gov.co/el-museo/Documents/vision.jpg" },
  { nombre: "Misión", image: "https://www.museonacional.gov.co/el-museo/quienes-somos/Documents/mision.jpg" },
  { nombre: "Introducción", image: "https://www.museonacional.gov.co/el-museo/Documents/renov2.jpg" },
  { nombre: "Historia", image: "https://concepto.de/wp-content/uploads/2024/05/etnografia-item-8.jpeg" },
];

const artRoomsXImage = artRooms.map((artRoom) => ({
  ...artRoom,
  image: artRoomImages.find((image) => image.nombre === artRoom.nombre)?.image,
}));

const HomeScreen: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<ArtRoom | null>(null);
  const {state}=useAuth()
  console.log(state);
  
  const handleRoomClick = (artRoom: ArtRoom) => {
    setSelectedRoom(artRoom);
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="home-screen">
      <div className="welcome-section">
        <h1 className="welcome-title">BIENVENIDOS AL MUSEO NACIONAL</h1>
        <p className="welcome-subtitle">
          Explora la historia y cultura de nuestra nación, revive épocas pasadas y sumérgete en el patrimonio de Colombia.
        </p>
      </div>

      <h2 className="title">CONOCE MÁS DE NOSOTROS</h2>
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
            <h3>{selectedRoom.nombre}</h3> {/* Muestra el resumen en lugar del nombre */}
            <p>{selectedRoom.descripcion}</p> {/* Muestra la descripción en el cuerpo del modal */}
            <button onClick={closeModal} className="close-modal">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
