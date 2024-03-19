
function save() {
    
    try {
      
      var data = {
        "firstName": $("#firstName").val(),
        "lastName": $("#lastName").val(),
        "email": $("#email").val(),
        "phone": $("#phone").val(),
        "dateOfBirth": $("#dateOfBirth").val(),
        "gender": $("#gender").val(),
        "address": $("#address").val(),  
        
        "city":{
            "id":parseInt($("#selected_ciudad_id").val())
        },
        "state": true
      };
  
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/person",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: jsonData,
        success: function(data) {
          alert("Registro agregado con éxito");
          clearData();
        },
        error: function(error) {
          alert(`la persona: ${$("#ciudad_id").val()}  ya cuanta con una cuenta de usuario `);
          //console.log($("#person_id").val());
        },
      });
    } catch (error) {
      console.error("Error obteniendo el cliente:", error);
    }
  }


  function loadCity() {
    console.log("ejecutando loadPerosn");
    $.ajax({
        url: "http://localhost:9000/service-security/v1/api/ciudad",
        method: "GET",
        dataType: "json",
        success: function (response) {
            if (response.status && Array.isArray(response.data)) {
                var html = "";
                response.data.forEach(function(person) {
                    html += `<option value="${ciudad.city}" data-ciudad-id="${ciudad.id}">`;
                });
                $("#ciudad").html(html);

                // Asignar el ID de la persona seleccionada al campo oculto cuando se selecciona una opción del datalist
                $("#ciudad_id").on("input", function() {
                    var selectedciudadId = $("#ciudad option[value='" + $(this).val() + "']").data("ciudad");
                    $("#selected_ciudad_id").val(selectedciudadId);
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




  function clearData() {
    $("#id").val("");
    $("#ussername").val("");
    $("#password").val("");
    $("#person_id").val("");
    $("#role_id").val("");
    $("#estado").val("");
  }


  function loadData() {
    console.log("ejecutando loadData");
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/ciudad",
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log(response.data);
        var html = "";
        var data = response.data;
        data.forEach(function (item) {
          // Construir el HTML para cada objeto
          html +=
            `<tr>
                    <td>${item.firstName}</td>
                    <td>` + item.lastName + `</td>
                    <td>${item.ciudad.name}</td>
                  
                    <td>` + (item.state == true ? "Activo" : "Inactivo") + `</td>
                    <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findById(${item.id})"> <img src="../assets/icon/pencil-square.svg" > </button>
                    <button type="button" class="btn btn-primary" onclick="deleteById(${item.id})"> <img src="../assets/icon/trash3.svg" > </button></td>
                </tr>`;
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
      url: "http://localhost:9000/service-security/v1/api/ciudad/" + id,
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
        "firstName": $("#firstName").val(),
        "lastName": $("#lastName").val(),
        "email": $("#email").val(),
        "phone": $("#phone").val(),
        "dateOfBirth": $("#dateOfBirth").val(),
        "gender": $("#gender").val(),
        "address": $("#address").val(),  
        
        "ciudad":{
            "id":parseInt($("#selected_ciudad_id").val())
        },
        "state": true
      };
      
      var id = $("#id").val();
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/ciudad/" + id,
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
      url: "http://localhost:9000/service-security/v1/api/ciudad/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        var data=response.data;
        $("#id").val(data.id);
        $("#firstName").val(data.firstName);
        $('#lastName').val(data.lastName);
        $('#dateOfBirth').val(data.dateOfBirth);
        
        $('#gender').val(data.gender);
        $('#address').val(data.address);
        $("#selected_city_id").val(data.ciudad.id);
        $("#person_id").val(data.ciudad.firstName+" "+data.ciudad.lastName);
       
       
  
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