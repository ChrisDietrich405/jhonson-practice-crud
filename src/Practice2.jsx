import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { api } from "./api";

const Practice2 = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [idTipoUsuario, setIdTipoUsuario] = useState(1);
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [telefono, setTelefono] = useState("");

  const [array, setArray] = useState([
    nombre,
    apellido,
    idTipoUsuario,
    correo,
    clave,
    telefono,
  ]);

  const nombreRef = useRef();
  const apellidoRef = useRef();
  const correoRef = useRef();
  const claveRef = useRef();
  const idTipoUsuarioRef = useRef();
  const telefonoRef = useRef();

  const getData = async () => {
    const response = await api.get("/api/Usuarios");
    setArray(response.data);
  };

  
  let newUser = {};

  const addNewUser = async () => {
    newUser = {
      nombre: nombreRef.current.value,
      apellido: apellidoRef.current.value,
      correo: correoRef.current.value,
      clave: claveRef.current.value,
      telefono: telefonoRef.current.value,
      idTipoUsuario: idTipoUsuarioRef.current.value,
    };
    const response = await api.post("/api/Usuarios", newUser);
    console.log(response.data);
    getData()  
  };
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <form>
        <input
          ref={nombreRef}
          placeholder="name"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          ref={apellidoRef}
          placeholder="last name"
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          ref={idTipoUsuarioRef}
          placeholder="id Tipo"
          type="text"
          value={idTipoUsuario}
          onChange={(e) => setIdTipoUsuario(e.target.value)}
        />
        <input
          ref={correoRef}
          placeholder="correo"
          type="text"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          ref={claveRef}
          placeholder="clave"
          type="text"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <input
          ref={telefonoRef}
          placeholder="telefono"
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </form>
      <button onClick={() => addNewUser()} type="submit">
        add user
      </button>
      {array.map((user) => {
        return <h2>{user.nombre}</h2>;
      })}
    </>
  );
};

export default Practice2;
