const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Conexión a MySQL
let conexion = mysql.createConnection({
    host: 'localhost',
    database: 'gameburst',
    user: 'root',
    password: ''
});

// Middleware para parsear los datos de los formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para la página de inicio (login)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para servir la página de registro (pag1.html)
app.get('/pag1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pag1.html'));
});

// Ruta para manejar el registro de usuario
app.post('/validar', function (req, res) {
    const { usuario, nombre, apellido, fecha_nac, correo, contraseña } = req.body;

    const registrar = 'INSERT INTO cuentas (usuario, nombre, apellido, fecha_nac, correo, contraseña) VALUES (?, ?, ?, ?, ?, ?)';

    conexion.query(registrar, [usuario, nombre, apellido, fecha_nac, correo, contraseña], function (error) {
        if (error) {
            console.error(error);
            return res.status(500).send('Error en la base de datos');
        } else {
            console.log('Usuario registrado correctamente');
            res.send('Usuario registrado correctamente');
        }
    });
});

// Ruta para manejar el inicio de sesión
app.post("/login", (req, res) => {
    const { correo, contraseña } = req.body;

    const query = `SELECT * FROM cuentas WHERE correo = ? AND contraseña = ?`;

    conexion.query(query, [correo, contraseña], (error, results) => {
        if (error) {
            console.error("Error al iniciar sesión:", error);
            return res.send("<script>alert('Error interno, intente más tarde.'); window.location.href = '/login';</script>");
        }

        if (results.length > 0) {
            // Redirige a la página principal con el id del usuario
            res.redirect(`/inicioC.js?id=${results[0].id_cuenta}`);
            console.log('Usuario ' + correo + ' inició sesión correctamente');
        } else {
            res.send("<script>alert('Correo o contraseña incorrectos.'); window.location.href = '/login';</script>");
            console.log('Error de cuenta');
        }
    });
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
    // Aquí puedes hacer algo más si estás usando sesiones, cookies, etc.
    console.log('Sesión cerrada');
    res.redirect('/pag1');  // Redirigir a la página de login
});


// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/*-------------------------------------------------------------------------------------------------
modulo de perfil de usuario
---------------------------------------------------------------------------------------------------*/
app.get('/perfil/:id', (req, res) => {
    const idCuenta = req.params.id; // Obtener el ID del usuario desde la URL
    const query = 'SELECT usuario, nombre, apellido, fecha_nac, correo FROM cuentas WHERE id_cuenta = ?';

    conexion.query(query, [idCuenta], (error, results) => {
        if (error) {
            console.error('Error al obtener el perfil:', error);
            return res.status(500).send('Error al obtener el perfil del usuario');
        }

        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Enviar los datos del usuario como respuesta
        res.json(results[0]);
    });
});