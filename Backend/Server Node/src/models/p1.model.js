import * as url from "url";

const {Database} = require('./../database/database')
const compareImages = require('./../utils/compare.images');
const imageProccesor = require('./../utils/analyze.image')
const translateText = require('./../utils/translate.text');
import S3 from '../aws/s3';
const uploader = new S3();
/**
 * Clase que extiende de la configuración de la base de datos
 */
class P1Model extends Database{
    static create(app){
        return new P1Model(app.locals.mysqlConnectionPool);
    }

    getAll(table){
        return this.queryView({sql:`SELECT * FROM ${table}`})
    }

    async verificarUsuarioPorCorreoODpi(correo,dpi){
        const user = await this.queryView({sql:`SELECT * FROM usuario WHERE correo = '${correo}' OR dpi = '${dpi}'`});
        return user.length > 0;
    }

    obtenerUsuarioPorId(id){
        return this.queryView({sql:`SELECT * FROM usuario WHERE usuario_id = ${id}`});
    }

    async guardarUsuario(nombre,correo,dpi,contrasenia,url){
        if(await this.verificarUsuarioPorCorreoODpi(correo,dpi)){
            return false;
        }
        const nuevoUsuario = await this.queryView({sql:`INSERT INTO usuario(nombre_completo,correo,dpi,contrasenia,url) VALUES('${nombre}','${correo}','${dpi}','${contrasenia}','${url}')`})
        return this.obtenerUsuarioPorId(nuevoUsuario.insertId)
    }

    buscarUsuario(correo){
        return this.queryView({sql: `SELECT * FROM usuario WHERE correo = '${correo}'`});
    }

    obtenerFotoPerfilUsuario(correo){
        return this.queryView({sql: `SELECT url FROM usuario WHERE correo='${correo}' LIMIT 1`})
    }

    async loginCamara(correo,picture){
        const currentPicture = await this.obtenerFotoPerfilUsuario(correo);
        const url = await uploader.uploadImage(picture, 'login');
        return await compareImages(currentPicture[0].url, url)
    }

    async nuevaPublicacion(url,base64Image,descripcion,correo){
        const labels = await imageProccesor.analyzeImage(base64Image);
        const usuarioId =  await this.queryView({sql:`SELECT * FROM usuario WHERE correo = '${correo}'`})
        let publicacion = null;
        for (const label of labels) {
            let categoriaId;
            const existCategoria = await this.queryView({sql:`SELECT * FROM categoria WHERE nombre = '${label}' LIMIT 1`})
            if(existCategoria.length > 0){
                categoriaId = existCategoria[0].categoria_id;
            }else{
                const categoria = await this.queryView({sql:`INSERT INTO categoria(nombre) VALUES('${label}')`});
                categoriaId = categoria.insertId;
            }
            publicacion = await this.queryView({sql:`INSERT INTO publicacion(descripcion,url,usuario_id,categoria_id) VALUES('${descripcion}','${url}',${usuarioId[0].usuario_id},${categoriaId})`})
        }
        return this.queryView({sql:`SELECT * FROM publicacion WHERE publicacion_id = ${publicacion.insertId}`})
    }

    obtenerPublicaciones(){
        return this.queryView({sql: `SELECT descripcion,url, usuario_id FROM publicacion GROUP BY descripcion, url, usuario_id`})
    }

    obtenerCategorias(){
        return this.queryView({sql: `SELECT * FROM categoria`})
    }

    async obtenerPublicacionesCategoria(categoria){
        const categoriaId = await this.queryView({sql:`SELECT * FROM categoria WHERE nombre='${categoria}'`})
        return this.queryView({sql: `SELECT * FROM publicacion WHERE categoria_id = ${categoriaId[0].categoria_id}`})
    }

}

module.exports = {P1Model};
