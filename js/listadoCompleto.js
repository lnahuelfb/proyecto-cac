
const dataFetch1 = async (link) => {
    const res = await fetch(link)
    const { drinks } = await res.json()
  
    return drinks
  }
  
  const setTotalItems = async () => {
      let total = [];    
      for (let letra = 'a'.charCodeAt(); letra <= 'z'.charCodeAt(); letra++ ){
          let data = await dataFetch1('https://www.thecocktaildb.com/api/json/v1/1/search.php?f='+String.fromCharCode(letra)) || [];
          
          total = [...total,...data];
      }
      
      //console.log(total);
      return total;
  }
  
  export { setTotalItems }