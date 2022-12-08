const { Router } = require('express');
const { check } = require('express-validator');
const { createTarea, readTarea, updateTarea, deleteTarea } = require('../controllers/tareas');
const verifyToken = require('../middleware/verifyToken');

const router = Router();

router.post('/create', [
    check("nombre", "El usuario es requerido").not().isEmpty(),
    verifyToken ], createTarea)
router.get('/read', [
    check("nombre", "El usuario es requerido").not().isEmpty(),
    verifyToken ], readTarea)
router.put('/update/:id', [ verifyToken ], updateTarea)
router.delete('/delete/:id', [ verifyToken ], deleteTarea)

module.exports = router;
