//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

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
        location.href = 'index.html';
        
      }
      
      function guardar(){  
        var email = document.getElementById ('email');
        var password = document.getElementById('password');
        if (email.value ==="" || password.value ===""){ //Chequea que el dato recibido no esté vacío. 
         }else{
        location.href="index.html";
        sessionStorage.setItem("usuario", email.value); //setItem almacena el dato en la posición "usuario"
        sessionStorage.setItem("password", password.value); // Almaceno la contraseña
        
        //getItem obtiene el dato almacenado en la posición "usuario"
       
        }
    }
    