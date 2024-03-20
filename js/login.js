function login() {
    // Obtener los datos del formulario
    var username = document.getElementById('USERNAME').value;
    var password = document.getElementById('PASSWORD').value;

    var userData = {
        username: username,
        password: password
    };

    $.ajax({
        url: 'http://localhost:9000/service-security/v1/api/user/login',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function (data) {  
            // Almacenar los datos del usuario en localStorage
            localStorage.setItem('userData', JSON.stringify(data.data));

            // Redirigir al usuario al navbar o a la página que necesites
            window.location.href = "./view/navbar.html";
            console.log("dato consedido");
            alert("acceso COnsedido")
            // Notificar al usuario que el acceso ha sido concedido
            //alert(alert());
           // console.log("dsddsds");

        
        },
        error: function (error) {
            console.error('Error en la solicitud:', error);
            alert("Error: No se pudo iniciar sesión");
        }
    });
}

// function alert(){
//     return`<div class="alert alert-success d-flex align-items-center" role="alert">
//     <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
//     <div>
//       An example success alert with an icon
//     </div>`
// }
