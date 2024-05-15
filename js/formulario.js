const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            if(expresiones.nombre.test(e.target.value)){

            } else{
                document.getElementById('grupo_nombre').classList.add('.formulario_grupo-incorrecto');
            }
        break;
        case "apellido":
            
        break;
        
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

formulario.addEventListener('submit' , (e)=> {
    // esta linea hace que cuando click a enviar no haga nada
    e.preventDefault();
});
