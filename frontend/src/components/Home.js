import React, { useEffect, useState } from 'react'

import "./Home.css" 
import Perfil from './Perfil'
import { useParams } from 'react-router-dom'
import { getDataUser } from '../helpers/dataUserRequest'
import Boot from './Boot'



const Home = (props) => {
    const {username} = useParams()
    const [dataUser, setDataUser] = useState({
        url:"",
        correo:"",
        nombre_completo:"",
        dpi:"",
        
    })

    useEffect(() => {
        //Peticion get para la informacion del usuario
        console.log(username)
        getDataUser(username,setDataUser)


        props.setUsername(username)
    }, [])

  return (
    <React.Fragment>
    <div className='contenedor'>
        <div className='contenedor-izq'>
        <div className='contenedor-izq-items'>  
            <img src={dataUser.url}></img>
            <Boot></Boot>
        </div>
        </div>
        <div className='contenedor-der'>
            <div className='info'>
                <div className='input-text'>
                    <label htmlFor='username'>Email</label>
                    <h3>{dataUser.correo}</h3>
                    <label htmlFor='nombre'>Nombre completo</label>
                    <h4>{dataUser.nombre_completo}</h4>
                    <h4>{dataUser.dpi}</h4>
                   
                </div>
                
            </div>
        </div>
    </div>
        
    </React.Fragment>
  )
}

export default Home