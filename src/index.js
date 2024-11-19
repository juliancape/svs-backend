const express = require('express');
const authRoutes = require('./routes/authRoutes');
const electionRoutes = require('./routes/elections');
const voteRoutes = require('./routes/votes');
const reportRoutes = require('./routes/reports');
const app = express();
const port = 3000;

app.use(express.json()); 

app.use('/auth', authRoutes);

app.use('/', electionRoutes);
app.use('/', voteRoutes);

app.use('/', reportRoutes);


app.listen(port, () => {
    console.log(`La aplicacion se está ejecutando en el puerto ${port}`);
});
