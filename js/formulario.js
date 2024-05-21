//import * as axios from './axiosaso.js';

const inputImagen = document.getElementById("imagen_trago");
let datosCompletos ={};

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputs = formulario.querySelectorAll('.formulario_input');
    const selects = formulario.querySelectorAll('select');
    const radios = formulario.querySelectorAll('input[type="radio"]');
    const mensajesError = formulario.querySelectorAll('.formulario_input-error');
    const mensajeGeneral = document.getElementById('formulario_mensaje');
    const mensajeExito = document.getElementById('formulario_mensaje-exito');
    
    
  
    const expresiones = {
      texto: /^[a-zA-ZÀ-ÿ\s]{1,40}$/ // Letras y espacios, pueden llevar acentos.
    };
  
    const validarCampo = (expresion, input, grupo) => {
      if(expresion.test(input.value)) {
        document.getElementById(`grupo_${grupo}`).classList.remove('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${grupo}`).classList.add('formulario_grupo-correcto');
        document.querySelector(`#grupo_${grupo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
      } else {
        document.getElementById(`grupo_${grupo}`).classList.add('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${grupo}`).classList.remove('formulario_grupo-correcto');
        document.querySelector(`#grupo_${grupo} .formulario_input-error`).classList.add('formulario_input-error-activo');
      }
    };
  
    const validarRadios = (radios, grupo) => {
      let checked = false;
      radios.forEach(radio => {
        if(radio.checked) checked = true;
      });
  
      if(checked) {
        document.getElementById(grupo).classList.remove('formulario_grupo-incorrecto');
        document.getElementById(grupo).classList.add('formulario_grupo-correcto');
        document.querySelector(`#${grupo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
      } else {
        document.getElementById(grupo).classList.add('formulario_grupo-incorrecto');
        document.getElementById(grupo).classList.remove('formulario_grupo-correcto');
        document.querySelector(`#${grupo} .formulario_input-error`).classList.add('formulario_input-error-activo');
      }
    };
  
    const validarSelect = (select, grupo) => {
      if(select.value === '') {
        document.getElementById(grupo).classList.add('formulario_grupo-incorrecto');
        document.getElementById(grupo).classList.remove('formulario_grupo-correcto');
        document.querySelector(`#${grupo} .formulario_input-error`).classList.add('formulario_input-error-activo');
      } else {
        document.getElementById(grupo).classList.remove('formulario_grupo-incorrecto');
        document.getElementById(grupo).classList.add('formulario_grupo-correcto');
        document.querySelector(`#${grupo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
      }
    };
  
    inputs.forEach((input) => {
      input.addEventListener('keyup', (e) => {
        switch (e.target.name) {
          case 'nombre':
            validarCampo(expresiones.texto, e.target, 'nombre');
            break;
          case 'apellido':
            validarCampo(expresiones.texto, e.target, 'apellido');
            break;
        }
      });
  
      input.addEventListener('blur', (e) => {
        switch (e.target.name) {
          case 'nombre':
            validarCampo(expresiones.texto, e.target, 'nombre');
            break;
          case 'apellido':
            validarCampo(expresiones.texto, e.target, 'apellido');
            break;
        }
      });
    });
  
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
      validarCampo(expresiones.texto, document.getElementById('nombre'), 'nombre');
      validarCampo(expresiones.texto, document.getElementById('apellido'), 'apellido');
      validarRadios(radios, 'grupo_frecuencia');
      validarSelect(document.getElementById('prepara_tragos'), 'grupo_prepara_tragos');
      
      const errores = document.querySelectorAll('.formulario_grupo-incorrecto');
  
      if(errores.length === 0) {
        mensajeGeneral.classList.remove('formulario_mensaje-activo');
        mensajeExito.classList.add('formulario_mensaje-exito-activo');
        // llamar a función de guardado de imagen
        
        guardaDatos();

        setTimeout(() => {
          mensajeExito.classList.remove('formulario_mensaje-exito-activo');
        }, 5000);
      } else {
        mensajeGeneral.classList.add('formulario_mensaje-activo');
      }
    });
  });
  

  function guardaDatos(){
    console.log("guardando datos");
    datosCompletos.nombre = document.getElementById("nombre").value;
    datosCompletos.apellido = document.getElementById("apellido").value;
    datosCompletos.prepara = document.getElementById("prepara_tragos").value
      let valoresRadio = document.getElementsByName("frecuencia")
      let seleccionRadio;
      for(var i = 0; i < valoresRadio.length; i++){
          if(valoresRadio[i].checked){
            seleccionRadio = valoresRadio[i].value;
          }
      }    
    datosCompletos.consume = seleccionRadio;    
    
    console.log(datosCompletos);
    
    let imageUrl;
    const data = {
      key: "6d207e02198a847aa98d0a2a901485a5",
      source: "data:image/jpeg;base64,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" //datosCompletos.imagen,
      //name: "imagen_de_prueba",
      //expiration:3600
      
    };

    
/*
    axios.post(
      "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
        data//,
        //{
          //headers: {
            //"Content-Type": "multipart/form-data",
          //},
        //}
      )
      .then((response) => {
        console.log("API response ↓");
        console.log(response);
      })
      .catch((err) => {
        console.log("API error ↓");
        console.log(err);

        if (err.response.data.error) {
          console.log(err.response.data.error);
          //When trouble shooting, simple informations about the error can be found in err.response.data.error so it's good to display it
        }
        
      });*/
  
    const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
    fetch("https://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*'
                
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        imageUrl = data.image.url;
        datosCompletos.imagen = imageUrl;
      })
      .catch(error => {
        console.log("no se pudo subir la imagen");
      });
    
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    //console.log(base64)
    datosCompletos.imagen = base64;
  };

  inputImagen.addEventListener("change", (e) => {
    uploadImage(e);
  });