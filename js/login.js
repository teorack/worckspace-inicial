//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});


function cargarErrores(id, idMensaje, mensaje) {
    //Validar nombre
     var elementNombre = document.getElementById(id);
      var elementError = document.getElementById(idMensaje);
    if(elementNombre.value==""){
        elementError.style.display = "block";
        elementError.innerHTML = mensaje;
         elementNombre.classList.add("error");
         elementNombre.style.border = '1px solid red'
    }else{
        elementError.style.display = 'none';
        elementNombre.style.border = '1px solid #000'
    }}

    function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        localStorage.setItem('email', profile.getEmail());
        location.href = "index.html"
        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        
      }
      