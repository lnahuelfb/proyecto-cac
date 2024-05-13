const navbar = document.getElementById("header")
const footer = document.getElementById("footer")
import { dataFetchAll, createNewJson} from "./fetch.js"

navbar.innerHTML = `
  <picture>
    <a href="index.html">
      <img src="public/logo.svg" alt="logo" class="logo">
    </a>
  </picture>
  <p>Proyecto grupal de Codo a Codo</p>
  <nav class="navbar">
    <a href="index.html" class="link">Inicio</a>
    <a href="buscador.html" class="link">Buscador</a>
    <a href="azar.html" class="link">Al azar</a>
    <a href="contacto.html" class="link">Contacto</a>
  </nav>
`

footer.innerHTML = `
  <img src="public/cac.webp" alt="codo a codo" class="cac">
  <p>Proyecto Full Stack con Python de Codo a Codo - 2024 </p>
`

//funcion en fetch.js que trae todos los tragos y los guarda en session storage
// Si ya esta guardado en el Session Storage no hace nada
await dataFetchAll(); 

//Traigo la lista completa de tragos del Session Storage (formato String)
let lista2 = await sessionStorage.getItem("listaCompleta");

// Lo convierto a Json 
let lista2Json = JSON.parse(lista2);

// Toma la lista completa del session Storage y la reduzco con los elementos que necesito de la misma
await createNewJson(lista2Json);

//Traigo la lista formateada de tragos del Session Storage (formato String)
let listaFormateada = await sessionStorage.getItem("listaFormateada");

// Lo convierto a Json 
let listaFormateadaJson = JSON.parse(listaFormateada);

//Estos metodos están disponibles para utilizarlos en el sector de la pagina que sean necesarios







//console.log(lista);