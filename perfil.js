// Script específico para la página de perfil

document.addEventListener("DOMContentLoaded", () => {
    // Configuración de partículas
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#d4af37", "#8a2be2", "#ff0066"],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#d4af37",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },
          bubble: {
            distance: 400,
            size: 4,
            duration: 2,
            opacity: 0.8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  
    // Navegación lateral y scroll
    const navItems = document.querySelectorAll(".nav-item")
    const sections = document.querySelectorAll(".profile-section")
    const mobileToggle = document.querySelector(".mobile-toggle")
    const profileNav = document.querySelector(".profile-nav")
  
    // Función para activar la sección correspondiente al hacer clic en un ítem del menú
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const sectionId = this.getAttribute("data-section")
  
        // Desactivar todos los ítems y secciones
        navItems.forEach((navItem) => navItem.classList.remove("active"))
        sections.forEach((section) => section.classList.remove("active"))
  
        // Activar el ítem y la sección correspondiente
        this.classList.add("active")
        document.getElementById(sectionId).classList.add("active")
  
        // Cerrar el menú móvil si está abierto
        if (window.innerWidth <= 768) {
          profileNav.classList.remove("active")
          mobileToggle.classList.remove("active")
        }
  
        // Scroll al inicio de la sección
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    })
  
    // Botón de menú móvil
    mobileToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      profileNav.classList.toggle("active")
    })
  
    // Cerrar el menú móvil al hacer clic fuera de él
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768 && !profileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        profileNav.classList.remove("active")
        mobileToggle.classList.remove("active")
      }
    })
  
    // Línea temporal
    const timelineEras = document.querySelectorAll(".timeline-era")
    const timelineContents = document.querySelectorAll(".timeline-era-content")
  
    timelineEras.forEach((era) => {
      era.addEventListener("click", function () {
        const eraId = this.getAttribute("data-era")
  
        // Desactivar todas las eras y contenidos
        timelineEras.forEach((e) => e.classList.remove("active"))
        timelineContents.forEach((c) => c.classList.remove("active"))
  
        // Activar la era y el contenido correspondiente
        this.classList.add("active")
        document.getElementById(eraId).classList.add("active")
      })
    })
  
    // Filtro de proyectos
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter")
  
        // Desactivar todos los botones
        filterBtns.forEach((b) => b.classList.remove("active"))
  
        // Activar el botón clickeado
        this.classList.add("active")
  
        // Filtrar proyectos
        projectCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  
    // Modales de proyectos
    const modalTriggers = document.querySelectorAll(".project-modal-trigger")
    const modals = document.querySelectorAll(".project-modal")
    const modalCloses = document.querySelectorAll(".modal-close")
  
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", function () {
        const projectId = this.getAttribute("data-project")
        const modal = document.getElementById(`${projectId}-modal`)
  
        if (modal) {
          modal.classList.add("active")
          document.body.style.overflow = "hidden"
        }
      })
    })
  
    modalCloses.forEach((close) => {
      close.addEventListener("click", function () {
        const modal = this.closest(".project-modal")
        modal.classList.remove("active")
        document.body.style.overflow = ""
      })
    })
  
    // Cerrar modal al hacer clic fuera del contenido
    modals.forEach((modal) => {
      modal.addEventListener("click", function (e) {
        if (e.target === this) {
          this.classList.remove("active")
          document.body.style.overflow = ""
        }
      })
    })
  
    // Cerrar modal con la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modals.forEach((modal) => {
          if (modal.classList.contains("active")) {
            modal.classList.remove("active")
            document.body.style.overflow = ""
          }
        })
      }
    })
  
    // Animación para elementos al hacer scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )
  
    // Observar elementos para animar
    const elements = document.querySelectorAll(
      ".milestone, .project-card, .collab-card, .initiative-card, .venture-card, .upcoming-venture",
    )
    elements.forEach((element) => {
      observer.observe(element)
    })
  
    // Añadir clase para CSS
    const style = document.createElement("style")
    style.textContent = `
      .milestone, .project-card, .collab-card, .initiative-card, .venture-card, .upcoming-venture {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .milestone.animate, .project-card.animate, .collab-card.animate, .initiative-card.animate, .venture-card.animate, .upcoming-venture.animate {
        opacity: 1;
        transform: translateY(0);
      }
      
      .milestone:nth-child(2) {
        transition-delay: 0.2s;
      }
      
      .milestone:nth-child(3) {
        transition-delay: 0.4s;
      }
      
      .milestone:nth-child(4) {
        transition-delay: 0.6s;
      }
      
      .milestone:nth-child(5) {
        transition-delay: 0.8s;
      }
      
      .milestone:nth-child(6) {
        transition-delay: 1s;
      }
      
      .project-card:nth-child(2) {
        transition-delay: 0.2s;
      }
      
      .project-card:nth-child(3) {
        transition-delay: 0.4s;
      }
      
      .project-card:nth-child(4) {
        transition-delay: 0.6s;
      }
      
      .project-card:nth-child(5) {
        transition-delay: 0.8s;
      }
      
      .project-card:nth-child(6) {
        transition-delay: 1s;
      }
      
      .collab-card:nth-child(2) {
        transition-delay: 0.2s;
      }
      
      .collab-card:nth-child(3) {
        transition-delay: 0.4s;
      }
      
      .collab-card:nth-child(4) {
        transition-delay: 0.6s;
      }
      
      .initiative-card:nth-child(2) {
        transition-delay: 0.2s;
      }
      
      .initiative-card:nth-child(3) {
        transition-delay: 0.4s;
      }
      
      .initiative-card:nth-child(4) {
        transition-delay: 0.6s;
      }
      
      .venture-card:nth-child(2) {
        transition-delay: 0.2s;
      }
      
      .venture-card:nth-child(3) {
        transition-delay: 0.4s;
      }
    `
    document.head.appendChild(style)
  
    // Formulario de contacto
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Simulación de envío de formulario
        const submitBtn = this.querySelector(".form-submit")
        const originalText = submitBtn.textContent
  
        submitBtn.textContent = "Enviando..."
        submitBtn.disabled = true
  
        setTimeout(() => {
          alert("¡Mensaje enviado con éxito! Gracias por contactar con Tupac Shakur.")
          this.reset()
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }, 2000)
      })
    }
  
    // Efecto de scroll para el botón de "Desliza para explorar"
    const scrollIndicator = document.querySelector(".scroll-indicator")
    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", () => {
        const timelineSection = document.getElementById("timeline")
  
        // Activar la sección de línea temporal
        sections.forEach((section) => section.classList.remove("active"))
        timelineSection.classList.add("active")
  
        // Actualizar la navegación
        navItems.forEach((item) => item.classList.remove("active"))
        document.querySelector('[data-section="timeline"]').classList.add("active")
  
        // Scroll al inicio de la sección
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  })
  
  