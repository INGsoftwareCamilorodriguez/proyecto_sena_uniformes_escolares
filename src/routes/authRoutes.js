// Rutas de autenticación
const express = require('express');
const router = express.Router();

// Importar los controladores
const { registro, login } = require('../controllers/authController');

// Ruta para registrar un usuario
// POST /api/auth/registro
router.post('/registro', registro);

// Ruta para iniciar sesión
// POST /api/auth/login
router.post('/login', login);

module.exports = router;