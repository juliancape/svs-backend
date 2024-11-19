// models/election.js
module.exports = {
    electionId: "",        // ID unico de la eleccion
    title: "",             // Titulo de la eleccion 
    description: "",       // Descripcion de la eleccion
    startDate: "",         // Fecha de inicio de la eleccion
    endDate: "",           // Fecha de finalizacion de la eleccion
    createdBy: "",         // ID del usuario que creo la eleccion (el user tiene que existir)
    isActive: true        // Estado de la eleccion
};
