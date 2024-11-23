import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <div className="content">
                <h1>Bienvenido al Sistema de Votación Seguro</h1>
                <p>Un sistema seguro y confiable para registrar y emitir tu voto.</p>
                <div className="buttons">
                    <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
                    <button onClick={() => navigate("/register")}>Registrarse</button>
                </div>
            </div>
        </div>
    );
};

export default Home;