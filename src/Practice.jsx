//http://www.apireyk.somee.com/api/Usuarios


import { useEffect, useState, useRef } from "react";

import { api } from "./api";

export const Practice = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [idTipoUsuario, setIdTipoUsuario] = useState(1);
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [telefono, setTelefono] = useState("");

  const [id, setId] = useState(0);

  const [array, setArray] = useState([
    idTipoUsuario,
    nombre,
    apellido,
    correo,
    clave,
    telefono,
  ]);

  const idRef = useRef()
  const nombreRef = useRef();
  const apellidoRef = useRef();
  const correoRef = useRef();
  const claveRef = useRef();
  const idTipoUsuarioRef = useRef();
  const telefonoRef = useRef();
  

  const getItems = async () => {
    const items = await api.get("/api/Usuarios");
    console.log(items.data);
    setArray(items.data);
  };


  let newUser;
  const addUser = () => {
    newUser = {
      id: idRef.current.value,
      nombre: nombreRef.current.value,
      apellido: apellidoRef.current.value,
      clave: claveRef.current.value,
      correo: correoRef.current.value,
      idTipoUsuario: idTipoUsuarioRef.current.value,
      telefono: telefonoRef.current.value,
    };

    postItems();
    getItems();
  };

  const postItems = async () => {
    const response = await api.post("/api/Usuarios", newUser);
    return response;
  };

  const deleteUser = async (id) => {
    const response = await api.delete(`/api/Usuarios/${id}`);
    getItems()
    return response;  
  };

  const updateUser = async (id) => {
    newUser = {
      id: parseInt(idRef.current.value),
      nombre: nombreRef.current.value,
      apellido: apellidoRef.current.value,
      clave: claveRef.current.value,
      correo: correoRef.current.value,
      idTipoUsuario: idTipoUsuarioRef.current.value,
      telefono: telefonoRef.current.value,
    };
    console.log(newUser)
    const response = await api.put(`/api/Usuarios`, newUser);
    console.log(response.data)
    getItems()
    return response
  };

  const getUserForId = async (id) => {
    const response = await api.get(`/api/Usuarios/${id}`);
    
    setId(response.data.id);
    setNombre(response.data.nombre);
    setApellido(response.data.apellido);
    setIdTipoUsuario(response.data.idTipoUsuario);
    setClave(response.data.clave);
    setTelefono(response.data.telefono);
    setCorreo(response.data.correo);
    console.log(response.data);
  };

  useEffect(() => {
    getItems();

    // putItems();
  }, []);

  return (
    <div>
      <form>
        <input type="text" placeholder="id" value={id} ref={idRef} />

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
      <button onClick={() => addUser()} type="submit">
        add user
      </button>
      <button onClick={() => updateUser()} type="submit">
        update user
      </button>

      {array.map((person) => {
        return (
          <h1>
            {person.nombre}
            <button onClick={() => deleteUser(person.id)}>delete</button>
            <button onClick={() => getUserForId(person.id)}>edit user</button>
          </h1>
        );
      })}
    </div>
  );
};

export default Practice;

