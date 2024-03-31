const navbar = document.getElementById("header")
const footer = document.getElementById("footer")

let actualUrl = window.location.pathname.split('/')

if (actualUrl[1] === "proyecto-cac") {
  navbar.innerHTML = `
  <picture>
    <a href="/">
      <img src=${actualUrl[2] === "pages" ? "../public/logo.svg" : "./public/logo.svg"} alt="logo" class="logo">
    </a>
  </picture>
  <p>Proyecto grupal de Codo a Codo</p>
  <nav class="navbar">
    <a href="/" class="link">Inicio</a>
    <a href=${actualUrl[2] === "pages" ? "detalle.html" : "proyecto-cac/pages/detalle.html"} class="link">Buscador</a>
    <a href=${actualUrl[2] === "pages" ? "azar.html" : "proyecto-cac/pages/azar.html"} class="link">Al azar</a>
    <a href=${actualUrl[2] === "pages" ? "contacto.html" : "proyecto-cac/pages/contacto.html"} class="link">Contacto</a>
  </nav>
  `;

  footer.innerHTML = `
  <img src=${actualUrl[2] === "pages" ? "../public/cac.webp" : "./public/cac.webp"} alt="codo a codo" class="cac">
  <p>Proyecto Full Stack con Python de Codo a Codo - 2024 </p>
  `;
}

navbar.innerHTML = `
  <picture>
    <a href="/">
      <img src=${actualUrl[1] === "pages" ? "../public/logo.svg" : "./public/logo.svg"} alt="logo" class="logo">
    </a>
  </picture>
  <p>Proyecto grupal de Codo a Codo</p>
  <nav class="navbar">
    <a href="/" class="link">Inicio</a>
    <a href=${actualUrl[1] === "pages" ? "detalle.html" : "pages/detalle.html"} class="link">Buscador</a>
    <a href=${actualUrl[1] === "pages" ? "azar.html" : "pages/azar.html"} class="link">Al azar</a>
    <a href=${actualUrl[1] === "pages" ? "contacto.html" : "pages/contacto.html"} class="link">Contacto</a>
  </nav>
`;

footer.innerHTML = `
  <img src=${actualUrl[1] === "pages" ? "../public/cac.webp" : "./public/cac.webp"} alt="codo a codo" class="cac">
  <p>Proyecto Full Stack con Python de Codo a Codo - 2024 </p>
`;