const userInput = document.getElementById("userInput");
const userPassword = document.getElementById("userPassword");
const userSubmit = document.getElementById("userSubmit");

userSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    let dataForm = getData();
    if (dataForm) {
        await sendData(dataForm);
    }
});

const getData = () => {
    let user;
    if (userInput.value && userPassword.value) {
        user = {
            usuario: userInput.value,
            contrasena: userPassword.value
        }
        userInput.value = "";
        userPassword.value = "";
    } else {
        alert("No escribiste nada");
    }
    console.log(user);
    return user;
}

const sendData = async (data) => {
    let url = "http://localhost/apiCrud/login";
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.status === 401) {
            alert("Credenciales inválidas")
        } else {
            let userLogin = await response.json();
            // console.log(userLogin);
            alert(`Bienvenido ${userLogin.nombre}`)
            localStorage.setItem("userLogin", JSON.stringify(userLogin));
            location.href = "index.html"
        }
    } catch (error) {
        console.error(error);
    }
}
