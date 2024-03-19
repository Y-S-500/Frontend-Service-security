// Obtener los datos del usuario almacenados en localStorage
var userData = JSON.parse(localStorage.getItem('userData'));

// Función para cargar contenido en el iframe
function loadContent(viewRoute) {
    var contentFrame = document.getElementById('contentFrame');
    contentFrame.src = viewRoute;
    console.log("Ruta de la vista cargada: " + viewRoute);
}

// Verificar si se han encontrado datos de usuario y si hay al menos un módulo
if (userData && userData.modules && userData.modules.length > 0) {
    var navbarMenu = document.getElementById('navbarMenu');

    // Recorrer cada módulo
    userData.modules.forEach(function(module) {
        var liItem = document.createElement('li');
        liItem.classList.add('nav-item', 'dropdown');

        var aLink = document.createElement('a');
        aLink.classList.add('nav-link', 'dropdown-toggle');
        aLink.href = '#';
        aLink.setAttribute('role', 'button');
        aLink.setAttribute('data-bs-toggle', 'dropdown');
        aLink.setAttribute('aria-expanded', 'false');
        aLink.textContent = module.module;

        // Agregar el enlace al elemento <li>
        liItem.appendChild(aLink);

        // Crear un submenú <ul> con la clase "dropdown-menu"
        var subMenu = document.createElement('ul');
        subMenu.classList.add('dropdown-menu');

        // Verificar si el módulo tiene vistas asociadas
        if (module.viewName && module.viewRoute) {
            var viewNames = module.viewName.replace(/[\[\]"]+/g, '').split(',');
            var viewRoutes = JSON.parse(module.viewRoute);

            // Iterar sobre las vistas y agregarlas al submenú
           // Iterar sobre las vistas y agregarlas al submenú
for (var i = 0; i < viewNames.length; i++) {
    var viewName = viewNames[i].trim();
    var viewRoute = viewRoutes[i].trim();

    var viewItem = document.createElement('li');
    var viewLink = document.createElement('a');
    viewLink.classList.add('dropdown-item');
    viewLink.textContent = viewName;

    // Utilizar un closure para capturar el valor correcto de viewRoute
    (function(route) {
        // Asignar la función loadContent al evento onclick con la ruta de la vista como argumento
        viewLink.addEventListener('click', function() {
            loadContent(route); // Pasar la ruta de la vista como argumento
            console.log("Ruta de la vista cargada: " + route);
        });
    })(viewRoute);

    // Agregar el enlace a la vista como hijo del elemento de lista
    viewItem.appendChild(viewLink);

    // Agregar la vista al submenú
    subMenu.appendChild(viewItem);
}

        }

        // Agregar el submenú al elemento <li>
        liItem.appendChild(subMenu);

        // Agregar el elemento <li> al menú de la barra de navegación
        navbarMenu.appendChild(liItem);
    });

    // Agregar el botón de cerrar sesión al navbar
    var logoutButton = document.createElement('button');
    logoutButton.classList.add('btn', 'btn-danger', 'ms-2');
    logoutButton.textContent = 'Cerrar Sesión';
    logoutButton.addEventListener('click', function() {
        // Eliminar los datos del usuario del localStorage
        localStorage.removeItem('userData');
        // Redirigir a la página de inicio de sesión u otra página de su elección
        window.location.href = '../login.html';
    });
    navbarMenu.appendChild(logoutButton);
} else {
    console.log("No se encontraron datos de usuario o módulos disponibles.");
}
