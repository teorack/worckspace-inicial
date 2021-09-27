//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const loginButton = document.getElementById("login-submit");

function pruebaemail (valor){
	re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
	if(!re.exec(valor)){
		return true;
	}
	else {
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    loginButton.addEventListener("click", (e) => {
        const mail = document.getElementById("inputEmail").value;
        const pass = document.getElementById("inputPassword").value;

        if(pruebaemail(mail) != true && pass != "")
        {
            localStorage.setItem("username", mail);
            window.location="inicio.html";
        } else {
            document.getElementById("resultado").innerHTML = "";
            document.getElementById("resultado").innerHTML += "Error en Logeo. Verifique E-Mail y Contraseña";
        }
        
    });
});