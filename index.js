// Archivo principal del servidor
const express = require('express');
const app = express();

// Importar la conexión a la base de datos
const database = require('./src/database');

// Importar las rutas de autenticación
const authRoutes = require('./src/routes/authRoutes');

// Middleware para recibir JSON
app.use(express.json());

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes);

// Puerto del servidor
const PORT = 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});