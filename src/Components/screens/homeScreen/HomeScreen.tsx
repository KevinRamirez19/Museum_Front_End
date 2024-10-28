import CardArtRooms from "../../cardArtRooms/CardArtRooms";
const artRooms = [
  { name: "art", description: "aaaaaaaaa" },
  { name: "history", description: "esta es una historia" },
  { name: "archeology", description: "esto es una arqueología" },
  { name: "Biology", description: "esto es una arqueología" },
];

const artRoomImages = [
  { name: "art", image: "/11212472.jpg" },
  {
    name: "history",
    image:
      "https://www.unir.net/wp-content/uploads/2021/11/cabecerahistoriografia-min.jpg",
  },
  {
    name: "archeology",
    image:
      "https://static.nationalgeographicla.com/files/styles/image_3200/public/1_archeologygallery_nationalgeographic_611691.jpg?w=1190&h=884",
  },
];

const artRoomsXImage = artRooms.map((artRoom) => ({
  name: artRoom.name,
  description: artRoom.description,
  image: artRoomImages.find((image) => image.name === artRoom.name)?.image,
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