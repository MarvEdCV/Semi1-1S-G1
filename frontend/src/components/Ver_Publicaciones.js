import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Publicacion from "./Publicacion";
import { Button } from "@mui/material";
import Select from 'react-select';
import { postFetch } from "../helpers/peticiones";
import { URLS } from "../helpers/routes";

const Ver_Publicaciones = (props) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [categorias, setCategorias] = useState([])
  const [selectedItem, setSelectedItem] = useState([])

  const { username } = useParams();
  const [dataUser, setdataUser] = useState({
    picture_profile: "",
    name: "",
    username,
  });

  useEffect(() => {
    props.setUsername(username);

    fetch(URLS.publicaciones)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setPublicaciones(data);
      });

     
      fetch(URLS.categorias)
        .then(data => data.json())
        .then(data => {
            setCategorias(data.map(element=>({
                value:element.nombre,
                label:element.nombre
            })))
            setCategorias(categorias => [...categorias,{value:"Sin filtro",label:"Sin filtro"}])
        })
  }, []);


  const filtar_publicaciones = () => {
    if (publicaciones === "" || selectedItem === "Sin filtro") {
      fetch(URLS.publicaciones)
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          setPublicaciones(data);
        });
    } else {
      const request = { categoria:selectedItem }
      postFetch(URLS.publicaciones_categoria,request)
        .then(data => data.json())
        .then(data =>{
          console.log(data);
          setPublicaciones(data);
        }) 
    }
  };

  const handleTextChange = (event) => {
    setFiltro(event.target.value);
  };

  return (
    <>
      <div className="contenedor-ver-publicaciones">
        <div className="nav-publicaciones">
          <div className="nav-items">
            <h1 className="title-publicaciones">Publicaciones</h1>
            <div className="filter">
              <Select
                className="select-category"
                menuPosition="fixed"
                onChange={(e) => setSelectedItem(e.value)}
                type={"text"}
                options={categorias}
              />
              <Button color="error" variant="contained" onClick={filtar_publicaciones}>
                Filtrar
              </Button>
            </div>
          </div>
        </div>

        <div className="contenedor-der ver-publicaciones">
          <div className="publicaciones">
            {publicaciones.map(({ nombre_completo, descripcion, url }) => (
              <Publicacion
                nombre={nombre_completo}
                descripcion={descripcion}
                imagen={url}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ver_Publicaciones;
