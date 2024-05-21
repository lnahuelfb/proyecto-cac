import { dataFetchAll, createNewJson } from "./fetch.js"


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
let filtroSegunBusqueda = []

console.log(listaFormateadaJson);


    let boton = document.getElementById('botonBuscar');
    boton.addEventListener("click", mostrarBusqueda)
  


function mostrarBusqueda(){
    let busqueda = document.getElementById('palabraABuscar').value.toLowerCase();
    filtroSegunBusqueda = [];
    console.log("Estoy buscando: " + "\"" + busqueda + "\"");
    listaFormateadaJson.forEach(el => {
        if(el.nombre.toLowerCase().includes(busqueda)) {
            if(!filtroSegunBusqueda.includes(el)) {
                filtroSegunBusqueda.push(el);
            }
        }

        el.ingredientes.forEach(ing => {
            if(ing.toLowerCase().includes(busqueda)){
                if(!filtroSegunBusqueda.includes(el)) {
                    filtroSegunBusqueda.push(el);
                }
            }
            
        });
        
    });

    console.log("nueva lista de tragos: \n");
    console.log(filtroSegunBusqueda);
    
    mostrarTarjetas()
}

function mostrarTarjetas() {
    
    let contenido = document.getElementById("contenido");
    let texto = contenido.getElementsByClassName("texto");

    if(texto) {
        Array.from(texto).forEach(el=>contenido.removeChild(el));
    }
        
    let tarjetas = document.getElementsByClassName("card");
    if(tarjetas) {
        Array.from(tarjetas).forEach(el=>contenido.removeChild(el));
    }

    if(filtroSegunBusqueda.length == 0) {
        let textoNoEncontrado = document.createElement('p');
        textoNoEncontrado.className = 'texto primero';
        textoNoEncontrado.innerText = "No se encontro ninguna bebida que incluya el texto buscado!!"
        contenido.appendChild(textoNoEncontrado);
    } else {
        for (let x = 0; x < filtroSegunBusqueda.length; x++) { //dentro crea las tres tarjetas de contenido
            const card = document.createElement('div')
            card.className = 'card';
            contenido.appendChild(card);
        
            const imagen = document.createElement('img');
            imagen.src = filtroSegunBusqueda[x].imagen;
            imagen.alt = filtroSegunBusqueda[x].nombre;
            imagen.className = 'card-img-top'
            card.appendChild(imagen);
        
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            card.appendChild(cardBody);
        
        
            const titulo = document.createElement('h5');
            titulo.className = 'card-title';
            titulo.innerText = filtroSegunBusqueda[x].nombre;
            cardBody.appendChild(titulo);
            const boton = document.createElement('a');
            boton.className = 'btn btn-primary';
            boton.href = '#';
            boton.innerText = "Ver detalles"
            cardBody.appendChild(boton);
            boton.addEventListener('click',  function () {
                // cuando clickeo el boton redirijo a otra pagina
                redirrecionaDetalle(filtroSegunBusqueda[x].codigo)
              });
          }   
        } 
        let footer = document.getElementById("footer");
        document.body.removeChild(footer);
        document.body.appendChild(footer);

        
}

function redirrecionaDetalle(elemento){
    console.log(elemento);
    location.href ="detalle.html?id="+elemento;
  }