import React from 'react'
import 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

import './Login.css'
import { URLS, url_servidor } from '../helpers/routes'
import { postFetch } from '../helpers/peticiones'
import { toast, ToastContainer } from 'react-toastify'

const Login = (props) => {
  //useNavigate para cambiar la url para cargar otros componentes
  const navigate = useNavigate()
  const navegar = (url) =>{
    navigate(url)
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log("Iniciando sesion...")

    let correo,contrasenia
    correo = event.target[0].value
    contrasenia = event.target[1].value

    let datos = {
      correo,
      contrasenia
    }
    //console.log(datos)
    postFetch(URLS.login,datos)
      .then((data) =>data.json())
      .then((data) =>{
        console.log(data)
        if(data.successStatus === true){
          console.log(data)
          props.setUsername(correo)
          navegar(`/home/${correo}`)
        }else{
          toast.error(data.errorMessage, {
            position: toast.POSITION.TOP_RIGHT
          });
          console.log(data)
          //Se vacian los input
          event.target[0].value = ""
          event.target[1].value = ""
        }
      })
      .catch((error)=>{
        console.log(error)
        toast.error("Hubo un error al iniciar sesion", {
          position: toast.POSITION.TOP_RIGHT
        });
      })
  }

  return (
    <div className='login'>
      <ToastContainer />
      <div className='login-form'>
        <h1>Iniciar sesion</h1>
        <form className='login-form-input' onSubmit={handleSubmit}>
          <input  className='form-control' id='correo' placeholder='Correo'></input>
          <input  className='form-control' id='contrasenia' type={'password'} placeholder='Contraseña'></input>
          <div className='login-botones'>
            <Button variant='contained' onClick={() => navegar('/registro')}>Registrarse</Button>
            <Button type='submit' variant='contained' color='success' >Ingresar</Button>
          </div>
          <div>
            <Button onClick={() => navegar('/login-camara')}>Iniciar sesion con reconocimiento facial</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login