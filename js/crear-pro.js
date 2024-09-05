// Variables globales del formulario
let nameInput = document.getElementById('productos-select');
let priceInput = document.getElementById('precio-pro');
let stockInput = document.getElementById('stock-pro');
let desInput = document.getElementById('des-pro');
let imagen = document.getElementById('imagen-pro');
let btnCreate = document.querySelector('.btn-create');
let btnUpdate = document.querySelector('.btn-update');
let nameUser = document.querySelector("#nombre-usuario")
let btnLogout = document.querySelector("#btnLogout")
let productUpdate;

//funcion para poner el nombre de usuario
let getUser = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nameUser.textContent = user.nombre;
}

// Evento al botón de crear
btnCreate.addEventListener('click', async () => {
    let dataProduct = getDataProduct();
    if (dataProduct) {
        await sendDataProduct(dataProduct);
    }
});

// Evento al botón de actualizar (debe definirse solo una vez)
btnUpdate.addEventListener('click', async () => {
    let product = {
        id: productUpdate.id,
        nombre: nameInput.value,
        descripcion: desInput.value,
        precio: priceInput.value,
        stock: stockInput.value,
        imagen: imagen.src
    };
    // Borrar información de localStorage
    localStorage.removeItem("productEdit");
    // Pasar los datos a la función de actualización
    await sendUpdateProduct(product);
});

// Evento al navegador para comprobar si se recarga la página
document.addEventListener("DOMContentLoaded", () => {
    getUser();
    productUpdate = JSON.parse(localStorage.getItem("productEdit"));
    if (productUpdate != null) {
        updateDataProduct();
    }
});

// Función para validar el formulario y obtener los datos
const getDataProduct = () => {
    // Validar formulario
    let product;
    if (nameInput.value && priceInput.value && stockInput.value && desInput.value && imagen.src) {
        product = {
            nombre: nameInput.value,
            descripcion: desInput.value,
            precio: priceInput.value,
            stock: stockInput.value,
            imagen: imagen.src
        };
        // Limpiar campos después de la creación
        nameInput.selectedIndex = 0;
        priceInput.value = "";
        desInput.value = "";
        stockInput.value = "";
        imagen.src = "";
        console.log(product);
    } else {
        alert("Todos los campos son obligatorios");
    }
    return product;
};

// Función para enviar datos del producto
const sendDataProduct = async (data) => {
    let url = "http://localhost/apiCrud/productos";
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.status === 406) {
            alert("Los datos enviados no son admitidos");
        } else {
            let Mensaje = await response.json();
            alert(Mensaje);
            location.href = "../listado-pro.html"
        }
    } catch (error) {
        console.error(error);
    }
};

// Función para editar el producto
const updateDataProduct = () => {
    nameInput.value = productUpdate.nombre;
    priceInput.value = productUpdate.precio;
    stockInput.value = productUpdate.stock;
    desInput.value = productUpdate.descripcion;
    imagen.src = productUpdate.imagen;

    // Alternar el botón de crear y editar
    btnCreate.classList.add("d-none");
    btnUpdate.classList.remove("d-none");
};

// Función para enviar datos actualizados del producto
const sendUpdateProduct = async (pro) => {
    let url = "http://localhost/apiCrud/productos"; // La URL no necesita el ID en este caso
    try {
        let response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pro)
        });
        if (response.ok) {
            let mensaje = await response.json();
            alert(mensaje.message || "Producto actualizado con éxito");
        } else {
            alert("Error en la actualización del producto");
        }
    } catch (error) {
        console.error("Error en la solicitud PUT:", error);
    }
};
