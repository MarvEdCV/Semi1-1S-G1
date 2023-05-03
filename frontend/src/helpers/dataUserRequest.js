import { postFetch } from "./peticiones"
import { URLS } from "./routes"



export const getDataUser = (username,setDataUser) =>{
    console.log(username)
    
    postFetch(URLS.perfil,{correo:username})
    .then((data)=>data.json())
    .then((data)=>{
        setDataUser({
            url:data[0].url||'',
            correo:data[0].correo||'',
            nombre_completo:data[0].nombre_completo||'',
            dpi:data[0].dpi||'',            
        })
    })
}

