const { Router } = require('express');
const { check } = require('express-validator');
const { loginUsuario, registerUsuario } = require('../controllers/auth');

const router = Router();

router.post('/register', 
    [
        check("email", "El email es requerido").isEmail(),
        check("password", "El password tiene que ser de 6 caracteres").isLength({ min: 6 }),
        check("username", "El usuario es requerido").not().isEmpty(),
    ],registerUsuario)
router.post('/login',
    [
        check("email", "El email es requerido").isEmail(),
        check("password", "El password tiene que ser de 6 caracteres").isLength({ min: 6 }),
    ], loginUsuario)

module.exports = router;
