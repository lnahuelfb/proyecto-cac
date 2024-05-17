
/*
<div class="carousel-item active">
    <div class="card" style="width: 18rem;">
          <img src="https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <a href="#" class="btn btn-primary">Ver detalles</a>
          </div>
        </div>
*/

//Traigo la lista formateada de tragos del Session Storage (formato String)
let listaFormateada = await sessionStorage.getItem("listaFormateada");

// Lo convierto a Json 
let listaFormateadaJson = JSON.parse(listaFormateada);

let conAlcohol = [];
let sinAlcohol = [];
let opcionAlcohol = [];

listaFormateadaJson.forEach(el => {
  if (el.alcohol === "Alcoholic") {
    conAlcohol.push(el);
  } else if (el.alcohol === "Non alcoholic") {
    sinAlcohol.push(el);
  } else {
    opcionAlcohol.push(el);
  }

});

const setGaleria = async () => {
  const contenido = document.getElementById('contenido');
  console.log(contenido)

  for (let i = 0; conAlcohol.length; i = i + 3) { //cada tres elemento crea una tarjeta
    const item = document.createElement('div');
    item.className = 'carousel-item';
    if (i === 0) {
      item.classList.add('active');
    }
    contenido.appendChild(item);

    for (let x = 0; x <= 2; x++) { //dentro crea las tres tarjetas de contenido
      const card = document.createElement('div')
      card.className = 'card';
      item.appendChild(card);

      const imagen = document.createElement('img');
      imagen.src = conAlcohol[i + x].imagen;
      imagen.alt = conAlcohol[i + x].nombre;
      imagen.className = 'card-img-top'
      card.appendChild(imagen);

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
      card.appendChild(cardBody);


      const titulo = document.createElement('h5');
      titulo.className = 'card-title';
      titulo.innerText = conAlcohol[i + x].nombre;
      cardBody.appendChild(titulo);
      const boton = document.createElement('a');
      boton.className = 'btn btn-primary';
      boton.href = '#';
      boton.innerText = "Ver detalles"
      cardBody.appendChild(boton);


    }
  }
}

await setGaleria();


