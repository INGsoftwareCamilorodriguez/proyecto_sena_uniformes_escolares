// Modelo del usuario en la base de datos
const mongoose = require('mongoose');

// Esquema del usuario
const usuarioSchema = new mongoose.Schema({
    // Nombre del usuario
    nombre: {
        type: String,
        required: true
    },
    // Correo del usuario
    correo: {
        type: String,
        required: true,
        unique: true
    },
    // Contraseña del usuario
    contrasena: {
        type: String,
        required: true
    }
});

// Exportar el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);