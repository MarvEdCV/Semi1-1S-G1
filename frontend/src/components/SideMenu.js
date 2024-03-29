import React, { useState } from 'react'
import SideNav,{NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav"
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Link } from 'react-router-dom';


const SideMenu = ({username}) => {
    const [visible, setVisible] = useState(false)

    const itemStyle = {
        display: 'block',
        height: '100%',
        width: '100%',
        textDecoration: 'none'
      };


  return (
    <SideNav 
        onSelect={(selected) =>{
            console.log(selected)
        }}
        className="sidenav"
    >
        <SideNav.Toggle onClick={()=>setVisible(!visible)} expanded={!visible}/>
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
                <NavIcon>
                </NavIcon>
                <NavText className='nav-item' style={itemStyle}>
                    <Link className='nav-item-link' to={`/home/${username}`} style={itemStyle}>Home</Link>
                </NavText>
            </NavItem>
            <NavItem eventKey="crear-publicacion">
                <NavIcon>
                <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText  style={itemStyle}>
                <Link to={`/crear-publicacion/${username}`}  style={itemStyle}>Crear publicacion</Link>
                </NavText>
            </NavItem>
            <NavItem eventKey="ver-publicaciones">
                <NavIcon>
                <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText  style={itemStyle}>
                <Link to={`/ver-publicaciones/${username}`}  style={itemStyle}>Ver publicaciones</Link>
                </NavText>
            </NavItem>
            
            
            <NavItem eventKey="editar-perfil">
                <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText style={itemStyle}>
                    <Link to={`/editar-perfil/${username}`} style={itemStyle}>Editar perfil</Link>
                </NavText>
            </NavItem>
          
            <NavItem eventKey="cerrar-sesion">
                <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText style={itemStyle}>
                    <Link to={'/'} style={itemStyle}>Cerrar sesion</Link>
                </NavText>
            </NavItem>

        </SideNav.Nav>
    </SideNav>
  )
}

export default SideMenu