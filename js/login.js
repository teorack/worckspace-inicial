//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

    function onSignIn(googleUser) {
        // googole formlario
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        localStorage.setItem('email', profile.getEmail());
        location.href = "index.html"
        
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        location.href = 'index.html'
        
      }
      
      function guardar(email, password){  

        if (email.trim()==="" || password.trim()===""){ //Chequea que el dato recibido no esté vacío. 
         
        }    else{
        localStorage.setItem("usuario", email.trim()); //setItem almacena el dato en la posición "usuario"
        localStorage.setItem("password", password.trim()); // Almaceno la contraseña
        sessionStorage.setItem("usuario", email.trim());
        alert (" Usuario : " + email + " Password : " + password ); 
        
       
        location.href="index.html";
        
        //getItem obtiene el dato almacenado en la posición "usuario"
       
        }
    }