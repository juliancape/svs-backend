const express = require('express');
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3000;

app.use(express.json()); // Para procesar JSON en el cuerpo de las solicitudes
app.use('/auth', authRoutes); // Usar las rutas de autenticación

app.get('/', (req, res) => {
    res.send('Hola');
});

app.listen(port, () => {
    console.log(`La aplicación se está ejecutando en el puerto ${port}`);
});
