
function save() {
    
    try {
      
      var data = {
        "username": $("#ussername").val(),
        "password": $("#password").val(),
        "person":{
            "id":parseInt($("#selected_person_id").val())
        } ,
        "role":[{
            "id":parseInt($("#role_id").val())
        } ],
        "state": parseInt($("#estado").val())
      };
  
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/user",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: jsonData,
        success: function(data) {
          alert("Registro agregado con éxito");
          clearData();
          loadData();
        },
        error: function(error) {
          alert(`la persona: ${$("#person_id").val()}  ya cuanta con una cuenta de usuario `);
          //console.log($("#person_id").val());
        },
      });
    } catch (error) {
      console.error("Error obteniendo el cliente:", error);
    }
  }


  function loadPerson() {
    console.log("ejecutando loadPerosn");
    $.ajax({
        url: "http://localhost:9000/service-security/v1/api/person/list",
        method: "GET",
        dataType: "json",
        success: function (response) {
            if (response.status && Array.isArray(response.data)) {
                var html = "";
                response.data.forEach(function(person) {
                    html += `<option value="${person.person}" data-person-id="${person.id}">`;
                });
                console.log(person.id);
                $("#persons").html(html);

                // Asignar el ID de la persona seleccionada al campo oculto cuando se selecciona una opción del datalist
                $("#person_id").on("input", function() {
                    var selectedPersonId = $("#persons option[value='" + $(this).val() + "']").data("person-id");
                    $("#selected_person_id").val(selectedPersonId);
                });
            } else {
                console.error("Error: No se pudo obtener la lista de persons.");
            }
        },
        error: function (error) {
            // Función que se ejecuta si hay un error en la solicitud
            console.error("Error en la solicitud:", error);
        },
    });
}


  function loadRole() {
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/role",
      method: "GET",
      dataType: "json",
      success: function (response) {
        var html = "";
        if (response.status && Array.isArray(response.data)) {
            response.data.forEach(function (item) {
              // Construir el HTML para cada objeto
              html += `<option value="${item.id}">${item.name}</option>`;
            });
            $("#role_id").html(html);
          } else {
            console.error("Error: No se pudo obtener la lista de roles.");
          }
      },
      error: function (error) {
        // Función que se ejecuta si hay un error en la solicitud
        console.error("Error en la solicitud:", error);
      },
    });
  }


  function clearData() {
    $("#id").val("");
    $("#ussername").val("");
    $("#password").val("");
    $("#person_id").val("");
    $("#role_id").val("");
    $("#estado").val("");
    var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Agregar");
        btnAgregar.attr("onclick", "save()");
  }


  function loadData() {
    console.log("ejecutando loadData");
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/user",
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log(response.data);
        var html = "";
        var data = response.data;
        data.forEach(function (item) {
          // Construir el HTML para cada objeto
          if (!item.deletedAt) { // Verificar si el campo deletedAt es nulo (no eliminado lógicamente)

          html +=
            `<tr>
                    <td>${item.username}</td>
                    <td>` + item.password + `</td>
                    <td>${item.person.firstName} ${item.person.lastName}</td>
                    <td><ul>` + item.role.reduce((accumulator, currentValue) => accumulator + (`<li>${ currentValue.name }</li>`), '',) + `</ul></td>
                    <td>` + (item.state == true ? "Activo" : "Inactivo") + `</td>
                    <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findById(${item.id})"> <img src="../assets/icon/pencil-square.svg" > </button>
                    <button type="button" class="btn btn-primary" onclick="deleteById(${item.id})"> <img src="../assets/icon/trash3.svg" > </button></td>
                </tr>`;
          };
        });
      
        $("#resultData").html(html);
      
      },
      error: function (error) {
        // Función que se ejecuta si hay un error en la solicitud
        console.error("Error en la solicitud:", error);
      },
    });
  }


  function deleteById(id) {
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/user/" + id,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).done(function (result) {
      alert("Registro eliminado con éxito");
      loadData();
    });
  }


  function update() {
    // Construir el objeto data
    try{
      var data = {
        "username": $("#ussername").val(),
        "password": $("#password").val(),
        "person":{
            "id":parseInt($("#selected_person_id").val())
        } ,
        "role":[{
            "id":parseInt($("#role_id").val())
        } ],
        "state": parseInt($("#estado").val())
      };
      
      var id = $("#id").val();
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/user/" + id,
        data: jsonData,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }).done(function (result) {
        alert("Registro actualizado con éxito");
        loadData();
        clearData();
    
        //actualzar boton
        var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Agregar");
        btnAgregar.attr("onclick", "save()");
      });
    }catch (error) {
      alert("Error en actualizar user.");
      console.error("Error en la solicitud:", error);
      //actualzar boton
      loadData();
      clearData();
      var btnAgregar = $('button[name="btnAgregar"]');
      btnAgregar.text("Agregar");
      btnAgregar.attr("onclick", "save()");
    }
  }

  function findById(id) {
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/user/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        var data=response.data;
        $("#id").val(data.id);
        $("#ussername").val(data.username);
        $('#password').val(data.password);
        $("#selected_person_id").val(data.person.id);
        $("#person_id").val(data.person.firstName+" "+data.person.lastName);
        $("#role_id").val(data.role[0].id);
        $("#estado").val(data.state == true ? 1 : 0);
  
        //Cambiar boton.
        var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Actualizar");
        btnAgregar.attr("onclick", "update()");
      },
      error: function (error) {
        // Función que se ejecuta si hay un error en la solicitud
        console.error("Error en la solicitud:", error);
      },
    });
  }