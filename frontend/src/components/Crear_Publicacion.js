import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import Perfil from '../components/Perfil'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import FileBase64 from 'react-file-base64'
import { postFetch } from '../helpers/peticiones'
import { URLS } from '../helpers/routes'

const Crear_publicacion = (props) => {
    const [foto64, setFoto64] = useState("")
    const [filename, setFilename] = useState("")
    const [description, setDescription] = useState("")
    const [correo, setCorreo] = useState("")

    //Se obtiene el usuario de la url
    const {username} = useParams()
    
    useEffect(() => {
        props.setUsername(username);
        setCorreo(username)
      
    }, [])
    

    const resolveArguments = () => {
        console.log("entre")
        if(filename.trim() == ''){
          toast.error("Debe de seleccionar una imagene", {
            position: toast.POSITION.TOP_RIGHT
          });
    
          return false;
        }
    
        if(foto64.trim() == ''){
          toast.error("Debe de seleccionar una imagen", {
            position: toast.POSITION.TOP_RIGHT
          });
    
          return false;
        }
        if(description.trim() == ''){
            toast.error("Debe de ingresar una descripción", {
              position: toast.POSITION.TOP_RIGHT
            });
      
            return false;
          }
        return true;
      }
    const crearPublicacion = () =>{
        //Se quita el encabezado de la foto en base63 para solo dejar el contenido
        const foto = foto64.split(",")[1]
        const request = {
            foto,
            filename,
            descripcion:description,
            correo
        }
        if(resolveArguments()){
            toast.warning("Subiendo Foto!!", {
                position: toast.POSITION.TOP_RIGHT
              });
            postFetch(URLS.publicacion,request)
            .then((data)=>data.json())
            .then((data) =>{
                toast.success("La publicacion se ha subido con exito !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }).catch((error) =>{
                toast.error("Lo sentimos hubo un error intenta de nuevo", {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }) 
        }
    }
 
    const handleTextChange = event => {
        setDescription(event.target.value);
      };
  return (
    <React.Fragment>
         <ToastContainer />
        <div className='contenedor'>
            <div className='contenedor-izq'>
                <Perfil imagen={foto64}/>
            </div>
            <div className='contenedor-der'>
                <div className='info'>
                    <div className='input-text'>
                        
                        <br></br>
                            <Button variant="contained" component="label" color='error'  style={{"width":"100%"}} >
                                Seleccionar Foto
                            <div style={{"display":"none"}}>
                                <FileBase64 hidden multiple={false} onDone={({name,base64})=>{
                                    setFoto64(base64)
                                    setFilename(name)
                                    }
                                } type="file" />
                            </div>
                        </Button> 
                       
                    </div>
                    <div  className='input-text'>
                        <label htmlFor='album'>Descripción</label>
                       <textarea  className='form-control' value = {description} onChange={handleTextChange} type={'text'} id='descripcion' name='descripcion'></textarea>
                        
                    </div>
                    <Button   onClick={crearPublicacion} variant="contained" component="label"style={{"marginTop":"30px"}} >
                            Crear publicación
                        </Button>
                      
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Crear_publicacion