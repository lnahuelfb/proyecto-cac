
var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("id");


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

let elemento = listaFormateadaJson.filter(el=> el.codigo == c);

console.log(elemento[0])

let trago = elemento[0].codigo;

console.log(trago);

//imprime titulo
let titulo = document.getElementById("titulo");
titulo.innerText = elemento[0].nombre;

//imprime imagen
let imagen = document.getElementById("imgDetalle");
imagen.src = elemento[0].imagen;

//imprime istrucciones
let instrucciones = document.getElementById("instrucciones");
instrucciones.innerText = elemento[0].instrucciones;


//imprime ingredientes
let ingredientes = document.getElementById("ingredientes");
for(let x=0; x<elemento[0].ingredientes.length;x++){
    let parrafo = document.createElement('p');
    parrafo.innerText = elemento[0].ingredientes[x] + " - " + elemento[0].medidas[x];
    ingredientes.appendChild(parrafo);
}

document.getElementById("volver").addEventListener("click", () => {
    history.back();
  });


  document.getElementById("guardar").addEventListener("click", async() => {
    console.log("prueba\n\n", JSON.stringify(elemento[0]))

    const respuesta = await guardarTrago(elemento[0]);
    console.log(await respuesta.json())
    console.log(respuesta.status)
    if (respuesta.status === 201){
        alert("Se guardo correctamente!")
        window.location.href = "favoritos.html";
    } else{
      alert("No se pudo guardar")
    }
    
  });
  

  const guardarTrago = async (el) => {
      let data = await fetch('http://127.0.0.1:5000/api/drinks/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(el)
      });  
      return data;
  }

  const eliminarFavorito = async (codigo) => {
    await fetch(`http://127.0.0.1:5000/api/drinks/${trago}`, {
      method: "DELETE",
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {if(response.status == 204){
                        alert("Se elimino correctamente!")
                        window.location.href = "favoritos.html";
                        
                      } else{
                          alert("No se pudo guardar")
                      }
    })

  

}

  document.getElementById("eliminar").addEventListener("click", () => {
    eliminarFavorito(trago);
  });

  const checkFavoritos = async () => {
    let data = await fetch(`http://127.0.0.1:5000/api/drinks/${trago}`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    }).then(response => response.json())
      .then(json => {
        console.log(JSON.stringify(json))
        console.log(json);
        if(json){
          document.getElementById("eliminar").classList.remove("invisible")
          document.getElementById("guardar").classList.add("invisible")
        }
  } )  
  }

 

  window.onload = checkFavoritos();





