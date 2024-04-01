const fetching = async () => {
  const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  const data = await res.json()

  console.log(data.drinks)
}

// fetching()