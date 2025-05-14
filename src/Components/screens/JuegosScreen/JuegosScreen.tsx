  import  { useState } from "react";
  import "./Juegos.css";

  const personajes = [
   
  {
    nombre: "Simon Bolivar",
    imagen: "https://content-historia.nationalgeographic.com.es/medio/2017/12/13/bolivar_0a73f05f.jpg",
    pista: "Líder de la independencia de varios países de América del Sur.",
  },
  {
    nombre: "Gabriel Garcia Marquez",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Gabriel_Garcia_Marquez.jpg",
    pista: "Autor de 'Cien años de soledad', premio Nobel de Literatura.",
  },
  {
    nombre: "Shakira",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEOtcPHEP4Nd34Vbtn2yVEJxG9dyePF_6r-w&s",
    pista: "Cantante y compositora famosa por su música pop latina.",
  },
  {
    nombre: "Fernando Botero",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Fernando_Botero_%282018%29.jpg",
    pista: "Pintor y escultor conocido por sus figuras voluminosas.",
  },
  {
    nombre: "Policarpa Salavarrieta",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Policarpa_Salabarrieta.jpg/640px-Policarpa_Salabarrieta.jpg",
    pista: "Heroína de la independencia de Colombia, conocida como 'La Pola'.",
  },
  {
    nombre: "Carlos Vives",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxDFj3FzuFxq5y5LaqWzde_Q4BOVz2XsvdyA&s",
    pista: "Cantante y compositor reconocido por su música vallenata y pop.",
  },
  {
    nombre: "La Orquidea",
    imagen: "https://wwflac.awsassets.panda.org/img/original/img_0626__cattleya_warscewiczii_semi_alba__copy_emilio_constantino.jpg",
    pista: "Flor nacional de Colombia, símbolo de belleza y diversidad.",
  },
  {
    nombre: "Condor Andino",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9d--0nxfnCrsYAnTasJZQhXf-QKtGinsr7A&s",
    pista: "Ave emblemática de los Andes y símbolo de la fauna colombiana.",
  },
  {
    nombre: "Cafe",
    imagen: "https://s3.amazonaws.com/croperblog/2024/09/caf-.jpeg",
    pista: "Reconocido mundialmente por su calidad y sabor único.",
  },
  {
    nombre: "La Ciudad Perdida",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/YAEL_PHOTOS_898.jpg/1200px-YAEL_PHOTOS_898.jpg",
    pista: "Antiguo sitio arqueológico de la civilización Tayrona en la Sierra Nevada de Santa Marta.",
  },
];


  export default function JuegoAdivinaQuien() {
    const [nivel, setNivel] = useState(0);
    const [respuesta, setRespuesta] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [puntuacion, setPuntuacion] = useState(0);
    const [terminado, setTerminado] = useState(false);

    const personajeActual = personajes[nivel];

    const verificarRespuesta = () => {
      if (respuesta.toLowerCase().trim() === personajeActual.nombre.toLowerCase()) {
        setPuntuacion(puntuacion + 1);
        setMensaje("✅ ¡Correcto!");

        // Siguiente nivel o fin
        if (nivel + 1 < personajes.length) {
          setTimeout(() => {
            setNivel(nivel + 1);
            setRespuesta("");
            setMensaje("");
          }, 1000);
        } else {
          setTimeout(() => {
            setTerminado(true);
          }, 1000);
        }
      } else {
        setMensaje("❌ Incorrecto, intenta de nuevo.");
      }
    };

    const reiniciarJuego = () => {
      setNivel(0);
      setPuntuacion(0);
      setRespuesta("");
      setMensaje("");
      setTerminado(false);
    };

    if (terminado) {
      return (
        <div className="juego-container">
          <h1>¡Juego terminado!</h1>
          <p>Tu puntuación fue: <strong>{puntuacion}/{personajes.length}</strong></p>
          <button onClick={reiniciarJuego}>🔁 Jugar de nuevo</button>
        </div>
      );
    }

    return (
      <div className="juego-container">
        <h1>Adivina Quién Es - Nivel {nivel + 1}</h1>
        <p><strong>Pista:</strong> {personajeActual.pista}</p>
        <img src={personajeActual.imagen} alt="Pista visual" className="imagen-personaje" />
        <input
          type="text"
          placeholder="Escribe tu respuesta"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        />
        <button onClick={verificarRespuesta}>Comprobar</button>
        <p className="mensaje">{mensaje}</p>
        <p className="puntuacion">Puntuación: {puntuacion}</p>
      </div>
    );
  }
