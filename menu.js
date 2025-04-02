// JavaScript para la funcionalidad del menú

// Menú móvil
const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelectorAll(".nav-links")

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navLinks.forEach((nav) => {
    nav.classList.toggle("active")
  })
})

// Cerrar menú al hacer clic en un enlace
const links = document.querySelectorAll(".nav-links a")
links.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navLinks.forEach((nav) => {
      nav.classList.remove("active")
    })
  })
})

// Cambiar estilo del header al hacer scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".transparent-header")
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

