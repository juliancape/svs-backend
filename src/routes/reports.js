// routes/reports.js
const express = require("express");
const { collection, getDocs } = require("firebase/firestore");
const { db } = require("../firebaseConfig");
const router = express.Router();

const PDFDocument = require("pdfkit");

router.get("/reports", async (req, res) => {
    try {
        const electionsCollection = collection(db, "elections");
        const votesCollection = collection(db, "votes");

        // Obtener elecciones
        const electionsSnapshot = await getDocs(electionsCollection);
        const elections = electionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Obtener votos
        const votesSnapshot = await getDocs(votesCollection);
        const votes = votesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Estadiisticas
        const stats = elections.map(election => {
            const electionVotes = votes.filter(vote => vote.electionId === election.id);
            return {
                electionId: election.id,
                title: election.title,
                totalVotes: electionVotes.length,
                validVotes: electionVotes.filter(v => v.isValid).length,
                invalidVotes: electionVotes.filter(v => !v.isValid).length,
            };
        });

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/reports/pdf", async (req, res) => {
    try {
        const electionsCollection = collection(db, "elections");
        const votesCollection = collection(db, "votes");

        const electionsSnapshot = await getDocs(electionsCollection);
        const elections = electionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const votesSnapshot = await getDocs(votesCollection);
        const votes = votesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const stats = elections.map(election => {
            const electionVotes = votes.filter(vote => vote.electionId === election.id);
            return {
                title: election.title,
                totalVotes: electionVotes.length,
                validVotes: electionVotes.filter(v => v.isValid).length,
                invalidVotes: electionVotes.filter(v => !v.isValid).length,
            };
        });

        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="report.pdf"');
        
        doc.pipe(res);

        doc.fontSize(20).text("Reporte de Elecciones", { underline: true });
        doc.moveDown();

        stats.forEach(stat => {
            doc.fontSize(16).text(`Eleccion: ${stat.title}`);
            doc.fontSize(14).text(`Votos Totales: ${stat.totalVotes}`);
            doc.text(`Votos Válidos: ${stat.validVotes}`);
            doc.text(`Votos Inválidos: ${stat.invalidVotes}`);
            doc.moveDown();
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
