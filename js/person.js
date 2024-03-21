function save() {
  try {
    var selectedCityId = parseInt($("#selected_city_id").val());
    if (isNaN(selectedCityId) || selectedCityId === null) {
      console.error("ID de ciudad no válido");
      return;
    }

    var personData = {
      "firstName": $("#firstName").val(),
      "lastName": $("#lastName").val(),
      "email": $("#email").val(),
      "phone": $("#phone").val(),
      "dateOfBirth": $("#dateOfBirth").val(),
      "gender": $("#gender").val(),
      "address": $("#address").val(),
      "city": {
        "id": selectedCityId
      },
      "state": true
    };

 
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/person",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(personData),
      success: function(data) {
        var id = data.id
        console.log(data.data);
      

        alert("Registro agregado con éxito" +id);
        clearData();
        loadData();
      },
      error: function(error) {
        alert(`La persona: ${$("#person_id").val()} ya cuenta con una cuenta de usuario`);
        //console.log($("#person_id").val());
      },
    });
  } catch (error) {
    console.error("Error obteniendo el cliente:", error);
  }

 
}







function loadCity() {
  console.log("ejecutando loadCity");
  $.ajax({
    url: "http://localhost:9000/service-security/v1/api/city/list",
    method: "GET",
    dataType: "json",
    success: function (response) {
      if (response.status && Array.isArray(response.data)) {
        var html = "";
        response.data.forEach(function (city) {
          html += `<option value="${city.name_city}" data-city-id="${city.id}">${city.name_city}</option>`;
          // Recorrer la lista de ciudades y mostrar su ID
          console.log(`ID de ${city.name_city}: ${city.id}`);
        });
        $("#citys").html(html);

        // Asignar el ID de la ciudad seleccionada al campo oculto cuando se selecciona una opción del datalist
        $("#city_id").on("input", function () {
          var selectedCityId = parseInt($("#citys option[value='" + $(this).val() + "']").data("city-id"));
          if (!isNaN(selectedCityId)) {
            $("#selected_city_id").val(selectedCityId);
            console.log("ID de ciudad seleccionada: " + selectedCityId);
          } else {
            console.error("ID de ciudad no válido");
          }
        });
      } else {
        console.error("Error: No se pudo obtener la lista de ciudades.");
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
  $("#firstName").val("");
  $("#lastName").val("");
  $("#email").val("");
  $("#phone").val("");
  $("#dateOfBirth").val("");
  $("#gender").val("");
  $("#address").val("");
  $("#city_id").val("");
 
  $("#estado").val("");
}



function loadData() {
  console.log("ejecutando loadData");
  $.ajax({
    url: "http://localhost:9000/service-security/v1/api/person",
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
                  <td>${item.firstName}</td>
                  <td>` + item.lastName + `</td>
                  <td>` + item.email + `</td>
                  <td>` + item.phone + `</td>
                  <td>` + item.dateOfBirth + `</td>
                  <td>` + item.gender + `</td>
                  <td>` + item.address + `</td>
                  <td>` + item.city.name_city + `</td>
                  
            
                  <td>` + (item.state == true ? "Activo" : "Inactivo") + `</td>
                  <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findById(${item.id})"> <img src="../assets/icon/pencil-square.svg" > </button>
                  <button type="button" class="btn btn-secundary" onclick="deleteById(${item.id})"> <img src="../assets/icon/trash3.svg" > </button></td>
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
    url: "http://localhost:9000/service-security/v1/api/person/" + id,
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
      "city":{
          "id":parseInt($("#selected_city_id").val())
      } ,
      
      "state": true
    };
    
    var id = $("#id").val();
    var jsonData = JSON.stringify(data);
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/person/" + id,
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
    url: "http://localhost:9000/service-security/v1/api/person/" + id,
    method: "GET",
    dataType: "json",
    success: function (response) {
      var data=response.data;
      $("#id").val(data.id);
      $("#firstName").val(data.firstName);
      $("#lastName").val(data.lastName);
      $('#email').val(data.email);
      $('#phone').val(data.phone);
      $('#dateOfBirth').val(data.dateOfBirth);
      $('#gender').val(data.gender);
      $('#address').val(data.address);
  
      $("#selected_city_id").val(data.city.id);
      $("#city_id").val(data.city.firstName+" "+data.city.lastName);
     
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


function clearData() {
  $("#id").val("");
 
  $("#email").val("");
  $("#phone").val("");
  $("#dateOfBirth").val("");
  $("#gender").val("");
  $("#address").val("");
  $("#city_id").val("");
 
  $("#estado").val("");
}
