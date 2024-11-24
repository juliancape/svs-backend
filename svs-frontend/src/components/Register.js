import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        documentNumber: '',
        documentType: '',
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Reemplaza "http://localhost:5000" con la URL del backend si es diferente
            const response = await axios.post("http://localhost:5000/auth/register", formData);

            if (response.status === 201) {
                setMessage("Usuario registrado con éxito");
                setFormData({
                    documentNumber: "",
                    documentType: "",
                    name: "",
                    phoneNumber: "",
                    email: "",
                    password: ""
                });
            } else {
                setMessage("Error al registrar el usuario");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            setMessage("Ocurrió un error. Inténtalo de nuevo.");
        }
    };
    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <label>Número de Documento:</label>
                    <input
                        type="text"
                        name="documentNumber"
                        value={formData.documentNumber}
                        onChange={handleChange}
                        placeholder="Ingrese su número de documento" />

                    <label>Tipo de Documento:</label>
                    <select
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}>
                        <option value="">Seleccionar...</option>
                        <option value="Cedula">CC</option>
                    </select>

                    <label>Nombre Completo:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ingrese su nombre completo"
                    />

                    <label>Número de Celular:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Ingrese su número de celular"
                    />

                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ingrese su correo electrónico - @"
                    />

                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Ingrese su contraseña, con minimo 6 carácteres"
                    />

                    <button type="submit">Registrarse</button><br></br>
                    <button onClick={() => navigate("/")}>Atrás</button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Register;
