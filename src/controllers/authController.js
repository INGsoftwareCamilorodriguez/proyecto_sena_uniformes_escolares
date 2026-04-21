// Controlador de autenticación
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para registrar un usuario
const registro = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la petición
        const { nombre, correo, contrasena } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExiste = await Usuario.findOne({ correo });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

        // Crear el nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contrasena: contrasenaEncriptada
        });

        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();

        // Respuesta exitosa
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });

    } catch (error) {
        // Error en el registro
        res.status(500).json({ mensaje: 'Error en el registro', error });
    }
};

// Controlador para iniciar sesión
const login = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la petición
        const { correo, contrasena } = req.body;

        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Error en la autenticación' });
        }

        // Verificar la contraseña
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!contrasenaValida) {
            return res.status(400).json({ mensaje: 'Error en la autenticación' });
        }

        // Generar token de autenticación
        const token = jwt.sign({ id: usuario._id }, 'secreto123', { expiresIn: '1h' });

        // Respuesta de autenticación satisfactoria
        res.status(200).json({ mensaje: 'Autenticación satisfactoria', token });

    } catch (error) {
        // Error en el login
        res.status(500).json({ mensaje: 'Error en el inicio de sesión', error });
    }
};

module.exports = { registro, login };