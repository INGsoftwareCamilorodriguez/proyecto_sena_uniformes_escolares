// Conexión a la base de datos MongoDB
const mongoose = require('mongoose');

// URL de conexión a MongoDB local
const DB_URL = 'mongodb://localhost:27017/uniformes_escolares';

// Conectar a la base de datos
mongoose.connect(DB_URL)
    .then(() => {
        // Mensaje si la conexión es exitosa
        console.log('Conexión a MongoDB exitosa');
    })
    .catch((error) => {
        // Mensaje si hay un error en la conexión
        console.log('Error al conectar a MongoDB:', error);
    });

module.exports = mongoose;