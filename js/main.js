const navbar = document.getElementById("header")
const footer = document.getElementById("footer")

let [, actualUrl] = window.location.pathname.split('/')

console.log("actual path: ", actualUrl)

if (actualUrl === "proyecto-cac") {
  navbar.innerHTML = `
  <picture>
    <a href="/proyecto-cac/">
      <img src="/proyecto-cac/public/logo.svg" alt="logo" class="logo">
    </a>
  </picture>
  <p>Proyecto grupal de Codo a Codo</p>
  <nav class="navbar">
    <a href="/proyecto-cac/" class="link">Inicio</a>
    <a href="/proyecto-cac/pages/detalle" class="link">Buscador</a>
    <a href="/proyecto-cac/pages/azar" class="link">Al azar</a>
    <a href="/proyecto-cac/pages/contacto" class="link">Contacto</a>
  </nav>
  `

  footer.innerHTML = `
  <img src="/proyecto-cac/public/cac.webp" alt="codo a codo" class="cac">
  <p>Proyecto Full Stack con Python de Codo a Codo - 2024 </p>
  `
}

if (actualUrl !== "proyecto-cac") {
  navbar.innerHTML = `
    <picture>
      <a href="/">
        <img src="/public/logo.svg" alt="logo" class="logo">
      </a>
    </picture>
    <p>Proyecto grupal de Codo a Codo</p>
    <nav class="navbar">
      <a href="/" class="link">Inicio</a>
      <a href="/pages/detalle.html" class="link">Buscador</a>
      <a href="/pages/azar.html" class="link">Al azar</a>
      <a href="/pages/contacto.html" class="link">Contacto</a>
    </nav>
  `

  footer.innerHTML = `
    <img src="/public/cac.webp" alt="codo a codo" class="cac">
    <p>Proyecto Full Stack con Python de Codo a Codo - 2024 </p>
  `
}
