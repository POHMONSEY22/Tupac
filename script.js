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

// Script para la sección de Momentos Clave
document.addEventListener('DOMContentLoaded', function() {
  const timelineMoments = document.querySelectorAll('.timeline-moment');
  const timelineYearMarkers = document.querySelectorAll('.timeline-year-marker');
  const prevBtn = document.querySelector('.timeline-nav.prev');
  const nextBtn = document.querySelector('.timeline-nav.next');
  let currentMomentIndex = 0;
  
  // Función para mostrar un momento específico
  function showMoment(index) {
    // Ocultar todos los momentos
    timelineMoments.forEach(moment => {
      moment.classList.remove('active');
    });
    
    // Desactivar todos los marcadores de año
    timelineYearMarkers.forEach(marker => {
      marker.classList.remove('active');
    });
    
    // Mostrar el momento actual
    timelineMoments[index].classList.add('active');
    timelineYearMarkers[index].classList.add('active');
    
    // Actualizar estado de los botones
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === timelineMoments.length - 1;
    
    // Actualizar el índice actual
    currentMomentIndex = index;
  }
  
  // Inicializar la línea de tiempo
  function initTimeline() {
    // Mostrar el primer momento
    showMoment(0);
    
    // Configurar eventos para los botones de navegación
    prevBtn.addEventListener('click', () => {
      if (currentMomentIndex > 0) {
        showMoment(currentMomentIndex - 1);
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentMomentIndex < timelineMoments.length - 1) {
        showMoment(currentMomentIndex + 1);
      }
    });
    
    // Configurar eventos para los marcadores de año
    timelineYearMarkers.forEach((marker, index) => {
      marker.addEventListener('click', () => {
        showMoment(index);
      });
    });
    
    // Animación al hacer scroll
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        timelineMoments[currentMomentIndex].classList.add('active');
      }
    }, { threshold: 0.3 });
    
    observer.observe(document.querySelector('.moments-timeline'));
  }
  
  // Si la sección existe en la página, inicializar
  if (timelineMoments.length > 0 && timelineYearMarkers.length > 0) {
    initTimeline();
  }
});
// Script para la sección de Experiencia Musical
document.addEventListener('DOMContentLoaded', function() {
  // Elementos del reproductor
  const visualizerBackdrop = document.querySelector('.visualizer-backdrop');
  const songTitle = document.querySelector('.song-title');
  const songAlbum = document.querySelector('.song-album');
  const songYear = document.querySelector('.song-year');
  const songTheme = document.querySelector('.song-theme');
  const songQuote = document.querySelector('.song-quote');
  const playBtn = document.querySelector('.play-btn');
  const progressFill = document.querySelector('.progress-fill');
  const progressTime = document.querySelector('.progress-time');
  const volumeFill = document.querySelector('.volume-fill');
  const songCards = document.querySelectorAll('.song-card');
  
  // Audio
  let audio = null;
  let isPlaying = false;
  let currentSong = null;
  
  // Función para formatear el tiempo
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  // Función para cargar una canción
  function loadSong(songId) {
    // Detener la canción actual si existe
    if (audio) {
      audio.pause();
      audio = null;
      isPlaying = false;
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      visualizerBackdrop.classList.remove('active');
    }
    
    // Crear nuevo audio
    audio = new Audio(`audio/${songId}.mp3`);
    
    // Configurar eventos del audio
    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = `${progress}%`;
      progressTime.textContent = formatTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      isPlaying = false;
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      visualizerBackdrop.classList.remove('active');
    });
    
    // Habilitar el botón de reproducción
    playBtn.disabled = false;
    
    // Actualizar la canción actual
    currentSong = songId;
  }
  
  // Función para reproducir/pausar
  function togglePlay() {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      visualizerBackdrop.classList.remove('active');
    } else {
      audio.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      visualizerBackdrop.classList.add('active');
    }
    
    isPlaying = !isPlaying;
  }
  
  // Configurar eventos para las tarjetas de canciones
  songCards.forEach(card => {
    card.addEventListener('click', () => {
      const songId = card.getAttribute('data-song');
      const songThemeText = card.getAttribute('data-theme');
      const songYearText = card.getAttribute('data-year');
      const songAlbumText = card.getAttribute('data-album');
      const songQuoteText = card.getAttribute('data-quote');
      const songTitleText = card.querySelector('.song-card-title').textContent;
      
      // Actualizar la información de la canción
      songTitle.textContent = songTitleText;
      songAlbum.textContent = songAlbumText;
      songYear.textContent = songYearText;
      songTheme.textContent = songThemeText;
      songQuote.textContent = songQuoteText;
      
      // Cambiar la imagen de fondo
      const songImage = card.querySelector('img').getAttribute('src');
      document.querySelector('.backdrop-image').style.backgroundImage = `url('${songImage}')`;
      
      // Cargar la canción
      loadSong(songId);
      
      // Reproducir automáticamente
      setTimeout(() => {
        togglePlay();
      }, 100);
    });
  });
  
  // Configurar evento para el botón de reproducción/pausa
  playBtn.addEventListener('click', togglePlay);
  
  // Configurar evento para la barra de progreso
  document.querySelector('.progress-bar').addEventListener('click', (e) => {
    if (!audio) return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const clickPercentage = (clickPosition / progressBarWidth);
    const newTime = clickPercentage * audio.duration;
    
    audio.currentTime = newTime;
  });
  
  // Configurar evento para el control de volumen
  document.querySelector('.volume-slider').addEventListener('click', (e) => {
    if (!audio) return;
    
    const volumeBar = e.currentTarget;
    const clickPosition = e.offsetX;
    const volumeBarWidth = volumeBar.clientWidth;
    const newVolume = clickPosition / volumeBarWidth;
    
    audio.volume = newVolume;
    volumeFill.style.width = `${newVolume * 100}%`;
  });
  
  // Silenciar/activar sonido
  document.querySelector('.player-volume i').addEventListener('click', () => {
    if (!audio) return;
    
    if (audio.volume > 0) {
      audio.volume = 0;
      volumeFill.style.width = '0%';
      document.querySelector('.player-volume i').className = 'fas fa-volume-mute';
    } else {
      audio.volume = 0.8;
      volumeFill.style.width = '80%';
      document.querySelector('.player-volume i').className = 'fas fa-volume-up';
    }
  });
});
// Script para la sección de Capítulos de Vida
document.addEventListener('DOMContentLoaded', function() {
  const chapterNavItems = document.querySelectorAll('.chapter-nav-item');
  const chapterContents = document.querySelectorAll('.chapter-content');
  
  // Función para mostrar un capítulo específico
  function showChapter(chapterId) {
    // Ocultar todos los capítulos
    chapterContents.forEach(content => {
      content.classList.remove('active');
    });
    
    // Desactivar todos los items de navegación
    chapterNavItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Mostrar el capítulo seleccionado
    document.getElementById(chapterId).classList.add('active');
    
    // Activar el item de navegación correspondiente
    document.querySelector(`.chapter-nav-item[data-chapter="${chapterId}"]`).classList.add('active');
  }
  
  // Configurar eventos para los items de navegación
  chapterNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const chapterId = item.getAttribute('data-chapter');
      showChapter(chapterId);
    });
  });
  
  // Inicializar con el primer capítulo
  if (chapterNavItems.length > 0 && chapterContents.length > 0) {
    const firstChapterId = chapterNavItems[0].getAttribute('data-chapter');
    showChapter(firstChapterId);
  }
  
  // Animación al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      entries[0].target.classList.add('in-view');
    }
  }, { threshold: 0.3 });
  
  if (document.querySelector('.life-chapters')) {
    observer.observe(document.querySelector('.life-chapters'));
  }
});
// Script para la sección El Alma Poética
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar particles.js si existe
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#d4af37"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          }
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#d4af37",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
  
  // Elementos de la sección de poesía
  const poetryBook = document.querySelector('.poetry-book');
  const bookCover = document.querySelector('.book-cover');
  const poemNavItems = document.querySelectorAll('.poem-nav-item');
  const bookPages = document.querySelectorAll('.book-page');
  const analysisItems = document.querySelectorAll('.analysis-item');
  
  // Abrir/cerrar el libro
  if (bookCover) {
    bookCover.addEventListener('click', () => {
      poetryBook.classList.toggle('open');
    });
  }
  
  // Función para mostrar un poema específico
  function showPoem(poemId) {
    // Ocultar todas las páginas
    bookPages.forEach(page => {
      page.classList.remove('active');
    });
    
    // Ocultar todos los análisis
    analysisItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Desactivar todos los items de navegación
    poemNavItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Mostrar la página seleccionada
    document.querySelector(`.book-page[data-poem="${poemId}"]`).classList.add('active');
    
    // Mostrar el análisis correspondiente
    document.querySelector(`.analysis-item[data-poem="${poemId}"]`).classList.add('active');
    
    // Activar el item de navegación correspondiente
    document.querySelector(`.poem-nav-item[data-poem="${poemId}"]`).classList.add('active');
  }
  
  // Configurar eventos para los items de navegación
  poemNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const poemId = item.getAttribute('data-poem');
      
      // Asegurarse de que el libro esté abierto
      if (!poetryBook.classList.contains('open')) {
        poetryBook.classList.add('open');
        
        // Pequeño retraso para que la animación de apertura termine
        setTimeout(() => {
          showPoem(poemId);
        }, 500);
      } else {
        showPoem(poemId);
      }
    });
  });
  
  // Inicializar con el primer poema
  if (poemNavItems.length > 0 && bookPages.length > 0) {
    // Asegurarse de que el primer poema esté activo
    const firstPoemId = poemNavItems[0].getAttribute('data-poem');
    showPoem(firstPoemId);
  }
  
  // Animación al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      entries[0].target.classList.add('in-view');
    }
  }, { threshold: 0.3 });
  
  if (document.querySelector('.poetic-soul')) {
    observer.observe(document.querySelector('.poetic-soul'));
  }
});
// Script para el Estudio Virtual 2Pac
document.addEventListener('DOMContentLoaded', function() {
  // Comprobar si estamos en la página de discografía
  if (!document.querySelector('.virtual-studio')) return;
  
  // Inicializar particles.js si existe
  if (document.getElementById('studio-particles')) {
    particlesJS('studio-particles', {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#d4af37"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          }
        },
        opacity: {
          value: 0.2,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#d4af37",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "bubble"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          bubble: {
            distance: 100,
            size: 5,
            duration: 2,
            opacity: 0.8,
            speed: 3
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
  
  // Variables para el estudio virtual
  const powerBtn = document.getElementById('power-btn');
  const powerIndicator = document.querySelector('.power-indicator');
  const playBtn = document.getElementById('play-btn');
  const stopBtn = document.getElementById('stop-btn');
  const recordBtn = document.getElementById('record-btn');
  const tempoSlider = document.getElementById('tempo-slider');
  const tempoValue = document.getElementById('tempo-value');
  const beatVolume = document.getElementById('beat-volume');
  const vocalVolume = document.getElementById('vocal-volume');
  const sampleVolume = document.getElementById('sample-volume');
  const masterVolume = document.getElementById('master-volume');
  const beatSelector = document.getElementById('beat-selector');
  const vocalSelector = document.getElementById('vocal-selector');
  const sampleSelector = document.getElementById('sample-selector');
  const muteBtns = document.querySelectorAll('.mute-btn');
  const soloBtns = document.querySelectorAll('.solo-btn');
  const effectSwitches = document.querySelectorAll('.effect-switch input');
  const vizBtns = document.querySelectorAll('.viz-btn');
  const waveformCanvas = document.getElementById('waveform-canvas');
  const spectrumCanvas = document.getElementById('spectrum-canvas');
  const presetItems = document.querySelectorAll('.preset-item');
  const creationsEmpty = document.getElementById('creations-empty');
  const creationsList = document.getElementById('creations-list');
  
  // Estado del estudio
  let studioOn = true;
  let isPlaying = false;
  let isRecording = false;
  let currentTempo = 90;
  let currentCreations = [];
  
  // Inicializar knobs
  const knobs = document.querySelectorAll('.knob');
  knobs.forEach(knob => {
    const randomRotation = Math.floor(Math.random() * 270);
    knob.style.setProperty('--rotation', `${randomRotation}deg`);
    knob.querySelector('::after').style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg)`;
    
    // Evento para girar el knob
    knob.addEventListener('mousedown', startKnobDrag);
  });
  
  function startKnobDrag(e) {
    const knob = e.target;
    const startY = e.clientY;
    const startRotation = parseInt(knob.style.getPropertyValue('--rotation') || '0');
    
    function moveKnob(e) {
      const deltaY = startY - e.clientY;
      let newRotation = startRotation + deltaY;
      
      // Limitar rotación entre 0 y 270 grados
      newRotation = Math.max(0, Math.min(270, newRotation));
      
      knob.style.setProperty('--rotation', `${newRotation}deg`);
      knob.querySelector('::after').style.transform = `translate(-50%, -50%) rotate(${newRotation}deg)`;
      
      // Actualizar efectos según el knob
      updateEffects();
    }
    
    function stopKnobDrag() {
      document.removeEventListener('mousemove', moveKnob);
      document.removeEventListener('mouseup', stopKnobDrag);
    }
    
    document.addEventListener('mousemove', moveKnob);
    document.addEventListener('mouseup', stopKnobDrag);
  }
  
  // Función para actualizar efectos
  function updateEffects() {
    // Simulación de actualización de efectos
    console.log('Efectos actualizados');
  }
  
  // Botón de encendido
  powerBtn.addEventListener('click', () => {
    studioOn = !studioOn;
    
    if (studioOn) {
      powerIndicator.style.background = '#2ecc71';
      powerIndicator.style.boxShadow = '0 0 10px rgba(46, 204, 113, 0.5)';
      
      // Activar todos los controles
      document.querySelectorAll('.studio-controls button, .studio-controls input, .studio-controls select').forEach(el => {
        el.disabled = false;
      });
    } else {
      powerIndicator.style.background = '#e74c3c';
      powerIndicator.style.boxShadow = '0 0 10px rgba(231, 76, 60, 0.5)';
      
      // Detener reproducción si está activa
      if (isPlaying) {
        stopPlayback();
      }
      
      // Desactivar todos los controles
      document.querySelectorAll('.studio-controls button, .studio-controls input, .studio-controls select').forEach(el => {
        el.disabled = true;
      });
      
      powerBtn.disabled = false;
    }
  });
  
  // Controles de reproducción
  playBtn.addEventListener('click', () => {
    if (!studioOn) return;
    
    isPlaying = !isPlaying;
    
    if (isPlaying) {
      startPlayback();
      playBtn.classList.add('active');
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      pausePlayback();
      playBtn.classList.remove('active');
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  });
  
  stopBtn.addEventListener('click', () => {
    if (!studioOn || !isPlaying) return;
    
    stopPlayback();
  });
  
  recordBtn.addEventListener('click', () => {
    if (!studioOn) return;
    
    isRecording = !isRecording;
    
    if (isRecording) {
      startRecording();
      recordBtn.classList.add('active');
    } else {
      stopRecording();
      recordBtn.classList.remove('active');
    }
  });
  
  // Funciones de audio
  function startPlayback() {
    console.log('Iniciando reproducción');
    
    // Simulación de inicio de reproducción
    animateVisualizer();
    
    // Activar botón de stop
    stopBtn.classList.add('active');
  }
  
  function pausePlayback() {
    console.log('Pausando reproducción');
    
    // Simulación de pausa
    cancelAnimationFrame(animationFrame);
    
    // Desactivar botón de stop
    stopBtn.classList.remove('active');
  }
  
  function stopPlayback() {
    console.log('Deteniendo reproducción');
    
    // Detener reproducción
    isPlaying = false;
    pausePlayback();
    
    // Resetear controles
    playBtn.classList.remove('active');
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
  
  function startRecording() {
    console.log('Iniciando grabación');
    
    // Si no está reproduciendo, iniciar reproducción
    if (!isPlaying) {
      playBtn.click();
    }
  }
  
  function stopRecording() {
    console.log('Deteniendo grabación');
    
    // Simular creación de una nueva mezcla
    createNewMix();
  }
  
  // Control de tempo
  tempoSlider.addEventListener('input', () => {
    currentTempo = tempoSlider.value;
    tempoValue.textContent = `${currentTempo} BPM`;
    
    // Actualizar tempo si está reproduciendo
    if (isPlaying) {
      updateTempo();
    }
  });
  
  function updateTempo() {
    console.log(`Tempo actualizado a ${currentTempo} BPM`);
  }
  
  // Controles de volumen
  [beatVolume, vocalVolume, sampleVolume, masterVolume].forEach(slider => {
    slider.addEventListener('input', updateVolumes);
  });
  
  function updateVolumes() {
    console.log('Volúmenes actualizados');
    
    // Actualizar visualizador si está reproduciendo
    if (isPlaying) {
      updateVisualizer();
    }
  }
  
  // Selectores de audio
  [beatSelector, vocalSelector, sampleSelector].forEach(selector => {
    selector.addEventListener('change', updateTracks);
  });
  
  function updateTracks() {
    console.log('Pistas actualizadas');
    
    // Actualizar visualizador si está reproduciendo
    if (isPlaying) {
      updateVisualizer();
    }
  }
  
  // Botones de mute y solo
  muteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const track = btn.getAttribute('data-track');
      console.log(`${btn.classList.contains('active') ? 'Silenciando' : 'Activando'} pista ${track}`);
      
      // Actualizar visualizador
      updateVisualizer();
    });
  });
  
  soloBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Desactivar todos los botones solo
      soloBtns.forEach(b => b.classList.remove('active'));
      
      // Activar solo el actual si no estaba activo
      if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        const track = btn.getAttribute('data-track');
        console.log(`Solo pista ${track}`);
      }
      
      // Actualizar visualizador
      updateVisualizer();
    });
  });
  
  // Switches de efectos
  effectSwitches.forEach(switchEl => {
    switchEl.addEventListener('change', () => {
      const effectId = switchEl.id.split('-')[0];
      console.log(`Efecto ${effectId} ${switchEl.checked ? 'activado' : 'desactivado'}`);
      
      // Actualizar efectos
      updateEffects();
    });
  });
  
  // Botones de visualizador
  vizBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Desactivar todos los botones
      vizBtns.forEach(b => b.classList.remove('active'));
      
      // Activar el actual
      btn.classList.add('active');
      
      const vizType = btn.getAttribute('data-viz');
      
      // Mostrar el visualizador correspondiente
      if (vizType === 'waveform') {
        waveformCanvas.style.opacity = '1';
        spectrumCanvas.style.opacity = '0';
      } else {
        waveformCanvas.style.opacity = '0';
        spectrumCanvas.style.opacity = '1';
      }
    });
  });
  
  // Animación del visualizador
  let animationFrame;
  
  function animateVisualizer() {
    // Obtener contextos de canvas
    const waveCtx = waveformCanvas.getContext('2d');
    const spectrumCtx = spectrumCanvas.getContext('2d');
    
    // Limpiar canvas
    waveCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
    spectrumCtx.clearRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);
    
    // Dibujar forma de onda simulada
    waveCtx.strokeStyle = '#d4af37';
    waveCtx.lineWidth = 2;
    waveCtx.beginPath();
    
    const waveWidth = waveformCanvas.width;
    const waveHeight = waveformCanvas.height;
    const waveCenter = waveHeight / 2;
    
    for (let x = 0; x < waveWidth; x++) {
      const t = Date.now() / 500;
      const y = waveCenter + Math.sin(x * 0.01 + t) * 30 + Math.sin(x * 0.02 + t * 1.5) * 20;
      
      if (x === 0) {
        waveCtx.moveTo(x, y);
      } else {
        waveCtx.lineTo(x, y);
      }
    }
    
    waveCtx.stroke();
    
    // Dibujar espectro simulado
    const barCount = 64;
    const barWidth = spectrumCanvas.width / barCount;
    const spectrumHeight = spectrumCanvas.height;
    
    for (let i = 0; i < barCount; i++) {
      const t = Date.now() / 500;
      const barHeight = (Math.sin(i * 0.1 + t) * 0.5 + 0.5) * spectrumHeight * 0.8;
      
      const gradient = spectrumCtx.createLinearGradient(0, spectrumHeight, 0, spectrumHeight - barHeight);
      gradient.addColorStop(0, '#d4af37');
      gradient.addColorStop(1, '#8a2be2');
      
      spectrumCtx.fillStyle = gradient;
      spectrumCtx.fillRect(i * barWidth, spectrumHeight - barHeight, barWidth - 1, barHeight);
    }
    
    // Continuar animación
    animationFrame = requestAnimationFrame(animateVisualizer);
  }
  
  function updateVisualizer() {
    // Actualizar visualizador con los nuevos valores
    console.log('Visualizador actualizado');
  }
  
  // Presets
  presetItems.forEach(preset => {
    preset.addEventListener('click', () => {
      const presetType = preset.getAttribute('data-preset');
      console.log(`Aplicando preset ${presetType}`);
      
      // Aplicar configuración según el preset
      applyPreset(presetType);
    });
  });
  
  function applyPreset(presetType) {
    // Configuraciones predefinidas
    const presets = {
      classic: {
        beat: 'california',
        vocal: 'california',
        sample: 'strings',
        beatVol: 80,
        vocalVol: 75,
        sampleVol: 40,
        tempo: 95,
        reverb: true,
        delay: false,
        filter: false
      },
      emotional: {
        beat: 'dear',
        vocal: 'dear',
        sample: 'piano',
        beatVol: 65,
        vocalVol: 85,
        sampleVol: 60,
        tempo: 80,
        reverb: true,
        delay: true,
        filter: false
      },
      aggressive: {
        beat: 'hitmup',
        vocal: 'hitmup',
        sample: 'drums',
        beatVol: 90,
        vocalVol: 85,
        sampleVol: 70,
        tempo: 100,
        reverb: false,
        delay: false,
        filter: true
      },
      modern: {
        beat: 'ambitionz',
        vocal: 'changes',
        sample: 'synth',
        beatVol: 75,
        vocalVol: 80,
        sampleVol: 65,
        tempo: 90,
        reverb: true,
        delay: true,
        filter: true
      }
    };
    
    const preset = presets[presetType];
    
    // Aplicar configuración
    beatSelector.value = preset.beat;
    vocalSelector.value = preset.vocal;
    sampleSelector.value = preset.sample;
    
    beatVolume.value = preset.beatVol;
    vocalVolume.value = preset.vocalVol;
    sampleVolume.value = preset.sampleVol;
    
    tempoSlider.value = preset.tempo;
    tempoValue.textContent = `${preset.tempo} BPM`;
    currentTempo = preset.tempo;
    
    document.getElementById('reverb-switch').checked = preset.reverb;
    document.getElementById('delay-switch').checked = preset.delay;
    document.getElementById('filter-switch').checked = preset.filter;
    
    // Actualizar efectos y visualizador
    updateEffects();
    updateVisualizer();
  }
  
  // Creación de mezclas
  function createNewMix() {
    // Generar un ID único
    const mixId = Date.now();
    
    // Crear objeto de mezcla
    const newMix = {
      id: mixId,
      title: `Mix #${currentCreations.length + 1}`,
      date: new Date().toLocaleDateString(),
      beat: beatSelector.value,
      vocal: vocalSelector.value,
      sample: sampleSelector.value,
      tempo: currentTempo
    };
    
    // Añadir a la lista de creaciones
    currentCreations.push(newMix);
    
    // Actualizar UI
    updateCreationsList();
  }
  
  function updateCreationsList() {
    // Mostrar lista si hay creaciones
    if (currentCreations.length > 0) {
      creationsEmpty.style.display = 'none';
      creationsList.style.display = 'grid';
      
      // Limpiar lista
      creationsList.innerHTML = '';
      
      // Añadir cada creación
      currentCreations.forEach(mix => {
        const mixElement = document.createElement('div');
        mixElement.className = 'creation-item';
        mixElement.innerHTML = `
          <div class="creation-header">
            <div class="creation-title">${mix.title}</div>
            <div class="creation-date">${mix.date}</div>
          </div>
          <div class="creation-waveform">
            <canvas id="mix-canvas-${mix.id}"></canvas>
          </div>
          <div class="creation-controls">
            <button class="creation-play-btn" data-mix="${mix.id}">
              <i class="fas fa-play"></i>
            </button>
            <div class="creation-actions">
              <button class="creation-action-btn creation-download-btn" data-mix="${mix.id}">
                <i class="fas fa-download"></i>
              </button>
              <button class="creation-action-btn creation-delete-btn" data-mix="${mix.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
        
        creationsList.appendChild(mixElement);
        
        // Dibujar forma de onda simulada
        const canvas = document.getElementById(`mix-canvas-${mix.id}`);
        const ctx = canvas.getContext('2d');
        
        // Ajustar tamaño del canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Dibujar forma de onda
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const width = canvas.width;
        const height = canvas.height;
        const center = height / 2;
        
        for (let x = 0; x < width; x++) {
          // Usar el ID como semilla para generar formas de onda diferentes
          const seed = mix.id % 1000 / 1000;
          const y = center + Math.sin(x * 0.05 + seed * 10) * 15 + Math.sin(x * 0.1 + seed * 20) * 10;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      });
      
      // Añadir eventos a los botones
      document.querySelectorAll('.creation-play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const mixId = btn.getAttribute('data-mix');
          playMix(mixId);
          
          // Cambiar icono
          if (btn.innerHTML.includes('fa-play')) {
            document.querySelectorAll('.creation-play-btn').forEach(b => {
              b.innerHTML = '<i class="fas fa-play"></i>';
            });
            btn.innerHTML = '<i class="fas fa-pause"></i>';
          } else {
            btn.innerHTML = '<i class="fas fa-play"></i>';
          }
        });
      });
      
      document.querySelectorAll('.creation-download-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const mixId = btn.getAttribute('data-mix');
          downloadMix(mixId);
        });
      });
      
      document.querySelectorAll('.creation-delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const mixId = btn.getAttribute('data-mix');
          deleteMix(mixId);
        });
      });
    } else {
      creationsEmpty.style.display = 'block';
      creationsList.style.display = 'none';
    }
  }
  
  function playMix(mixId) {
    console.log(`Reproduciendo mezcla ${mixId}`);
    
    // Encontrar la mezcla
    const mix = currentCreations.find(m => m.id == mixId);
    
    if (mix) {
      // Aplicar configuración de la mezcla
      beatSelector.value = mix.beat;
      vocalSelector.value = mix.vocal;
      sampleSelector.value = mix.sample;
      
      tempoSlider.value = mix.tempo;
      tempoValue.textContent = `${mix.tempo} BPM`;
      currentTempo = mix.tempo;
      
      // Iniciar reproducción
      if (!isPlaying) {
        playBtn.click();
      }
    }
  }
  
  function downloadMix(mixId) {
    console.log(`Descargando mezcla ${mixId}`);
    
    // Simulación de descarga
    alert('Descarga iniciada. Tu mezcla estará disponible en breve.');
  }
  
  function deleteMix(mixId) {
    console.log(`Eliminando mezcla ${mixId}`);
    
    // Confirmar eliminación
    if (confirm('¿Estás seguro de que quieres eliminar esta mezcla?')) {
      // Filtrar la mezcla eliminada
      currentCreations = currentCreations.filter(mix => mix.id != mixId);
      
      // Actualizar UI
      updateCreationsList();
    }
  }
  
  // Inicializar visualizador
  function initVisualizer() {
    // Ajustar tamaño de los canvas
    waveformCanvas.width = waveformCanvas.offsetWidth;
    waveformCanvas.height = waveformCanvas.offsetHeight;
    
    spectrumCanvas.width = spectrumCanvas.offsetWidth;
    spectrumCanvas.height = spectrumCanvas.offsetHeight;
  }
  
  // Inicializar estudio
  function initStudio() {
    // Inicializar visualizador
    initVisualizer();
    
    // Ajustar tamaño al redimensionar
    window.addEventListener('resize', () => {
      initVisualizer();
      
      // Actualizar canvas de mezclas
      updateCreationsList();
    });
  }
  
  // Iniciar estudio
  initStudio();
});