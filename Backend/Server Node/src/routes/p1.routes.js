import {Router} from "express";
import httpCode from "http-status-codes";
import CryptoJS from 'crypto-js';
import S3 from '../aws/s3';

import app from "../app";

const {P1Model} = require("../models/p1.model.js");
const router = Router();
const uploader = new S3();

router.get("/usuarios",(req,res)=>{
    P1Model.create(req.app).getAll('usuario').then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    });
})

router.post("/usuarios",async (req,res)=>{
    const url = await uploader.uploadImage(req.body.foto, req.body.filename);
    P1Model.create(req.app).guardarUsuario(req.body.nombre,req.body.correo,req.body.dpi,req.body.contrasenia,url).then(data => {
        if(data === false){
            return res.status(httpCode.CONFLICT).json({"message":"el usuario con ese correo o ese dpi ya existe"})
        }
        return res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    });
})

router.post("/usuarios/login", (req, res) => {
    P1Model.create(req.app)
        .buscarUsuario(req.body.correo).then(data => {
        let passEncrypted = CryptoJS.MD5(req.body.contrasenia).toString();
        if (data.length > 0) {
            if (req.body.contrasenia == data[0].contrasenia) {
                return res.status(httpCode.OK).json({"successStatus": true, "existUser": true, "errorMessage": null});
            }
            return res.status(httpCode.NOT_FOUND).json({
                "successStatus": false,
                "existUser": true,
                "errorMessage": "contraseña incorrecta"
            });
        }
        return res.status(httpCode.NOT_FOUND).json({
            "successStatus": false,
            "existUser": false,
            "errorMessage": "El usuario no existe"
        });
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.post("/usuarios/login/camera", (req, res) => {
    P1Model.create(req.app).loginCamara(req.body.correo, req.body.foto)
        .then(data => {
            res.status(httpCode.OK).json(data);
        }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    })
})

router.post("/publicacion", async (req, res) => {
    const url = await uploader.uploadImage(req.body.foto, req.body.filename);
    P1Model.create(req.app).nuevaPublicacion(url,req.body.foto, req.body.descripcion, req.body.correo)
        .then(data => {
            res.status(httpCode.OK).json(data);
        }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    })
})

router.get("/publicaciones", async (req, res) => {
    P1Model.create(req.app).obtenerPublicaciones()
        .then(data => {
            res.status(httpCode.OK).json(data);
        }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    })
})

router.get("/categorias",(req,res)=>{
    P1Model.create(req.app).obtenerCategorias()
        .then(data => {
            res.status(httpCode.OK).json(data);
        }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    })
})

router.post("/publicaciones-categoria", async (req, res) => {
    P1Model.create(req.app).obtenerPublicacionesCategoria(req.body.categoria)
        .then(data => {
            res.status(httpCode.OK).json(data);
        }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    })
})




module.exports = {router}

