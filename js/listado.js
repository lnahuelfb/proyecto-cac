import { dataFetch } from './fetch.js';



const setItems = async () => {
  const list = document.querySelector('.list')

  for (let i = 0; i < 30; i++) {
    const data = await dataFetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')

    const item = document.createElement('li')
    item.className = 'item'
    list.appendChild(item)

    const image = document.createElement('img')
    image.src = data[0].strDrinkThumb
    image.alt = data[0].strDrink
    image.className = 'image'
    item.appendChild(image)

    const title = document.createElement('p')
    title.textContent = `${data[0].strDrink}`
    title.className = 'title'
    item.appendChild(title)
  }

}

setItems()