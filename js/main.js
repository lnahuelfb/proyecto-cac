const navbar = document.getElementById("header")
const footer = document.getElementById("footer")

const year = new Date().getFullYear()
let actualUrl = window.location.pathname


navbar.innerHTML = `
  <picture>
    <img src="/public/logo.svg" alt="logo" class="logo">
  </picture>
  <p>Proyecto grupal de Codo a Codo</p>
  <nav class="navbar">
    <a href=${actualUrl = "/home.html" ? "/home.html" : "../home.html"} class="link">Inicio</a>
    <a href="/pages/detalle.html" class="link">Buscador</a>
    <a href="/pages/azar.html" class="link">Al azar</a>
    <a href="/pages/contacto.html" class="link">Contacto</a>
  </nav>
`;

footer.innerHTML = `
  <img src="/public/cac.webp" alt="codo a codo" class="cac">
  <p>Proyecto Full Stack con Python de Codo a Codo - ${year} </p>
`;