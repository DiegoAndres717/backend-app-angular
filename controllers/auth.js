const Usuario = require('../models/Usuarios')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const registerUsuario = async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(501).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    const { email, password, username } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if(usuario){
            return res.status(501).json({
                ok: false,
                msg: 'Correo ya registrado'
            })
        }
        const nuevoUsuario = new Usuario({ username, email, password});

        const salt = bcrypt.genSaltSync(12);
        nuevoUsuario.password = bcrypt.hashSync(password, salt);

        nuevoUsuario.save();

        const payload = {
            id: nuevoUsuario.id
        }
        jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'}, (error, token) => {

            res.status(200).json({ 
                ok: true,
                msg: 'Usuario registrado con Exito',
                id: nuevoUsuario.id,
                username: nuevoUsuario.username,
                token
            })
        })

    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'Hubo un error'
        })
    }
}
const loginUsuario = async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(501).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if( !usuario ){
            return res.status(401).json({
                ok: false,
                msg: 'Correo o Contraseña Invalida'
            })
        }
        const passwordValido = bcrypt.compareSync(password, usuario.password);
        if( !passwordValido ){
            return res.status(401).json({
                ok: false,
                msg: 'Correo o Contraseña Invalida'
            })
        }
        const payload = {
            id: usuario.id
        }
        jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'}, (error, token) => {
            if(error) res.json({error})

            return res.status(200).json({ 
                ok: true,
                id: usuario.id,
                username: usuario.username,
                msg: 'Ha Iniciado Sesion con Exito',
                token
            })
        })

    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'Hubo un error'
        })
    }
}

module.exports = {
    registerUsuario,
    loginUsuario,
}