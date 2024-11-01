import CardArtRooms from "../../cardArtRooms/CardArtRooms";
import './HomeScreen.css'; // Importa tu archivo de estilos aquí

const artRooms = [
  { nombre: "arte", descripcion: "Explora el mundo del arte" },
  { nombre: "historia", descripcion: "Descubre la historia de nuestra civilización" },
  { nombre: "arqueologia", descripcion: "Aprende sobre las culturas antiguas" },
  { nombre: "biologia", descripcion: "Entiende la vida y sus procesos" },
];

const artRoomImages = [
  { nombre: "arte", image: "/11212472.jpg" },
  {
    nombre: "historia",
    image:
      "https://www.unir.net/wp-content/uploads/2021/11/cabecerahistoriografia-min.jpg",
  },
  {
    nombre: "arqueologia",
    image:
      "https://static.nationalgeographicla.com/files/styles/image_3200/public/1_archeologygallery_nationalgeographic_611691.jpg?w=1190&h=884",
  },
  {
    nombre: "biologia",
    image: "https://example.com/biologia.jpg", // Asegúrate de incluir una imagen para biología
  },
];

const artRoomsXImage = artRooms.map((artRoom) => ({
  name: artRoom.nombre,
  description: artRoom.descripcion,
  image: artRoomImages.find((image) => image.nombre === artRoom.nombre)?.image || "defaultImage.jpg", // Imagen por defecto si no se encuentra
}));

function HomeScreen() {
  return (
    <div className="home-screen">
      <h1 className="title">Bienvenidos al Museo Virtual</h1>
      <div className="art-rooms-container">
        {artRoomsXImage.map((artRoom) => (
          <CardArtRooms key={artRoom.name} {...artRoom} />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
