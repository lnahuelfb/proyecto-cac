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
        setTimeout(() => {
          mensajeExito.classList.remove('formulario_mensaje-exito-activo');
        }, 5000);
      } else {
        mensajeGeneral.classList.add('formulario_mensaje-activo');
      }
    });
  });
  