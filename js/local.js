// Variables globales
let nombreUsuario = document.getElementById("nombre-usuario");
let btnLogout = document.getElementById("btnLogout");

// Funcion para obtener nombre de usuario

document.addEventListener("DOMContentLoaded", () => {
    getUser();
})

let getUser = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nombreUsuario.textContent = user.nombre;
}

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userLogin");
    location.href = "../login.html"
});

