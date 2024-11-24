const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Animación de registro e inicio de sesión
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


document.addEventListener('DOMContentLoaded', async function() {

    // Función para cargar usuarios al cargar la página
    async function cargarUsuarios() {
        // const response = await fetch('http://127.0.0.1:8000/users');
        // const data = await response.json();
        
        const userList = document.getElementById('userList');
         // userList.innerHTML = ''; // Limpiar lista antes de actualizar

       // data.forEach(user => {
         //   const listItem = document.createElement('li');
           // listItem.textContent = `${user.nombre} ${user.apellido} (${user.correo})`;
            //userList.appendChild(listItem);
        //});
    }

    // Cargar usuarios al cargar la página
    await cargarUsuarios();

    // Manejar envío del formulario de registro de usuario
    document.getElementById("signUpForm").addEventListener("submit", async function(event) {
        event.preventDefault();
    
        const form = event.target;
        const formData = new FormData(form);
    
        try {
            const responses = await fetch(form.action, {
                method: form.method,
         mode: "no-cors",
                headers: {
                    "Sec-Fetch-Mode": "cors",
                    "Accept": "*/*",
                    "Accept-Encoding":	"gzip, deflate, br, zstd",
                    "Accept-Language":	"es-ES,es;q=0.9", 
                    // "Access-Control-Allow-Origin": "*",                    
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Object.fromEntries(formData.entries()))
                //body: Object.fromEntries(formData.entries())
            });

    
            const result = await responses.json();
            console.log(result);  // Mostrar respuesta del backend en consola
            
            alert(result.message || "Registro exitoso");
            // Puedes redirigir al usuario a otra página o realizar alguna otra acción aquí
            
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            alert("Hubo un problema con el registro. Inténtalo de nuevo.");
        }
    });
});

