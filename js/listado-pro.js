// Variabes globales
let tablePro = document.querySelector("#table-pro > tbody");
let searchInput = document.querySelector("#search-input")
let nameUser = document.querySelector("#nombre-usuario");
let btnLogout = document.querySelector("#btnLogout");

// Función para poner el nombre de usuario
const getUser = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    if (user && nameUser) {
        nameUser.textContent = user.nombre;
    } else {
        console.error("No se encontró el usuario en el localStorage o el elemento no existe.");
    }
};
// Evento para probar el campo de buscar
searchInput.addEventListener("keyup", () => {
    console.log(searchInput.value);
});

// Evento para el navegador
document.addEventListener("DOMContentLoaded", () => {
    getUser();
    getTableData();
});
// Funcion para traer los datos de la DB De la tabla
let getTableData = async () => {
    let url = "http://localhost/apiCrud/productos";
    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 204) {
            console.log("No hay datos en la DB");
        } else {
            let tableData = await response.json();
            console.log(tableData)
            // Agregar datos a localstorage
            localStorage.setItem("datosTabla", JSON.stringify(tableData))
            // Agregar datos a la tabla
            tableData.forEach((dato, i) => {
                let row = document.createElement("tr");
                row.innerHTML = `
                <td> ${i+1}</td>
                <td> ${dato.nombre}</td>
                <td> ${dato.descripcion}</td>
                <td> ${dato.precio}</td>
                <td> ${dato.stock}</td>
                <td> <img src="${dato.imagen}" width="100px"></td>
                <td> 
                    <button id="btn-edit" onClick="editDataTable(${i})" type="button" class="btn btn-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </button>
                    ${nameUser.textContent == "vendedor" ? "" : 
                    `<button id="btn-delete" onClick="deleteDataTable(${i})" type="button" class="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>`}
                </td>
                `;
                tablePro.appendChild(row);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

// Funcion para editar productos de la tabla

let editDataTable = (pos) => {
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"));
    if (productsSave != null) {
        products = productsSave;
    }
    let singleProduct = products[pos];
    localStorage.setItem("productEdit", JSON.stringify(singleProduct));
    localStorage.removeItem("datosTabla");
    location.href = "crear-pro.html";
}

// Funcion para eliminar productos de la tabka

let deleteDataTable = (pos) => {
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"));
    if (productsSave != null) {
        products = productsSave;
    }
    let singleProduct = products[pos];
    let idProduct = {
        id: singleProduct.id
    }
    console.log("Producto a eliminar " + singleProduct.nombre)
    let confirmar = confirm(`¿ Desear eliminar este producto ? ${singleProduct.nombre }`)
    // llamar la funcion para realizar la peticion
    sendDeleteProduct( idProduct );
}

// Funcion para realizar la peticion de eliminar producto

let sendDeleteProduct = async (id) => {
    let url = "http://localhost/apiCrud/productos";
    try {
        let response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        });
        if (response.status === 406) {
            alert("El ID del producto es invalido");
        } else {
            let Mensaje = await response.json();
            alert(Mensaje);
        }
    } catch (error) {
        console.error(error);
    }
};
