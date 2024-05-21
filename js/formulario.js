

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
    
    //console.log(datosCompletos);
    
    let imageUrl;
    
    const data = {
     
      image: datosCompletos.imagen,
  
    };

    

    axios.post(
      "https://api.imgbb.com/1/upload?expiration=600&key=26f28e4bc7f55a1a7773a42ac7f376cf",//?key=6d207e02198a847aa98d0a2a901485a5",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("API response ↓");
        console.log(response);
        datosCompletos.imagen = response.data.data.url;
        console.log(datosCompletos);
        // if (sessionStorage.getItem("datosFormulario")){
        //   sessionStorage.removeItem("datosFormulario");
        // }
        sessionStorage.setItem("datosFormulario", JSON.stringify(datosCompletos));
      })
      .catch((err) => {
        console.log("API error ↓");
        console.log(err);

        if (err.response.data.error) {
          console.log(err.response.data.error);
          //When trouble shooting, simple informations about the error can be found in err.response.data.error so it's good to display it
        }
        
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
    //elimino la primer parte de la cadena que no necesito
    datosCompletos.imagen = base64.split(',')[1];
    
  };

  inputImagen.addEventListener("change", (e) => {
    uploadImage(e);
  });