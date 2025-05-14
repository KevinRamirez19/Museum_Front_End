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
    descripcion: "Conectar el alma de nuestras raíces con el pulso del mañana.",
    resumen: "Soñamos con un espacio donde la herencia cultural de Colombia se preserve, inspire y evolucione, abrazando la tecnología como puente entre generaciones.",
    icon: faEye,
  },
  {
    nombre: "Misión",
    descripcion: "Hacemos memoria viva en formato digital.",
    resumen: "Nuestro propósito es narrar la historia de Colombia desde sus voces, territorios y saberes, usando herramientas digitales para preservar, educar y emocionar a quienes se conectan con nuestro legado.",
    icon: faBullseye,
  },
  {
    nombre: "Introducción",
    descripcion: "Tu historia también es parte del museo.",
    resumen: "El Museo Nacional de Colombia es una institución emblemática dedicada a la preservación, investigación...",
    icon: faInfoCircle,
  },
  {
    nombre: "Historia",
    descripcion: "Conoce nuestra travesía a través del tiempo y la evolución cultural de Colombia.",
    resumen: "Desde tiempos ancestrales hasta la era digital, nuestra historia es una travesía de resistencia, creación y transformación. Este museo celebra esa evolución, trayendo el pasado al presente con nuevas formas de ver y sentir.",
    icon: faHistory,
  },
];

const artRoomImages = [
  { nombre: "Visión", image: "https://cdn-icons-png.flaticon.com/512/12238/12238061.png" },
  { nombre: "Misión", image: "https://www.hidrucol.co/wp-content/uploads/2021/08/Mision-de-una-empresaa.png" },
  { nombre: "Introducción", image: "https://eleternoestudiante.com/wp-content/uploads/2019/01/libro-abierto-1431370101895.jpg" },
  { nombre: "Historia", image: "https://www.unir.net/wp-content/uploads/2021/11/cabecerahistoriografia-min.jpg" },
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
        <h1 className="welcome-title">RAICES DIGITALES</h1>
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
