import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Estilos básicos
import 'primeicons/primeicons.css'; // Iconos de PrimeReact

const ClienteInicio = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [usuario, setUsuario] = useState(null);

    // Función para obtener datos del perfil desde el backend
    const obtenerPerfil = async () => {
        try {
            const response = await axios.get('http://localhost:3000/perfil/1'); // Cambia el ID según corresponda
            setUsuario(response.data);
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
        }
    };

    // Función para cerrar sesión
    const cerrarSesion = () => {
        console.log('Sesión cerrada');
        setUsuario(null); // Simula el cierre de sesión
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
            {/* Encabezado */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#007ad9', color: '#fff' }}>
                <h1>GameBurst</h1>
                <Button 
                    icon="pi pi-bars" 
                    className="p-button-rounded p-button-secondary" 
                    onClick={() => setMenuVisible(true)} 
                    aria-label="Menú"
                />
            </header>

            {/* Contenido principal */}
            <main style={{ marginTop: '50px' }}>
                <h2>Bienvenido al Inicio del Cliente</h2>
                {usuario ? (
                    <div>
                        <p>Hola, {usuario.nombre} {usuario.apellido}</p>
                        <p>Correo: {usuario.correo}</p>
                        <p>Fecha de nacimiento: {usuario.fecha_nac}</p>
                    </div>
                ) : (
                    <p>Explora las opciones desde el menú lateral.</p>
                )}
            </main>

            {/* Menú lateral */}
            <Sidebar visible={menuVisible} position="right" onHide={() => setMenuVisible(false)} style={{ width: '250px' }}>
                <h3>Menú</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li>
                        <Button 
                            label="Configuración" 
                            className="p-button-text p-button-plain" 
                            icon="pi pi-cog" 
                            style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}
                            onClick={() => alert('Configuración no implementada aún')}
                        />
                    </li>
                    <li>
                        <Button 
                            label="Ver Perfil" 
                            className="p-button-text p-button-plain" 
                            icon="pi pi-user" 
                            style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}
                            onClick={obtenerPerfil}
                        />
                    </li>
                    <li>
                        <Button 
                            label="Cerrar Sesión" 
                            className="p-button-text p-button-danger" 
                            icon="pi pi-sign-out" 
                            style={{ width: '100%', textAlign: 'left' }}
                            onClick={cerrarSesion}
                        />
                    </li>
                </ul>
            </Sidebar>

            {/* Pie de página */}
            <footer style={{ marginTop: '50px', fontSize: '14px', color: '#888' }}>
                &copy; 2024 GameBurst. Todos los derechos reservados.
            </footer>
        </div>
    );
};

export default ClienteInicio;