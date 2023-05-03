import React, { useState } from "react";
import Select from "react-select";
import { Button } from "@mui/material";

import "./Publicacion.css";

const Publicacion = ({nombre,descripcion,imagen}) => {

  return (
    <>
      <div className="publicacion">
        <div className="content">
          <img
            className="img"
            src={imagen}
            alt="Imagen de publicacion"
          ></img>
          <div>
            <strong>
              <p className="usuario">{nombre}</p>
            </strong>
            <p className="descripcion">
              {descripcion}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Publicacion;