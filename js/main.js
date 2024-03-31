const navbar = document.getElementById("header")
const footer = document.getElementById("footer")

navbar.innerHTML = `
  <picture>
    <a href="/index.html">
      <img src="/public/logo.svg" alt="logo" class="logo">
    </a>
  </picture>
  <p>Proyecto grupal de Codo a Codo</p>
  <nav class="navbar">
    <a href="/index.html" class="link">Inicio</a>
    <a href="/pages/detalle.html" class="link">Buscador</a>
    <a href="/pages/azar.html" class="link">Al azar</a>
    <a href="/pages/contacto.html" class="link">Contacto</a>
  </nav>
`;

footer.innerHTML = `
  <img src="/public/cac.webp" alt="codo a codo" class="cac">
  <p>Proyecto Full Stack con Python de Codo a Codo - 2024 </p>
`;