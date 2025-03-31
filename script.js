// Cursor personalizado
const cursorDot = document.querySelector(".cursor-dot")
const cursorOutline = document.querySelector(".cursor-outline")

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX
  const posY = e.clientY

  // Usar requestAnimationFrame para mejor rendimiento
  requestAnimationFrame(() => {
    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`
  })

  // Añadir un pequeño retraso al outline para un efecto más suave
  setTimeout(() => {
    cursorOutline.style.left = `${posX}px`
    cursorOutline.style.top = `${posY}px`
  }, 80)
})

// Efecto hover para enlaces y botones
const hoverElements = document.querySelectorAll(
  "a, button, .album-card, .frase-dot, .timeline-item-horizontal, .legacy-item",
)

hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursorOutline.style.width = "70px"
    cursorOutline.style.height = "70px"
    cursorOutline.style.borderColor = "var(--color-primary)"
    cursorDot.style.transform = "scale(1.5)"
    cursorDot.style.backgroundColor = "var(--color-primary)"
  })

  element.addEventListener("mouseleave", () => {
    cursorOutline.style.width = "40px"
    cursorOutline.style.height = "40px"
    cursorOutline.style.borderColor = "var(--color-primary)"
    cursorDot.style.transform = "scale(1)"
    cursorDot.style.backgroundColor = "var(--color-primary)"
  })
})

// Efecto de click
document.addEventListener("mousedown", () => {
  cursorDot.style.transform = "scale(0.5)"
  cursorOutline.style.transform = "translate(-50%, -50%) scale(0.8)"
})

document.addEventListener("mouseup", () => {
  cursorDot.style.transform = "scale(1)"
  cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
})

// Menú móvil con animación mejorada
const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-links")

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navLinks.classList.toggle("active")

  // Animar las barras del menú
  const bars = document.querySelectorAll(".bar")

  // Cambiar las barras para formar una X con animación más suave
  if (menuToggle.classList.contains("active")) {
    bars[0].style.transform = "rotate(45deg) translate(5px, 6px)"
    bars[1].style.opacity = "0"
    bars[2].style.transform = "rotate(-45deg) translate(5px, -6px)"
  } else {
    bars[0].style.transform = "rotate(0) translate(0)"
    bars[1].style.opacity = "1"
    bars[2].style.transform = "rotate(0) translate(0)"
  }
})

// Cerrar menú al hacer clic en un enlace
const navItems = document.querySelectorAll(".nav-links a")
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navLinks.classList.remove("active")

    // Restaurar barras del menú
    const bars = document.querySelectorAll(".bar")
    bars[0].style.transform = "rotate(0) translate(0)"
    bars[1].style.opacity = "1"
    bars[2].style.transform = "rotate(0) translate(0)"
  })
})

// Header transparente que cambia al hacer scroll con efecto parallax
const header = document.querySelector(".transparent-header")
const heroContent = document.querySelector(".hero-content")
const heroTitle = document.querySelector(".hero-title-v2")
const videoContainer = document.querySelector(".video-container")

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY

  // Cambiar header al hacer scroll
  if (scrollPosition > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Efecto parallax en el hero
  if (heroContent && scrollPosition < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`
    heroTitle.style.transform = `translateY(${scrollPosition * 0.2}px)`
    videoContainer.style.transform = `translateY(${scrollPosition * 0.1}px)`
  }
})

// Asegurar que el carrusel de frases funcione en todas las páginas
document.addEventListener("DOMContentLoaded", () => {
  // Carrusel de frases mejorado
  const fraseSlides = document.querySelectorAll(".frase-slide")
  const fraseDots = document.querySelectorAll(".frase-dot")
  const prevButton = document.querySelector(".frase-arrow.prev")
  const nextButton = document.querySelector(".frase-arrow.next")

  if (fraseSlides.length > 0) {
    let currentSlide = 0
    let slideInterval

    function showSlide(index) {
      // Ocultar todas las diapositivas y quitar la clase active de los dots
      fraseSlides.forEach((slide) => {
        slide.classList.remove("active")
      })

      fraseDots.forEach((dot) => {
        dot.classList.remove("active")
      })

      // Mostrar la diapositiva actual y activar el dot correspondiente
      fraseSlides[index].classList.add("active")
      fraseDots[index].classList.add("active")
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
      currentSlide++
      if (currentSlide >= fraseSlides.length) {
        currentSlide = 0
      }
      showSlide(currentSlide)
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
      currentSlide--
      if (currentSlide < 0) {
        currentSlide = fraseSlides.length - 1
      }
      showSlide(currentSlide)
    }

    // Evento para los dots
    if (fraseDots.length > 0) {
      fraseDots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const slideIndex = Number.parseInt(dot.getAttribute("data-index"))
          currentSlide = slideIndex
          showSlide(currentSlide)

          // Reiniciar el intervalo
          clearInterval(slideInterval)
          startSlideInterval()
        })
      })
    }

    // Evento para los botones de navegación
    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        prevSlide()

        // Reiniciar el intervalo
        clearInterval(slideInterval)
        startSlideInterval()
      })

      nextButton.addEventListener("click", () => {
        nextSlide()

        // Reiniciar el intervalo
        clearInterval(slideInterval)
        startSlideInterval()
      })
    }

    // Función para iniciar el intervalo
    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 6000)
    }

    // Iniciar el carrusel automático
    startSlideInterval()

    // Pausar el carrusel al pasar el mouse
    const frasesCarousel = document.querySelector(".frases-carousel")
    if (frasesCarousel) {
      frasesCarousel.addEventListener("mouseenter", () => {
        clearInterval(slideInterval)
      })

      frasesCarousel.addEventListener("mouseleave", () => {
        startSlideInterval()
      })
    }
  }
})

// Animación de elementos al hacer scroll con IntersectionObserver
const animateOnScroll = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
          observer.unobserve(entry.target) // Dejar de observar una vez animado
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    },
  )

  const elements = document.querySelectorAll(
    ".intro-content, .intro-image, .album-card, .legacy-item, .timeline-item-horizontal, .section-title-v2, .frase-content, .cta-content",
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Añadir clase para CSS
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style")
  style.textContent = `
    .intro-content, .intro-image, .album-card, .legacy-item, .timeline-item-horizontal, .section-title-v2, .frase-content, .cta-content {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .intro-content.animate, .intro-image.animate, .album-card.animate, .legacy-item.animate, .timeline-item-horizontal.animate, .section-title-v2.animate, .frase-content.animate, .cta-content.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    .album-card:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    .album-card:nth-child(3) {
      transition-delay: 0.4s;
    }
    
    .legacy-item:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    .legacy-item:nth-child(3) {
      transition-delay: 0.4s;
    }
    
    .legacy-item:nth-child(4) {
      transition-delay: 0.6s;
    }
    
    .section-title-v2 {
      transition-delay: 0.1s;
    }
  `
  document.head.appendChild(style)

  // Ejecutar animación inicial
  animateOnScroll()
})

// Gráfico interactivo para la sección de evolución del legado
document.addEventListener("DOMContentLoaded", () => {
  const chartContainer = document.getElementById("interactiveChart")
  const tooltip = document.getElementById("chartTooltip")

  if (!chartContainer) return

  // Datos para el gráfico (reproducciones mensuales en millones)
  const chartData = {
    2020: [120, 115, 130, 145, 160, 175, 190, 185, 195, 210, 205, 220],
    2021: [215, 225, 210, 230, 245, 240, 235, 250, 260, 255, 270, 280],
    2022: [275, 290, 285, 300, 310, 325, 340, 335, 350, 365, 380, 400],
  }

  // Colores para cada año
  const colors = {
    2020: "#8a2be2", // Púrpura más vibrante
    2021: "#ff0066", // Rosa más intenso
    2022: "#d4af37", // Oro más elegante
  }

  // Encontrar el valor máximo para escalar el gráfico
  let maxValue = 0
  Object.values(chartData).forEach((yearData) => {
    const yearMax = Math.max(...yearData)
    if (yearMax > maxValue) maxValue = yearMax
  })

  // Altura del gráfico
  const chartHeight = chartContainer.clientHeight
  const chartWidth = chartContainer.clientWidth

  // Crear líneas para cada año
  Object.keys(chartData).forEach((year) => {
    const yearData = chartData[year]
    const color = colors[year]

    // Crear el SVG para la línea
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    svg.style.position = "absolute"
    svg.style.top = "0"
    svg.style.left = "0"

    // Crear el path para la línea
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

    // Calcular los puntos para el path
    let pathData = ""
    const monthWidth = chartWidth / 11 // 12 meses - 1 para que el último punto no se salga

    yearData.forEach((value, index) => {
      const x = index * monthWidth
      const y = chartHeight - (value / maxValue) * chartHeight

      if (index === 0) {
        pathData += `M ${x},${y} `
      } else {
        pathData += `L ${x},${y} `
      }

      // Crear punto para cada mes
      const point = document.createElement("div")
      point.classList.add("chart-point")
      point.style.position = "absolute"
      point.style.width = "12px"
      point.style.height = "12px"
      point.style.borderRadius = "50%"
      point.style.backgroundColor = color
      point.style.top = `${y - 6}px`
      point.style.left = `${x - 6}px`
      point.style.cursor = "pointer"
      point.style.transition = "transform 0.3s ease, box-shadow 0.3s ease"
      point.style.zIndex = "5"
      point.style.boxShadow = `0 0 5px ${color}`

      // Datos para el tooltip
      point.setAttribute("data-year", year)
      point.setAttribute("data-month", index)
      point.setAttribute("data-value", value)

      // Eventos para mostrar/ocultar tooltip
      point.addEventListener("mouseenter", (e) => {
        const year = e.target.getAttribute("data-year")
        const month = Number.parseInt(e.target.getAttribute("data-month"))
        const value = e.target.getAttribute("data-value")
        const months = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ]

        tooltip.innerHTML = `
          <div style="color: ${colors[year]}; font-weight: bold; font-size: 1.6rem; margin-bottom: 5px;">${year}</div>
          <div style="margin-bottom: 5px;">${months[month]}</div>
          <div style="font-weight: bold; font-size: 1.8rem;">${value}M</div>
          <div style="font-size: 1.2rem; opacity: 0.7;">reproducciones</div>
        `

        tooltip.style.opacity = "1"
        tooltip.style.left = `${e.pageX - chartContainer.getBoundingClientRect().left}px`
        tooltip.style.top = `${e.pageY - chartContainer.getBoundingClientRect().top - 100}px`

        e.target.style.transform = "scale(1.8)"
        e.target.style.boxShadow = `0 0 15px ${color}`
      })

      point.addEventListener("mouseleave", (e) => {
        tooltip.style.opacity = "0"
        e.target.style.transform = "scale(1)"
        e.target.style.boxShadow = `0 0 5px ${color}`
      })

      chartContainer.appendChild(point)
    })

    // Configurar el path
    path.setAttribute("d", pathData)
    path.setAttribute("fill", "none")
    path.setAttribute("stroke", color)
    path.setAttribute("stroke-width", "3")
    path.setAttribute("stroke-linecap", "round")
    path.setAttribute("stroke-linejoin", "round")

    // Añadir efecto de dibujo de línea
    const pathLength = path.getTotalLength()
    path.style.strokeDasharray = pathLength
    path.style.strokeDashoffset = pathLength
    path.style.animation = `drawLine 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards ${Number.parseInt(year) - 2020}s`

    // Añadir el path al SVG
    svg.appendChild(path)

    // Añadir el SVG al contenedor
    chartContainer.appendChild(svg)
  })

  // Añadir animación de dibujo de línea
  const style = document.createElement("style")
  style.textContent = `
    @keyframes drawLine {
      to {
        stroke-dashoffset: 0;
      }
    }
  `
  document.head.appendChild(style)
})

// Inicializar el video de fondo
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bg-video")
  if (video) {
    video.play().catch((error) => {
      console.log("Reproducción automática no permitida:", error)
      // Fallback a imagen de fondo si el video no puede reproducirse
      video.style.display = "none"
      document.querySelector(".video-container").style.backgroundImage = 'url("img/hero-bg.jpg")'
      document.querySelector(".video-container").style.backgroundSize = "cover"
      document.querySelector(".video-container").style.backgroundPosition = "center"
    })
  }
})

// Desactivar cursor personalizado en dispositivos móviles
function isMobileDevice() {
  return window.innerWidth <= 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0
}

if (isMobileDevice()) {
  cursorDot.style.display = "none"
  cursorOutline.style.display = "none"
  document.body.style.cursor = "auto"
}

// Animación para el botón de scroll
const scrollButton = document.querySelector(".hero-scroll-indicator")
if (scrollButton) {
  scrollButton.addEventListener("click", () => {
    const introSection = document.querySelector(".intro-section")
    if (introSection) {
      introSection.scrollIntoView({ behavior: "smooth" })
    }
  })
}

// Efecto de parallax en imágenes
const parallaxImages = document.querySelectorAll(".intro-image, .album-cover")
window.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth - 0.5
  const mouseY = e.clientY / window.innerHeight - 0.5

  parallaxImages.forEach((image) => {
    if (isElementInViewport(image)) {
      const moveX = mouseX * 20
      const moveY = mouseY * 20
      image.style.transform = `translate(${moveX}px, ${moveY}px)`
    }
  })
})

// Función para verificar si un elemento está en el viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Efecto de texto que se escribe solo para la sección de hero
document.addEventListener("DOMContentLoaded", () => {
  const heroQuote = document.querySelector(".hero-quote")
  if (heroQuote) {
    const text = heroQuote.textContent
    heroQuote.textContent = ""

    let i = 0
    function typeWriter() {
      if (i < text.length) {
        heroQuote.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    // Iniciar el efecto después de un breve retraso
    setTimeout(typeWriter, 1000)
  }
})

