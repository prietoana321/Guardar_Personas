window.onload = () => {

  const form = document.querySelector('#formulario');


  /**
   * Guardar los personas
   */

  form.addEventListener('submit', (event) => {

    event.preventDefault();

    if (document.querySelector('#nombre').value == '' || document.querySelector('#apellido').value == "") {

      document.querySelector('message').innerHTML = '<p class="error">Llenar todos los campos</p>';

      setInterval(() => {
        document.querySelector('message').innerHTML = '';
      }, 3000);

    } else {

      let data = new FormData(event.currentTarget);

      let request;

      if (window.XMLHttpRequest) request = new XMLHttpRequest();
      else request = new ActiveXObject('Microsoft.XMLHTTP');

      request.addEventListener('load', () => {

        fillTable();

        document.querySelector('message').innerHTML = '<p>Agregado exitoso</p>';

        document.querySelector('#nombre').value = '';
        document.querySelector('#apellido').value = '';

        setInterval(() => {
          document.querySelector('message').innerHTML = '';
        }, 3000);

      });

      request.open(
        'POST',
        './insert.php',
        true,
        request.responseType = 'json'
      );

      request.send(data);

    }

  });


  /**\
   * Llenar tabla
   */
  let fillTable = () => {
    let request;

    if (window.XMLHttpRequest) request = new XMLHttpRequest();
    else request = new ActiveXObject('Microsoft.XMLHTTP');

    request.addEventListener('load', () => {

      document.querySelector('tbody').innerHTML = '';

      let resp = request.response;

      console.log(resp);

      for (let dataDB of resp) {

        document.querySelector('tbody').innerHTML += `<tr>
                                                        <td>${dataDB.id}</td>
                                                        <td>${dataDB.nombre}</td>
                                                        <td>${dataDB.apellido}</td>
                                                        <td><button class="delete" item="${dataDB.id}">Eliminar</button></td>
                                                      </tr>`;

      }

      let btnDel = document.querySelectorAll('.delete');

      for (let i = 0; i < btnDel.length; i++) {
        btnDel[i].addEventListener('click', () => {
          deleteData(btnDel[i].getAttribute('item'));
        });
      }

    });

    request.open(
      'POST',
      './getData.php',
      true,
      request.responseType = 'json'
    );

    request.send();


  }




  /**
   * Eliminar
   */
  let deleteData = (item) => {
    let data = new FormData();

    data.append('id', item);

    let request;

    if (window.XMLHttpRequest) request = new XMLHttpRequest();
    else request = new ActiveXObject('Microsoft.XMLHTTP');

    request.addEventListener('load', () => {
      fillTable();
      document.querySelector('message').innerHTML = '<p class="success">Eliminado exitoso</p>';

    });

    request.open(
      'POST',
      './delete.php',
      true,
      request.responseType = 'json'
    );

    request.send(data);

  }



  fillTable();


}