// JavaScript para la funcionalidad del menú

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle")
  const leftLinks = document.querySelector(".left-links")
  const rightLinks = document.querySelector(".right-links")

  if (menuToggle && leftLinks && rightLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      leftLinks.classList.toggle("active")
      rightLinks.classList.toggle("active")
    })

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll(".nav-links a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        leftLinks.classList.remove("active")
        rightLinks.classList.remove("active")
      })
    })
  }

  // Cambiar estilo del header al hacer scroll
  const header = document.querySelector(".transparent-header")
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }
})

