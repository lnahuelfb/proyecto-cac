const dataFetch = async (link) => {
  const res = await fetch(link)
  const { drinks } = await res.json()

  return drinks
}

const dataFetchAll = async () => {
  if (!sessionStorage.getItem("listaCompleta")) {
    let lista = await setTotalItems();
    let listaString = JSON.stringify(lista);
    sessionStorage.setItem("listaCompleta", listaString);
  }
}


const setTotalItems = async () => {
  let total = [];
  for (let letra = 'a'.charCodeAt(); letra <= 'z'.charCodeAt(); letra++) {
    let data = await dataFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + String.fromCharCode(letra)) || [];

    const isDuplicate = total.find(el => el == data)

    if (!isDuplicate) {
      total = [...total, ...data];
    }

  }
  return total;
}

const createNewJson = async (lista) => {
  let listaFormateada = [];
  lista.forEach(el => {

    let json = {};
    json.codigo = el.idDrink;
    json.nombre = el.strDrink;
    json.instrucciones = el.strInstructions;
    json.vaso = el.strGlass;
    json.imagen = el.strDrinkThumb;
    json.ingredientes = [];
    json.medidas = [];
    json.alcohol = el.strAlcoholic;
    json.categoria = el.strCategory;
    
    
    for (let key in el) {

      if (key.includes("strIngredient")) {
        if (el[key]) {
          json.ingredientes.push(el[key]);
        }
      }
      if (key.includes("strMeasure")) {
        if (el[key]) {
          json.medidas.push(el[key]);
        }
      }
    }
    listaFormateada.push(json);


  });

  let listaStringFormateada = JSON.stringify(listaFormateada);
  sessionStorage.setItem("listaFormateada", listaStringFormateada);

  if (!sessionStorage.getItem("listaFormateada")) {
    let listaFormateada = [];
    lista.forEach(el => {

      let json = {};
      json.codigo = el.idDrink;
      json.nombre = el.strDrink;
      json.instrucciones = el.strInstructions;
      json.vaso = el.strGlass;
      json.imagen = el.strDrinkThumb;
      json.ingredientes = [];
      json.medidas = [];
      json.alcohol = el.strAlcoholic;
      json.categoria = el.strCategory;

      for (let key in el) {

        if (key.includes("strIngredient")) {
          if (el[key]) {
            json.ingredientes.push(el[key]);
          }
        }
        if (key.includes("strMeasure")) {
          if (el[key]) {
            json.medidas.push(el[key]);
          }
        }
      }
      listaFormateada.push(json);


    });
    let listaStringFormateada = JSON.stringify(listaFormateada);
    sessionStorage.setItem("listaFormateada", listaStringFormateada);
  }
}

export { dataFetch, dataFetchAll, createNewJson }

