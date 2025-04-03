// Script para la sección de Canciones Más Populares - Versión Premium
document.addEventListener("DOMContentLoaded", () => {
  // Declarar variables globales para las librerías
  let particlesJS;
  let gsap;
  let d3;

  // Inicializar partículas
  if (typeof particlesJS !== "undefined") {
    particlesJS("song-particles", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#d4af37", "#8a2be2", "#ffffff"],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
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
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }

  // Referencias DOM
  const viewBtns = document.querySelectorAll(".view-btn");
  const songsViews = document.querySelectorAll(".songs-view");
  const songItems = document.querySelectorAll(".song-item, .song-card");
  const previewBtns = document.querySelectorAll(".song-preview, .card-play");
  const audioPlayer = document.getElementById("audio-player");
  const playerTitle = document.getElementById("player-title");
  const playerAlbum = document.getElementById("player-album");
  const playerProgress = document.getElementById("player-progress");
  const currentTimeDisplay = document.getElementById("current-time");
  const totalTimeDisplay = document.getElementById("total-time");
  const playBtn = document.getElementById("player-play");
  const prevBtn = document.getElementById("player-prev");
  const nextBtn = document.getElementById("player-next");
  const volumeBtn = document.getElementById("player-volume");
  const volumeRange = document.getElementById("volume-range");
  const songModal = document.getElementById("song-modal");
  const modalClose = document.getElementById("modal-close");
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselControls = document.querySelectorAll(".carousel-control");
  const carouselIndicators = document.querySelectorAll(".indicator");
  const analyticsBtns = document.querySelectorAll(".analytics-btn");
  const chartContainers = document.querySelectorAll(".chart-container");

  // Variables de estado
  let currentView = "list";
  let currentAudio = null;
  let isPlaying = false;
  let currentSongIndex = -1;
  let currentSlide = 0;
  const slidesCount = document.querySelectorAll(".album-slide").length;
  const slideWidth = 300; // Ancho de cada slide (ajustar según CSS)

  // Data para gráficos
  const albumsData = [
    { name: "All Eyez On Me", year: 1996, songs: 5, plays: "3.2B" },
    { name: "Greatest Hits", year: 1998, songs: 2, plays: "1.7B" },
    { name: "Me Against the World", year: 1995, songs: 1, plays: "750M" },
    { name: "The Don Killuminati", year: 1996, songs: 1, plays: "680M" },
    {
      name: "Strictly 4 My N.I.G.G.A.Z...",
      year: 1993,
      songs: 1,
      plays: "580M",
    },
  ];

  // Datos de canciones para el modal
  const songData = {
    "california-love": {
      title: "California Love",
      artist: "feat. Dr. Dre",
      album: "All Eyez On Me (1996)",
      plays: "1.2B",
      duration: "4:45",
      year: "1996",
      image: "img/songs/california-love.jpg",
      spotify: "https://open.spotify.com/track/5Jq4Qy1A8PIlWRF9WYESm4",
      youtube: "https://www.youtube.com/watch?v=5wBTdfAkqGU",
    },
    changes: {
      title: "Changes",
      artist: "feat. Talent",
      album: "Greatest Hits (1998)",
      plays: "980M",
      duration: "4:29",
      year: "1998",
      image: "img/songs/changes.jpg",
      spotify: "https://open.spotify.com/track/67Hna13dNDkZvBpTXRIaOJ",
      youtube: "https://www.youtube.com/watch?v=eXvBjCO19QY",
    },
    // Otros datos de canciones...
  };

  // Funciones

  // Cambiar vistas
  function changeView(viewType) {
    currentView = viewType;

    // Actualizar botones
    viewBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewType);
    });

    // Actualizar vistas
    songsViews.forEach((view) => {
      view.classList.toggle("active", view.id === `${viewType}-view`);
    });

    // Si es vista de carrusel, resetear posición
    if (viewType === "covers") {
      updateCarousel(0);
    }
  }

  // Inicializar audio
  function initAudio() {
    // Crear elemento de audio
    currentAudio = new Audio();

    // Evento de tiempo actualizado
    currentAudio.addEventListener("timeupdate", () => {
      const currentTime = currentAudio.currentTime;
      const duration = currentAudio.duration || 0;
      const progress = (currentTime / duration) * 100;

      // Actualizar progreso
      playerProgress.style.width = `${progress}%`;

      // Actualizar tiempo
      const currentMinutes = Math.floor(currentTime / 60);
      const currentSeconds = Math.floor(currentTime % 60);
      currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds
        .toString()
        .padStart(2, "0")}`;
    });

    // Evento de carga de metadatos
    currentAudio.addEventListener("loadedmetadata", () => {
      const duration = currentAudio.duration || 0;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      totalTimeDisplay.textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
    });

    // Evento de finalización
    currentAudio.addEventListener("ended", () => {
      isPlaying = false;
      playBtn.innerHTML = '<i class="fas fa-play"></i>';

      // Reproducir siguiente canción
      playNextSong();
    });
  }

  // Reproducir canción
  function playSong(songId) {
    const songIndex = Array.from(songItems).findIndex(
      (item) => item.dataset.song === songId
    );

    if (songIndex !== -1) {
      currentSongIndex = songIndex;

      // Si el audio no está inicializado
      if (!currentAudio) {
        initAudio();
      }

      // Detener reproducción actual
      currentAudio.pause();

      // Simular URL de audio (en un caso real, esto vendría de una API o base de datos)
      const audioUrl = `audio/${songId}.mp3`;

      // En este caso simulamos la reproducción, en un caso real se usaría:
      // currentAudio.src = audioUrl;

      // Para demostración, vamos a simular la reproducción
      currentAudio.src =
        "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

      // Actualizar UI
      const songInfo = songData[songId] || {
        title: "Canción desconocida",
        album: "Álbum desconocido",
      };

      playerTitle.textContent = songInfo.title;
      playerAlbum.textContent = songInfo.album;

      // Mostrar reproductor
      audioPlayer.classList.add("active");

      // Reproducir
      currentAudio.play();
      isPlaying = true;
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
  }

  // Pausar/Reproducir
  function togglePlay() {
    if (!currentAudio) return;

    if (isPlaying) {
      currentAudio.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      currentAudio.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    isPlaying = !isPlaying;
  }

  // Reproducir canción anterior
  function playPrevSong() {
    if (currentSongIndex <= 0) {
      currentSongIndex = songItems.length - 1;
    } else {
      currentSongIndex--;
    }

    const songId = songItems[currentSongIndex].dataset.song;
    playSong(songId);
  }

  // Reproducir siguiente canción
  function playNextSong() {
    if (currentSongIndex >= songItems.length - 1) {
      currentSongIndex = 0;
    } else {
      currentSongIndex++;
    }

    const songId = songItems[currentSongIndex].dataset.song;
    playSong(songId);
  }

  // Mostrar modal de canción
  function showSongModal(songId) {
    const song = songData[songId];
    if (!song) return;

    // Actualizar contenido del modal
    document.getElementById("modal-image").src = song.image;
    document.getElementById("modal-title").textContent = song.title;
    document.getElementById("modal-artist").textContent = song.artist || "";
    document.getElementById("modal-album").textContent = song.album;
    document.getElementById("modal-plays").textContent = song.plays;
    document.getElementById("modal-duration").textContent = song.duration;
    document.getElementById("modal-year").textContent = song.year;

    // Actualizar enlaces
    document.getElementById("modal-spotify").href = song.spotify;
    document.getElementById("modal-youtube").href = song.youtube;

    // Mostrar modal
    songModal.classList.add("active");

    // Animar con GSAP si está disponible
    if (typeof gsap !== "undefined") {
      gsap.from(".modal-content", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }

  // Actualizar carrusel
  function updateCarousel(index) {
    if (index < 0) index = 0;
    if (index >= slidesCount) index = slidesCount - 1;

    currentSlide = index;

    // Actualizar posición
    const translateX = -currentSlide * slideWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;

    // Actualizar indicadores
    carouselIndicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentSlide);
    });
  }

  // Inicializar gráficos D3.js
  function initCharts() {
    if (typeof d3 === "undefined") return;

    // 1. Gráfico de álbumes
    createAlbumsChart();

    // 2. Gráfico de años
    createYearsChart();

    // 3. Gráfico de colaboraciones
    createFeaturesChart();
  }

  // Crear gráfico de álbumes con D3
  function createAlbumsChart() {
    // Limpiar contenedor
    d3.select("#albums-chart").html("");

    // Configuración
    const width = document.getElementById("albums-chart").offsetWidth || 600;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    // Crear SVG
    const svg = d3
      .select("#albums-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Escala X
    const x = d3
      .scaleBand()
      .domain(albumsData.map((d) => d.name))
      .range([0, width - margin.left - margin.right])
      .padding(0.3);

    // Escala Y
    const y = d3
      .scaleLinear()
      .domain([0, 6])
      .range([height - margin.top - margin.bottom, 0]);

    // Eje X
    g.append("g")
      .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("fill", "#aaaaaa")
      .attr("font-size", "10px");

    // Eje Y
    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("fill", "#aaaaaa")
      .attr("font-size", "10px");

    // Gradiente para barras
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#d4af37");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#8a2be2");

    // Barras
    g.selectAll(".bar")
      .data(albumsData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.songs))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.top - margin.bottom - y(d.songs))
      .attr("fill", "url(#bar-gradient)")
      .attr("rx", 4)
      .attr("ry", 4);

    // Etiquetas
    g.selectAll(".label")
      .data(albumsData)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d.name) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.songs) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#d4af37")
      .attr("font-size", "12px")
      .text((d) => d.songs);

    // Crear leyenda
    const legend = d3.select("#albums-legend");
    legend.html("");

    albumsData.forEach((album, i) => {
      const item = legend.append("div").attr("class", "legend-item");

      item
        .append("div")
        .attr("class", "legend-color")
        .style("background", i % 2 === 0 ? "#d4af37" : "#8a2be2");

      const text = item.append("div").attr("class", "legend-text");

      text.append("div").attr("class", "legend-label").text(album.name);

      text
        .append("div")
        .attr("class", "legend-value")
        .text(`${album.songs} canciones · ${album.plays} reproducciones`);
    });
  }

  // Crear gráfico de años
  function createYearsChart() {
    // Limpiar contenedor
    d3.select("#years-chart").html("");

    // Configuración
    const width = document.getElementById("years-chart").offsetWidth || 600;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    // Datos por año
    const yearsData = [
      { year: 1991, songs: 0 },
      { year: 1992, songs: 0 },
      { year: 1993, songs: 1 },
      { year: 1994, songs: 0 },
      { year: 1995, songs: 1 },
      { year: 1996, songs: 7 },
      { year: 1997, songs: 0 },
      { year: 1998, songs: 1 },
    ];

    // Crear SVG
    const svg = d3
      .select("#years-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Escala X
    const x = d3
      .scaleLinear()
      .domain([1991, 1998])
      .range([0, width - margin.left - margin.right]);

    // Escala Y
    const y = d3
      .scaleLinear()
      .domain([0, 8])
      .range([height - margin.top - margin.bottom, 0]);

    // Línea
    const line = d3
      .line()
      .x((d) => x(d.year))
      .y((d) => y(d.songs))
      .curve(d3.curveMonotoneX);

    // Área
    const area = d3
      .area()
      .x((d) => x(d.year))
      .y0(height - margin.top - margin.bottom)
      .y1((d) => y(d.songs))
      .curve(d3.curveMonotoneX);

    // Eje X
    g.append("g")
      .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(8).tickFormat(d3.format("d")))
      .selectAll("text")
      .attr("fill", "#aaaaaa")
      .attr("font-size", "10px");

    // Eje Y
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .attr("fill", "#aaaaaa")
      .attr("font-size", "10px");

    // Gradiente para área
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#d4af37")
      .attr("stop-opacity", 0.7);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#d4af37")
      .attr("stop-opacity", 0.1);

    // Dibujar área
    g.append("path")
      .datum(yearsData)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area);

    // Dibujar línea
    g.append("path")
      .datum(yearsData)
      .attr("fill", "none")
      .attr("stroke", "#d4af37")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Puntos
    g.selectAll(".dot")
      .data(yearsData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.songs))
      .attr("r", (d) => (d.songs > 0 ? 5 : 0))
      .attr("fill", "#d4af37")
      .attr("stroke", "#0a0a0a")
      .attr("stroke-width", 2);

    // Etiquetas
    g.selectAll(".year-label")
      .data(yearsData.filter((d) => d.songs > 0))
      .enter()
      .append("text")
      .attr("class", "year-label")
      .attr("x", (d) => x(d.year))
      .attr("y", (d) => y(d.songs) - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "#d4af37")
      .attr("font-size", "12px")
      .text((d) => d.songs);
  }

  // Crear gráfico de colaboraciones
  function createFeaturesChart() {
    // Limpiar contenedor
    d3.select("#features-chart").html("");

    // Configuración
    const width = document.getElementById("features-chart").offsetWidth || 600;
    const height = 250;

    // Datos de colaboraciones
    const featuresData = [
      { name: "Dr. Dre", count: 4 },
      { name: "Snoop Dogg", count: 3 },
      { name: "Outlawz", count: 2 },
      { name: "Nate Dogg", count: 2 },
      { name: "Digital Underground", count: 1 },
      { name: "Otros", count: 3 },
    ];

    // Crear SVG
    const svg = d3
      .select("#features-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Configuración de pie chart
    const radius = Math.min(width, height) / 2;

    // Grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Generador de pie
    const pie = d3
      .pie()
      .value((d) => d.count)
      .sort(null);

    // Generador de arco
    const arc = d3
      .arc()
      .innerRadius(radius * 0.4) // Donut chart
      .outerRadius(radius * 0.8);

    // Generador de arco para hover
    const arcHover = d3
      .arc()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.85);

    // Colores
    const color = d3
      .scaleOrdinal()
      .domain(featuresData.map((d) => d.name))
      .range([
        "#d4af37",
        "#8a2be2",
        "#ff0066",
        "#4a00e0",
        "#f9d423",
        "#9933ff",
      ]);

    // Dibujar arcos
    const arcs = g
      .selectAll(".arc")
      .data(pie(featuresData))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.name))
      .attr("stroke", "#0a0a0a")
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(300).attr("d", arcHover);
      })
      .on("mouseout", function (event, d) {
        d3.select(this).transition().duration(300).attr("d", arc);
      });

    // Etiquetas
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text((d) => d.data.count);
  }

  // Cambiar gráfico
  function changeChart(chartType) {
    // Actualizar botones
    analyticsBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.chart === chartType);
    });

    // Actualizar contenedores
    chartContainers.forEach((container) => {
      container.classList.toggle(
        "active",
        container.id === `${chartType}-chart-container`
      );
    });
  }

  // Event Listeners

  // Botones de vista
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      changeView(btn.dataset.view);
    });
  });

  // Botones de previsualización
  previewBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      playSong(btn.dataset.preview);
    });
  });

  // Clic en canción para mostrar modal
  songItems.forEach((item) => {
    item.addEventListener("click", () => {
      showSongModal(item.dataset.song);
    });
  });

  // Controles de reproductor
  playBtn.addEventListener("click", togglePlay);
  prevBtn.addEventListener("click", playPrevSong);
  nextBtn.addEventListener("click", playNextSong);

  // Control de volumen
  volumeRange.addEventListener("input", () => {
    if (!currentAudio) return;
    currentAudio.volume = volumeRange.value / 100;
  });

  volumeBtn.addEventListener("click", () => {
    if (!currentAudio) return;

    if (currentAudio.volume > 0) {
      currentAudio.volume = 0;
      volumeRange.value = 0;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      currentAudio.volume = 1;
      volumeRange.value = 100;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });

  // Cerrar modal
  modalClose.addEventListener("click", () => {
    songModal.classList.remove("active");
  });

  // Cerrar modal al hacer clic fuera
  songModal.addEventListener("click", (e) => {
    if (e.target === songModal) {
      songModal.classList.remove("active");
    }
  });

  // Controles de carrusel
  carouselControls.forEach((control) => {
    control.addEventListener("click", () => {
      if (control.classList.contains("prev-control")) {
        updateCarousel(currentSlide - 1);
      } else {
        updateCarousel(currentSlide + 1);
      }
    });
  });

  // Indicadores de carrusel
  carouselIndicators.forEach((indicator, i) => {
    indicator.addEventListener("click", () => {
      updateCarousel(i);
    });
  });

  // Botones de gráficos
  analyticsBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      changeChart(btn.dataset.chart);
    });
  });

  // Inicializar

  // Inicializar gráficos cuando el documento esté completamente cargado
  window.addEventListener("load", () => {
    initCharts();
  });

  // Inicializar GSAP si está disponible
  if (typeof gsap !== "undefined") {
    // Animación de entrada para elementos
    gsap.from(".section-title-v2", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(".song-item", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Animación de fondo
    gsap.to(".animated-wave", {
      backgroundPosition: "100% 100%",
      duration: 20,
      repeat: -1,
      ease: "linear",
    });
  }
});

// Script para la sección de Canciones Más Populares - Versión Premium
document.addEventListener("DOMContentLoaded", () => {
  // Declarar variables globales para las librerías
  let particlesJS;
  let gsap;
  let d3;

  // Inicializar partículas
  if (typeof particlesJS !== "undefined") {
    particlesJS("song-particles", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#d4af37", "#8a2be2", "#ffffff"],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
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
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }

  // Referencias DOM
  const viewBtns = document.querySelectorAll(".view-btn");
  const songsViews = document.querySelectorAll(".songs-view");
  const songItems = document.querySelectorAll(".song-item, .song-card");
  const previewBtns = document.querySelectorAll(".song-preview, .card-play");
  const audioPlayer = document.getElementById("audio-player");
  const playerTitle = document.getElementById("player-title");
  const playerAlbum = document.getElementById("player-album");
  const playerProgress = document.getElementById("player-progress");
  const currentTimeDisplay = document.getElementById("current-time");
  const totalTimeDisplay = document.getElementById("total-time");
  const playBtn = document.getElementById("player-play");
  const prevBtn = document.getElementById("player-prev");
  const nextBtn = document.getElementById("player-next");
  const volumeBtn = document.getElementById("player-volume");
  const volumeRange = document.getElementById("volume-range");
  const songModal = document.getElementById("song-modal");
  const modalClose = document.getElementById("modal-close");
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselControls = document.querySelectorAll(".carousel-control");
  const carouselIndicators = document.querySelectorAll(".indicator");
  const analyticsBtns = document.querySelectorAll(".analytics-btn");
  const chartContainers = document.querySelectorAll(".chart-container");

  // Variables de estado
  let currentView = "list";
  let currentAudio = null;
  let isPlaying = false;
  let currentSongIndex = -1;
  let currentSlide = 0;
  const slidesCount = document.querySelectorAll(".album-slide").length;
  const slideWidth = 300; // Ancho de cada slide (ajustar según CSS)

  // Data para gráficos
  const albumsData = [
    { name: "All Eyez On Me", year: 1996, songs: 5, plays: "3.2B" },
    { name: "Greatest Hits", year: 1998, songs: 2, plays: "1.7B" },
    { name: "Me Against the World", year: 1995, songs: 1, plays: "750M" },
    { name: "The Don Killuminati", year: 1996, songs: 1, plays: "680M" },
    {
      name: "Strictly 4 My N.I.G.G.A.Z...",
      year: 1993,
      songs: 1,
      plays: "580M",
    },
  ];

  // Datos de canciones para el modal
  const songData = {
    "california-love": {
      title: "California Love",
      artist: "feat. Dr. Dre",
      album: "All Eyez On Me (1996)",
      plays: "1.2B",
      duration: "4:45",
      year: "1996",
      image: "img/songs/california-love.jpg",
      spotify: "https://open.spotify.com/track/5Jq4Qy1A8PIlWRF9WYESm4",
      youtube: "https://www.youtube.com/watch?v=5wBTdfAkqGU",
    },
    changes: {
      title: "Changes",
      artist: "feat. Talent",
      album: "Greatest Hits (1998)",
      plays: "980M",
      duration: "4:29",
      year: "1998",
      image: "img/songs/changes.jpg",
      spotify: "https://open.spotify.com/track/67Hna13dNDkZvBpTXRIaOJ",
      youtube: "https://www.youtube.com/watch?v=eXvBjCO19QY",
    },
    // Otros datos de canciones...
  };

  // Funciones

  // Cambiar vistas
  function changeView(viewType) {
    currentView = viewType;

    // Actualizar botones
    viewBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewType);
    });

    // Actualizar vistas
    songsViews.forEach((view) => {
      view.classList.toggle("active", view.id === `${viewType}-view`);
    });

    // Si es vista de carrusel, resetear posición
    if (viewType === "covers") {
      updateCarousel(0);
    }
  }

  // Inicializar audio
  function initAudio() {
    // Crear elemento de audio
    currentAudio = new Audio();

    // Evento de tiempo actualizado
    currentAudio.addEventListener("timeupdate", () => {
      const currentTime = currentAudio.currentTime;
      const duration = currentAudio.duration || 0;
      const progress = (currentTime / duration) * 100;

      // Actualizar progreso
      playerProgress.style.width = `${progress}%`;

      // Actualizar tiempo
      const currentMinutes = Math.floor(currentTime / 60);
      const currentSeconds = Math.floor(currentTime % 60);
      currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds
        .toString()
        .padStart(2, "0")}`;
    });

    // Evento de carga de metadatos
    currentAudio.addEventListener("loadedmetadata", () => {
      const duration = currentAudio.duration || 0;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      totalTimeDisplay.textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
    });

    // Evento de finalización
    currentAudio.addEventListener("ended", () => {
      isPlaying = false;
      playBtn.innerHTML = '<i class="fas fa-play"></i>';

      // Reproducir siguiente canción
      playNextSong();
    });
  }

  // Reproducir canción
  function playSong(songId) {
    const songIndex = Array.from(songItems).findIndex(
      (item) => item.dataset.song === songId
    );

    if (songIndex !== -1) {
      currentSongIndex = songIndex;

      // Si el audio no está inicializado
      if (!currentAudio) {
        initAudio();
      }

      // Detener reproducción actual
      currentAudio.pause();

      // Simular URL de audio (en un caso real, esto vendría de una API o base de datos)
      const audioUrl = `audio/${songId}.mp3`;

      // En este caso simulamos la reproducción, en un caso real se usaría:
      // currentAudio.src = audioUrl;

      // Para demostración, vamos a simular la reproducción
      currentAudio.src =
        "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

      // Actualizar UI
      const songInfo = songData[songId] || {
        title: "Canción desconocida",
        album: "Álbum desconocido",
      };

      playerTitle.textContent = songInfo.title;
      playerAlbum.textContent = songInfo.album;

      // Mostrar reproductor
      audioPlayer.classList.add("active");

      // Reproducir
      currentAudio.play();
      isPlaying = true;
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
  }

  // Pausar/Reproducir
  function togglePlay() {
    if (!currentAudio) return;

    if (isPlaying) {
      currentAudio.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      currentAudio.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    isPlaying = !isPlaying;
  }

  // Reproducir canción anterior
  function playPrevSong() {
    if (currentSongIndex <= 0) {
      currentSongIndex = songItems.length - 1;
    } else {
      currentSongIndex--;
    }

    const songId = songItems[currentSongIndex].dataset.song;
    playSong(songId);
  }

  // Reproducir siguiente canción
  function playNextSong() {
    if (currentSongIndex >= songItems.length - 1) {
      currentSongIndex = 0;
    } else {
      currentSongIndex++;
    }

    const songId = songItems[currentSongIndex].dataset.song;
    playSong(songId);
  }

  // Mostrar modal de canción
  function showSongModal(songId) {
    const song = songData[songId];
    if (!song) return;

    // Actualizar contenido del modal
    document.getElementById("modal-image").src = song.image;
    document.getElementById("modal-title").textContent = song.title;
    document.getElementById("modal-artist").textContent = song.artist || "";
    document.getElementById("modal-album").textContent = song.album;
    document.getElementById("modal-plays").textContent = song.plays;
    document.getElementById("modal-duration").textContent = song.duration;
    document.getElementById("modal-year").textContent = song.year;

    // Actualizar enlaces
    document.getElementById("modal-spotify").href = song.spotify;
    document.getElementById("modal-youtube").href = song.youtube;

    // Mostrar modal
    songModal.classList.add("active");

    // Animar con GSAP si está disponible
    if (typeof gsap !== "undefined") {
      gsap.from(".modal-content", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }

  // Actualizar carrusel
  function updateCarousel(index) {
    if (index < 0) index = 0;
    if (index >= slidesCount) index = slidesCount - 1;

    currentSlide = index;

    // Actualizar posición
    const translateX = -currentSlide * slideWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;

    // Actualizar indicadores
    carouselIndicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentSlide);
    });
  }

  // Inicializar gráficos D3.js
  function initCharts() {
    if (typeof d3 === "undefined") return;

    // 1. Gráfico de álbumes
    createAlbumsChart();

    // 2. Gráfico de años
    createYearsChart();

    // 3. Gráfico de colaboraciones
    createFeaturesChart();
  }

  // Crear gráfico de álbumes con D3
  function createAlbumsChart() {
    // Limpiar contenedor
    d3.select("#albums-chart").html("");

    // Configuración
    const width = document.getElementById("albums-chart").offsetWidth || 600;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    // Crear SVG
    const svg = d3
      .select("#albums-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Escala X
    const x = d3
      .scaleBand()
      .domain(albumsData.map((d) => d.name))
      .range([0, width - margin.left - margin.right])
      .padding(0.3);

    // Escala Y
    const y = d3
      .scaleLinear()
      .domain([0, 6])
      .range([height - margin.top - margin.bottom, 0]);

    // Eje X
    g.append("g")
      .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("fill", "#aaaaaa")
      .attr("font-size", "10px");

    // Eje Y
    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("fill", "#aaaaaa")
      .attr("font-size", "10px");

    // Gradiente para barras
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#d4af37");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#8a2be2");

    // Barras
    g.selectAll(".bar")
      .data(albumsData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.songs))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.top - margin.bottom - y(d.songs))
      .attr("fill", "url(#bar-gradient)")
      .attr("rx", 4)
      .attr("ry", 4);

    // Etiquetas
    g.selectAll(".label")
      .data(albumsData)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d.name) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.songs) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#d4af37")
      .attr("font-size", "12px")
      .text((d) => d.songs);

    // Crear leyenda
    const legend = d3.select("#albums-legend");
    legend.html("");

    albumsData.forEach((album, i) => {
      const item = legend.append("div").attr("class", "legend-item");

      item
        .append("div")
        .attr("class", "legend-color")
        .style("background", i % 2 === 0 ? "#d4af37" : "#8a2be2");

      const text = item.append("div").attr("class", "legend-text");

      text.append("div").attr("class", "legend-label").text(album.name);

      text
        .append("div")
        .attr("class", "legend-value")
        .text(`${album.songs} canciones · ${album.plays} reproducciones`);
    });
  }

  // Crear gráfico de años
  function createYearsChart() {
    // Limpiar contenedor
    d3.select("#years-chart").html("");

    // Configuración
    const width = document.getElementById("years-chart").offsetWidth || 600;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    // Datos por año
    const yearsData = [
      { year: 1991, songs: 0 },
      { year: 1992, songs: 0 },
      { year: 1993, songs: 1 },
      { year: 1994, songs: 0 },
      { year: 1995, songs: 1 },
      { year: 1996, songs: 7 },
      { year: 1997, songs: 0 },
      { year: 1998, songs: 1 },
    ];

    // Crear SVG
    const svg = d3
      .select("#years-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Escala X
    const x = d3
      .scaleLinear()
      .domain([1991, 1998])
      .range([0, width - margin.left - margin.right]);

    // Escala Y
    const y = d3
      .scaleLinear()
      .domain([0, 8])
      .range([height - margin.top - margin.bottom, 0]);

    // Línea
    const line = d3
      .line()
      .x((d) => x(d.year))
      .y((d) => y(d.songs))
      .curve(d3.curveMonotoneX);

    // Área
    const area = d3
      .area()
      .x((d) => x(d.year))
      .y0(height - margin.top - margin.bottom)
      .y1((d) => y(d.songs))
      .curve(d3.curveMonotoneX);

    // Eje X
    g.append("g")
      .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(8).tickFormat(d3.format("d")))
      .selectAll("text")
      .attr("fill", "#aaaaaa")
      .attr("font-size", "10px");

    // Eje Y
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .attr("fill", "#aaaaaa")
      .attr("font-size", "10px");

    // Gradiente para área
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#d4af37")
      .attr("stop-opacity", 0.7);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#d4af37")
      .attr("stop-opacity", 0.1);

    // Dibujar área
    g.append("path")
      .datum(yearsData)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area);

    // Dibujar línea
    g.append("path")
      .datum(yearsData)
      .attr("fill", "none")
      .attr("stroke", "#d4af37")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Puntos
    g.selectAll(".dot")
      .data(yearsData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.songs))
      .attr("r", (d) => (d.songs > 0 ? 5 : 0))
      .attr("fill", "#d4af37")
      .attr("stroke", "#0a0a0a")
      .attr("stroke-width", 2);

    // Etiquetas
    g.selectAll(".year-label")
      .data(yearsData.filter((d) => d.songs > 0))
      .enter()
      .append("text")
      .attr("class", "year-label")
      .attr("x", (d) => x(d.year))
      .attr("y", (d) => y(d.songs) - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "#d4af37")
      .attr("font-size", "12px")
      .text((d) => d.songs);
  }

  // Crear gráfico de colaboraciones
  function createFeaturesChart() {
    // Limpiar contenedor
    d3.select("#features-chart").html("");

    // Configuración
    const width = document.getElementById("features-chart").offsetWidth || 600;
    const height = 250;

    // Datos de colaboraciones
    const featuresData = [
      { name: "Dr. Dre", count: 4 },
      { name: "Snoop Dogg", count: 3 },
      { name: "Outlawz", count: 2 },
      { name: "Nate Dogg", count: 2 },
      { name: "Digital Underground", count: 1 },
      { name: "Otros", count: 3 },
    ];

    // Crear SVG
    const svg = d3
      .select("#features-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Configuración de pie chart
    const radius = Math.min(width, height) / 2;

    // Grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Generador de pie
    const pie = d3
      .pie()
      .value((d) => d.count)
      .sort(null);

    // Generador de arco
    const arc = d3
      .arc()
      .innerRadius(radius * 0.4) // Donut chart
      .outerRadius(radius * 0.8);

    // Generador de arco para hover
    const arcHover = d3
      .arc()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.85);

    // Colores
    const color = d3
      .scaleOrdinal()
      .domain(featuresData.map((d) => d.name))
      .range([
        "#d4af37",
        "#8a2be2",
        "#ff0066",
        "#4a00e0",
        "#f9d423",
        "#9933ff",
      ]);

    // Dibujar arcos
    const arcs = g
      .selectAll(".arc")
      .data(pie(featuresData))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.name))
      .attr("stroke", "#0a0a0a")
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(300).attr("d", arcHover);
      })
      .on("mouseout", function (event, d) {
        d3.select(this).transition().duration(300).attr("d", arc);
      });

    // Etiquetas
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text((d) => d.data.count);
  }

  // Cambiar gráfico
  function changeChart(chartType) {
    // Actualizar botones
    analyticsBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.chart === chartType);
    });

    // Actualizar contenedores
    chartContainers.forEach((container) => {
      container.classList.toggle(
        "active",
        container.id === `${chartType}-chart-container`
      );
    });
  }

  // Event Listeners

  // Botones de vista
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      changeView(btn.dataset.view);
    });
  });

  // Botones de previsualización
  previewBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      playSong(btn.dataset.preview);
    });
  });

  // Clic en canción para mostrar modal
  songItems.forEach((item) => {
    item.addEventListener("click", () => {
      showSongModal(item.dataset.song);
    });
  });

  // Controles de reproductor
  playBtn.addEventListener("click", togglePlay);
  prevBtn.addEventListener("click", playPrevSong);
  nextBtn.addEventListener("click", playNextSong);

  // Control de volumen
  volumeRange.addEventListener("input", () => {
    if (!currentAudio) return;
    currentAudio.volume = volumeRange.value / 100;
  });

  volumeBtn.addEventListener("click", () => {
    if (!currentAudio) return;

    if (currentAudio.volume > 0) {
      currentAudio.volume = 0;
      volumeRange.value = 0;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      currentAudio.volume = 1;
      volumeRange.value = 100;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });

  // Cerrar modal
  modalClose.addEventListener("click", () => {
    songModal.classList.remove("active");
  });

  // Cerrar modal al hacer clic fuera
  songModal.addEventListener("click", (e) => {
    if (e.target === songModal) {
      songModal.classList.remove("active");
    }
  });

  // Controles de carrusel
  carouselControls.forEach((control) => {
    control.addEventListener("click", () => {
      if (control.classList.contains("prev-control")) {
        updateCarousel(currentSlide - 1);
      } else {
        updateCarousel(currentSlide + 1);
      }
    });
  });

  // Indicadores de carrusel
  carouselIndicators.forEach((indicator, i) => {
    indicator.addEventListener("click", () => {
      updateCarousel(i);
    });
  });

  // Botones de gráficos
  analyticsBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      changeChart(btn.dataset.chart);
    });
  });

  // Inicializar

  // Inicializar gráficos cuando el documento esté completamente cargado
  window.addEventListener("load", () => {
    initCharts();
  });

  // Inicializar GSAP si está disponible
  if (typeof gsap !== "undefined") {
    // Animación de entrada para elementos
    gsap.from(".section-title-v2", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(".song-item", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Animación de fondo
    gsap.to(".animated-wave", {
      backgroundPosition: "100% 100%",
      duration: 20,
      repeat: -1,
      ease: "linear",
    });
  }
});
