// models/election.js
module.exports = {
    electionId: "",        // ID único de la elección
    title: "",             // Título de la elección 
    description: "",       // Descripción de la elección
    startDate: "",         // Fecha de inicio de la elección
    endDate: "",           // Fecha de finalización de la elección
    createdBy: "",         // ID del usuario que creó la elección (el user tiene que existir)
    isActive: true        // Estado de la elección
};
