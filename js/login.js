function login() {
    // Obtener los datos del formulario
    var username = document.getElementById('USERNAME').value;
    var password = document.getElementById('PASSWORD').value;
    
   console.log("dddddd");
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
            // Función que se ejecuta si la solicitud es exitosa
            var viewName = data.views[0].name; 
            var viewRoute = data.views[0].route;
            alert("Acceso concedido");
            
            window.location.href = "../Frontend ServiceSecurity/view/narver.html"; 

           
            //alert("Vista obtenida - Nombre: " + viewName + ", Ruta: " + viewRoute);
        },
        error: function (error) {
            
            console.error('Error en la solicitud:', error);
            alert("Error: No se pudo iniciar sesión");
        }
    });
}
