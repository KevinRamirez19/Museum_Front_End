import CardArtRooms from "../../cardArtRooms/CardArtRooms";
const artRooms = [
  { nombre: "arte", descripcion: "aaaaaaaaa" },
  { nombre: "historia", descripcion: "esta es una historia" },
  { nombre: "archeologia", descripcion: "esto es una arqueología" },
  { nombre: "Biologia", descripcion: "esto es una arqueología" },
];

const artRoomImages = [
  { nombre: "arte", image: "/11212472.jpg" },
  {
    nombre: "historia",
    image:
      "https://www.unir.net/wp-content/uploads/2021/11/cabecerahistoriografia-min.jpg",
  },
  {
    name: "arqueologia",
    image:
      "https://static.nationalgeographicla.com/files/styles/image_3200/public/1_archeologygallery_nationalgeographic_611691.jpg?w=1190&h=884",
  },
];

const artRoomsXImage = artRooms.map((artRoom) => ({
  name: artRoom.nombre,
  description: artRoom.descripcion,
  image: artRoomImages.find((image) => image.name === artRoom.nombre)?.image,
}));

function HomeScreen() {
  return (
    <>
      <h1>bienvenidos</h1>
      {artRoomsXImage.map((artRoom) => (
        <CardArtRooms {...artRoom} />
      ))}
    </>
  );
}

export default HomeScreen;