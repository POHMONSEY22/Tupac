// Script específico para la página de poesía

document.addEventListener("DOMContentLoaded", () => {
  // Efecto parallax en el hero
  const parallaxLayers = document.querySelectorAll(".parallax-layer")

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY

    parallaxLayers.forEach((layer) => {
      const speed = Number.parseFloat(layer.getAttribute("data-speed"))
      layer.style.transform = `translateY(${scrollPosition * speed}px)`
    })
  })

  // Animación de la rosa que crece del concreto
  // La animación se maneja principalmente con CSS

  // Tarjetas de poemas interactivas
  const poemCards = document.querySelectorAll(".poem-card")
  const backButtons = document.querySelectorAll(".back-btn")

  poemCards.forEach((card) => {
    card.addEventListener("click", function () {
      if (!this.classList.contains("flipped")) {
        this.classList.add("flipped")
      }
    })
  })

  backButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation()
      const card = this.closest(".poem-card")
      card.classList.remove("flipped")
    })
  })

  // Reproductor de audio
  const playPauseBtn = document.getElementById("play-pause-btn")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const volumeBtn = document.getElementById("volume-btn")
  const progressBar = document.querySelector(".progress-bar")
  const progressCurrent = document.querySelector(".progress-current")
  const volumeBar = document.querySelector(".volume-bar")
  const volumeCurrent = document.querySelector(".volume-current")
  const currentTimeDisplay = document.getElementById("current-time")
  const totalTimeDisplay = document.getElementById("total-time")
  const playlistTracks = document.querySelectorAll(".playlist-track")
  const trackTitle = document.getElementById("track-title")
  const trackAuthor = document.getElementById("track-author")
  const artwork = document.getElementById("current-artwork")

  // Simulación de reproductor (sin audio real)
  let isPlaying = false
  let currentTrack = 0
  let progressInterval
  let currentProgress = 30 // Porcentaje inicial
  let volume = 70 // Porcentaje inicial

  // Datos de las pistas (simulados)
  const tracks = [
    {
      title: "La Rosa que Creció del Concreto",
      author: "Tupac Shakur",
      duration: "1:45",
      artwork: "img/poetry-album.jpg",
    },
    {
      title: "En la Profundidad de mi Alma",
      author: "Tupac Shakur",
      duration: "2:12",
      artwork: "img/poetry-album.jpg",
    },
    {
      title: "Libertad",
      author: "Tupac Shakur",
      duration: "1:58",
      artwork: "img/poetry-album.jpg",
    },
    {
      title: "Madre",
      author: "Tupac Shakur",
      duration: "2:24",
      artwork: "img/poetry-album.jpg",
    },
    {
      title: "Legado",
      author: "Tupac Shakur",
      duration: "2:05",
      artwork: "img/poetry-album.jpg",
    },
  ]

  // Función para actualizar la interfaz del reproductor
  function updatePlayerUI() {
    // Actualizar información de la pista
    trackTitle.textContent = tracks[currentTrack].title
    trackAuthor.textContent = tracks[currentTrack].author
    artwork.src = tracks[currentTrack].artwork
    totalTimeDisplay.textContent = tracks[currentTrack].duration

    // Actualizar playlist
    playlistTracks.forEach((track, index) => {
      if (index === currentTrack) {
        track.classList.add("active")
      } else {
        track.classList.remove("active")
      }
    })

    // Actualizar botón de reproducción/pausa
    if (isPlaying) {
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
    } else {
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
    }
  }

  // Función para simular la reproducción
  function togglePlay() {
    isPlaying = !isPlaying

    if (isPlaying) {
      // Simular progreso
      progressInterval = setInterval(() => {
        currentProgress += 0.5
        if (currentProgress >= 100) {
          currentProgress = 0
          nextTrack()
        }
        progressCurrent.style.width = `${currentProgress}%`

        // Actualizar tiempo actual (simulado)
        const track = tracks[currentTrack]
        const totalSeconds = convertTimeToSeconds(track.duration)
        const currentSeconds = Math.floor(totalSeconds * (currentProgress / 100))
        currentTimeDisplay.textContent = convertSecondsToTime(currentSeconds)
      }, 1000)
    } else {
      clearInterval(progressInterval)
    }

    updatePlayerUI()
  }

  // Función para cambiar a la pista anterior
  function prevTrack() {
    clearInterval(progressInterval)
    currentProgress = 0
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length

    if (isPlaying) {
      togglePlay()
    } else {
      updatePlayerUI()
    }
  }

  // Función para cambiar a la siguiente pista
  function nextTrack() {
    clearInterval(progressInterval)
    currentProgress = 0
    currentTrack = (currentTrack + 1) % tracks.length

    if (isPlaying) {
      togglePlay()
    } else {
      updatePlayerUI()
    }
  }

  // Función para convertir tiempo en formato mm:ss a segundos
  function convertTimeToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(":").map(Number)
    return minutes * 60 + seconds
  }

  // Función para convertir segundos a formato mm:ss
  function convertSecondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Eventos del reproductor
  playPauseBtn.addEventListener("click", togglePlay)
  prevBtn.addEventListener("click", prevTrack)
  nextBtn.addEventListener("click", nextTrack)

  // Evento para la barra de progreso
  progressBar.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const percentage = (clickPosition / rect.width) * 100

    currentProgress = percentage
    progressCurrent.style.width = `${percentage}%`

    // Actualizar tiempo actual (simulado)
    const track = tracks[currentTrack]
    const totalSeconds = convertTimeToSeconds(track.duration)
    const currentSeconds = Math.floor(totalSeconds * (percentage / 100))
    currentTimeDisplay.textContent = convertSecondsToTime(currentSeconds)
  })

  // Evento para el control de volumen
  volumeBar.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const percentage = (clickPosition / rect.width) * 100

    volume = percentage
    volumeCurrent.style.width = `${percentage}%`

    // Actualizar icono de volumen
    if (volume === 0) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
    } else if (volume < 50) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>'
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
    }
  })

  // Evento para el botón de volumen (silenciar/activar)
  volumeBtn.addEventListener("click", function () {
    if (volume > 0) {
      // Guardar el volumen actual y silenciar
      this.dataset.prevVolume = volume
      volume = 0
      volumeCurrent.style.width = "0%"
      this.innerHTML = '<i class="fas fa-volume-mute"></i>'
    } else {
      // Restaurar el volumen anterior
      volume = Number.parseFloat(this.dataset.prevVolume || 70)
      volumeCurrent.style.width = `${volume}%`

      if (volume < 50) {
        this.innerHTML = '<i class="fas fa-volume-down"></i>'
      } else {
        this.innerHTML = '<i class="fas fa-volume-up"></i>'
      }
    }
  })

  // Evento para los elementos de la playlist
  playlistTracks.forEach((track, index) => {
    track.addEventListener("click", () => {
      if (currentTrack !== index) {
        clearInterval(progressInterval)
        currentProgress = 0
        currentTrack = index

        if (isPlaying) {
          togglePlay()
        } else {
          updatePlayerUI()
        }
      }
    })
  })

  // Inicializar la interfaz del reproductor
  updatePlayerUI()

  // Tabs de análisis poético
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabPanels = document.querySelectorAll(".tab-panel")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Desactivar todos los botones y paneles
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabPanels.forEach((p) => p.classList.remove("active"))

      // Activar el botón clickeado
      btn.classList.add("active")

      // Activar el panel correspondiente
      const tabId = btn.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Taller de poesía interactivo
  const promptItems = document.querySelectorAll(".prompt-item")
  const currentPrompt = document.getElementById("current-prompt")
  const poemEditor = document.getElementById("poem-editor")
  const clearBtn = document.getElementById("clear-btn")
  const saveBtn = document.getElementById("save-btn")

  promptItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Desactivar todos los prompts
      promptItems.forEach((p) => p.classList.remove("active"))

      // Activar el prompt clickeado
      this.classList.add("active")

      // Actualizar el prompt actual
      const promptText = this.getAttribute("data-prompt")
      currentPrompt.textContent = promptText

      // Enfocar el editor
      poemEditor.focus()
    })
  })

  // Limpiar el editor
  clearBtn.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que quieres borrar todo el contenido?")) {
      poemEditor.value = ""
      poemEditor.focus()
    }
  })

  // Guardar el poema (simulado)
  saveBtn.addEventListener("click", () => {
    if (poemEditor.value.trim() === "") {
      alert("Por favor, escribe algo antes de guardar.")
      return
    }

    alert(
      "Tu poema ha sido guardado. En una implementación real, esto se guardaría en una base de datos o se descargaría como un archivo.",
    )

    // En una implementación real, aquí se enviaría el poema a un servidor
    // o se descargaría como un archivo de texto
  })

  // Galería de manuscritos
  const galleryItems = document.querySelectorAll(".gallery-item")
  const manuscriptViewer = document.querySelector(".manuscript-viewer")
  const closeViewer = document.querySelector(".close-viewer")
  const viewerTitle = document.getElementById("viewer-title")
  const viewerImage = document.getElementById("viewer-image")
  const viewerContext = document.getElementById("viewer-context")
  const viewerNotes = document.getElementById("viewer-notes")

  // Datos de los manuscritos (simulados)
  const manuscripts = {
    manuscript1: {
      title: "La Rosa que Creció del Concreto",
      image: "img/manuscript-1-large.jpg",
      context:
        "Este poema fue escrito por Tupac en 1989, cuando tenía 18 años. El manuscrito original muestra varias revisiones y anotaciones, revelando su proceso meticuloso de refinamiento poético.",
      notes:
        "Observa las anotaciones en el margen donde Tupac exploró diferentes metáforas antes de decidirse por la rosa y el concreto. También hay marcas que sugieren que recitó este poema en voz alta mientras lo escribía, ajustando el ritmo y la cadencia.",
    },
    manuscript2: {
      title: "Libertad",
      image: "img/manuscript-2-large.jpg",
      context:
        "Escrito en 1991, este poema refleja las preocupaciones de Tupac sobre la libertad personal y colectiva. Fue escrito durante un período de creciente conciencia política en su vida.",
      notes:
        "Fíjate en cómo la escritura se vuelve más intensa y presionada en ciertas secciones, particularmente cuando habla de injusticia. Las palabras tachadas y reemplazadas muestran su búsqueda de la expresión perfecta.",
    },
    manuscript3: {
      title: "Madre",
      image: "img/manuscript-3-large.jpg",
      context:
        "Este poema dedicado a su madre, Afeni Shakur, fue escrito en 1990. Refleja la profunda admiración y respeto que Tupac sentía por ella, a pesar de los desafíos que enfrentaron juntos.",
      notes:
        "El manuscrito muestra una escritura más cuidada y deliberada que otros poemas. Las pocas correcciones sugieren que este poema fluyó de manera natural, quizás porque el tema era tan cercano a su corazón.",
    },
    manuscript4: {
      title: "Legado",
      image: "img/manuscript-4-large.jpg",
      context:
        "Escrito en 1991, este poema muestra una sorprendente premonición sobre cómo Tupac quería ser recordado. Es uno de sus trabajos más reflexivos sobre la mortalidad y el impacto duradero.",
      notes:
        "Observa cómo la escritura cambia de tamaño y presión a lo largo del manuscrito, reflejando los cambios emocionales mientras exploraba el concepto de legado. Las notas al margen incluyen pensamientos adicionales sobre la inmortalidad a través del arte.",
    },
  }

  // Abrir el visor de manuscritos
  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const manuscriptId = this.getAttribute("data-manuscript")
      const manuscript = manuscripts[manuscriptId]

      // Actualizar el contenido del visor
      viewerTitle.textContent = manuscript.title
      viewerImage.src = manuscript.image
      viewerImage.alt = `Manuscrito de ${manuscript.title}`
      viewerContext.textContent = manuscript.context
      viewerNotes.textContent = manuscript.notes

      // Mostrar el visor
      manuscriptViewer.classList.add("active")
      document.body.style.overflow = "hidden" // Evitar scroll en el body
    })
  })

  // Cerrar el visor de manuscritos
  closeViewer.addEventListener("click", () => {
    manuscriptViewer.classList.remove("active")
    document.body.style.overflow = "" // Restaurar scroll
  })

  // Cerrar el visor con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && manuscriptViewer.classList.contains("active")) {
      closeViewer.click()
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
  const elements = document.querySelectorAll(".theme-item, .influence-item, .legacy-point")
  elements.forEach((element) => {
    observer.observe(element)
  })
})



