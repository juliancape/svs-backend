const express = require('express');
const authRoutes = require('./routes/authRoutes');
const electionRoutes = require('./routes/elections');
const voteRoutes = require('./routes/votes');
const reportRoutes = require('./routes/reports');

const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir solicitudes - Métodos permitidos
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/', electionRoutes);
app.use('/', voteRoutes);
app.use('/', reportRoutes);


app.listen(port, () => {
    console.log(`La aplicacion se está ejecutando en el puerto ${port}`);
});
