const express = require('express');
const authRoutes = require('./routes/authRoutes');
const electionRoutes = require('./routes/elections'); // Importa las rutas de elections
const voteRoutes = require('./routes/votes');         // Importa las rutas de votes
const app = express();
const port = 3000;

app.use(express.json()); // Para procesar JSON en el cuerpo de las solicitudes

// Usar las rutas de autenticación
app.use('/auth', authRoutes);

// Usar las rutas de elections y votes sin redundancia
app.use('/', electionRoutes);
app.use('/', voteRoutes);

app.get('/', (req, res) => {
    res.send('Hola');
});

app.listen(port, () => {
    console.log(`La aplicación se está ejecutando en el puerto ${port}`);
});
