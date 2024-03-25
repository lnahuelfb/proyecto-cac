const navbar = document.getElementById("navbar")
const footer = document.getElementById("footer")

let actualUrl = window.location.pathname
const year = new Date().getFullYear()

console.log('Hola mundo!');

navbar.innerHTML = `
    <a href=${actualUrl = "/index.html" ? "/index.html" : "../index.html"} class="link">Inicio</a>
    <a href="/pages/pagina1.html" class="link">Pagina 1</a>
    <a href="/pages/pagina2.html" class="link">Pagina 2</a>
    <a href="/pages/pagina3.html" class="link">Pagina 3</a>
`;

footer.innerHTML = `
<p>Proyecto Full Stack con Python de Codo a Codo - ${year} </p>
`