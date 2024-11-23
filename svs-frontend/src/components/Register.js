import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !formData.documentNumber ||
            !formData.documentType ||
            !formData.name ||
            !formData.phoneNumber ||
            !formData.email ||
            !formData.password
        ) {
            setError('Todos los campos son obligatorios');
            return;
        }

        console.log('Formulario enviado', formData);
        setFormData({
            documentNumber: '',
            documentType: '',
            name: '',
            phoneNumber: '',
            email: '',
            password: '',
        });
        setError('');
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error">{error}</div>}
                    <label>Tipo de Documento:</label>
                    <select
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="Cedula">Cédula</option>

                    </select>

                    <label>Número de Documento:</label>
                    <input
                        type="text"
                        name="documentNumber"
                        value={formData.documentNumber}
                        onChange={handleChange}
                        placeholder="Ingrese su número de documento"
                    />

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
                        placeholder="Ingrese su correo electrónico"
                    />

                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Ingrese su contraseña"
                    />

                    <button type="submit">Registrarse</button><br></br>
                    <button onClick={() => navigate("/")}>Atrás</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
