import { dataFetchAll, createNewJson} from "./fetch.js"

const contenido = document.getElementById('contenido');
const main = document.getElementsByTagName('main')[0];


let buttons;
//const spinner = document.createElement('p');
//spinner.className = "prueba";
//spinner.innerText = "prueba";
//contenido.appendChild(spinner)
const spinner = document.getElementById('spinner')
const carousel = document.getElementById('carouselExampleAutoplaying')
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


let conAlcohol =[];
let sinAlcohol=[];
let opcionAlcohol=[];

listaFormateadaJson.forEach(el => {
    if(el.alcohol === "Alcoholic" ){
        conAlcohol.push(el);
    }else if(el.alcohol === "Non alcoholic" ){
        sinAlcohol.push(el);
    } else {
        opcionAlcohol.push(el);
    }
    
});

const setGaleria = async () => {
    
    
    for(let i = 0; conAlcohol.length; i=i+3) { //cada tres elemento crea una tarjeta
        const item = document.createElement('div');
        item.className = 'carousel-item';
        if(i === 0){
            item.classList.add('active');
         }
        contenido.appendChild(item);
        
        for(let x = 0; x <=2;x++){ //dentro crea las tres tarjetas de contenido
            
                const card = document.createElement('div')
                card.className = 'card';
                item.appendChild(card);
                
                    const imagen = document.createElement('img');
                    
                    imagen.src = conAlcohol[i+x].imagen;
                    imagen.alt = conAlcohol[i+x].nombre;
                    imagen.className = 'card-img-top'
                    card.appendChild(imagen);
                    
                    const cardBody = document.createElement('div');
                    cardBody.className = 'card-body';
                    card.appendChild(cardBody);
    
                    
                    const titulo = document.createElement('h5');
                    titulo.className = 'card-title';
                    titulo.innerText = conAlcohol[i+x].nombre
                    cardBody.appendChild(titulo);
                    const boton = document.createElement('a');
                    boton.className = 'btn btn-primary';
                    boton.setAttribute("id", "uniqueIdentifier");
                    boton.id = conAlcohol[i+x].codigo;
                    boton.href = '#';
                    boton.innerText = "Ver detalles"
                    cardBody.appendChild(boton);

        }
    }
}


setTimeout(()=>{
    //spinner.classList.add("prueba2");
    contenido.removeChild(spinner);
    setGaleria()
    buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
        button.addEventListener("click", function() {
          // do something when the button is clicked
          console.log(button.id);
          eleccion(button.id);
        });
      });
}, 2000);


let eleccion = (codigo)=> {
    carouselExampleAutoplaying.remove();
    let elemento = listaFormateadaJson.filter(el => el.codigo == codigo);
    //console.log(elemento);
    //const cosa = document.createElement('p')
    //main.appendChild(cosa)
    //cosa.innerText = 'probando probando'

    const imgElemento = document.createElement('img');
    const tituloElemento = document.createElement('h1');
    const descripcionElemento = document.createElement('p');
    const ingredientesElemento = document.createElement('p');
    const cantidadesElemento = document.createElement('p');
    imgElemento.src = elemento[0].imagen;
    tituloElemento.innerText = elemento[0].nombre;
    descripcionElemento.innerText = elemento[0].instrucciones;

    main.appendChild(imgElemento);
    main.appendChild(tituloElemento);
    main.appendChild(descripcionElemento);

    console.log(elemento)
    
}






