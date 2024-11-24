import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <nav className="navbar">
                <div className="logo">SVS</div>
                <ul className="nav-links">
                    <li><a href="#">Inicio</a></li>
                    <li><button onClick={() => navigate("/register")}>Registrarse</button></li>
                    <li><button onClick={() => navigate("/login")}>Iniciar Sesión</button></li>
                </ul>
            </nav>

            <header className="main-section">
                <div className="main-content">
                    <h1>Bienvenido al Sistema de Votación Segura</h1>
                    <p>
                        Garantizamos un sistema confiable para que tus elecciones sean seguras.
                        Con nuestra tecnología, cada voto cuenta de manera precisa y justa.
                    </p>
                    <button className="login-button" onClick={() => navigate("/login")}>
                        Login
                    </button>
                </div>
                <div className="main-image"></div>
            </header>

            <section className="cards-section">
                <div className="card">
                    <h2>Transparencia</h2>
                    <p>Conoce cómo aseguramos la integridad en cada paso del proceso.</p>
                </div>
                <div className="card">
                    <h2>Accesibilidad</h2>
                    <p>Nuestro sistema está diseñado para ser usado por todos.</p>
                </div>
                <div className="card">
                    <h2>Seguridad</h2>
                    <p>Protegemos tu voto con la más avanzada tecnología.</p>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 Sistema de Votación Segura</p>
            </footer>
        </div>
    );
};

export default Home;
