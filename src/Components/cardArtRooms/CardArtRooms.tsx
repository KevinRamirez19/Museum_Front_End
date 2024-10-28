import { useState } from "react";
import style from "./cardArtRoom.module.css";

interface ArtRoom {
  name: string;
  description: string;
  image?: string;
}

function CardArtRooms({ name, description, image }: ArtRoom) {
  const [color, setColor] = useState("black");
  return (
    <article
      className={`${style.cardContainer}`}
      onClick={() => setColor("blue")}
    >
      <img
        src={
          image ??
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7OeAlqM6uHBQ62GcJzbqLyAo6Cwg_hbcPlA&s"
        }
        alt="museum"
        style={{ width: 300 }}
      />
      <h2 style={{ color: color }}>{name}</h2>
      <h3>descripción</h3>
      <p>{description}</p>
    </article>
  );
}

export default CardArtRooms;
