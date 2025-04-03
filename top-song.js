// Mejoras visuales para la sección de Canciones Más Populares
document.addEventListener("DOMContentLoaded", () => {
  // Declarar las variables d3, gsap y ScrollTrigger
  let d3, gsap, ScrollTrigger;

  // Verificar si las librerías están disponibles globalmente
  if (typeof window.d3 !== "undefined") {
    d3 = window.d3;
  }
  if (typeof window.gsap !== "undefined") {
    gsap = window.gsap;
  }
  if (typeof window.ScrollTrigger !== "undefined") {
    ScrollTrigger = window.ScrollTrigger;
  }

  // Solo ejecutar si D3.js y GSAP están disponibles
  if (typeof d3 === "undefined" || typeof gsap === "undefined") return;

  // Crear visualizaciones de audio en tiempo real
  createAudioVisualization();

  // Crear animaciones para efectos de hover
  createHoverEffects();

  // Crear efectos de desplazamiento
  createScrollEffects();

  // Visualización de audio
  function createAudioVisualization() {
    // Refinar el comportamiento de visualización de audio
    const audioBars = 128;
    const audioCanvas = document.createElement("canvas");
    audioCanvas.width = 300;
    audioCanvas.height = 50;
    audioCanvas.className = "audio-canvas";

    const trackProgress = document.querySelector(".track-progress");
    if (trackProgress) {
      trackProgress.appendChild(audioCanvas);
    }

    const ctx = audioCanvas.getContext("2d");

    // Función para animar las barras
    function animateAudioBars() {
      // Limpiar canvas
      ctx.clearRect(0, 0, audioCanvas.width, audioCanvas.height);

      // Generar datos aleatorios para simular audio
      const audioData = [];
      for (let i = 0; i < audioBars; i++) {
        // Valores aleatorios con una "forma" de onda realista
        const baseValue = Math.sin(i * 0.1 + Date.now() * 0.001) * 0.5 + 0.5;
        audioData.push(baseValue * Math.random() * 0.8 + 0.2);
      }

      // Dibujar barras
      const barWidth = audioCanvas.width / audioBars;
      const gradient = ctx.createLinearGradient(0, 0, 0, audioCanvas.height);
      gradient.addColorStop(0, "#d4af37");
      gradient.addColorStop(1, "#8a2be2");

      ctx.fillStyle = gradient;

      for (let i = 0; i < audioBars; i++) {
        const barHeight = audioData[i] * audioCanvas.height;
        ctx.fillRect(
          i * barWidth,
          audioCanvas.height - barHeight,
          barWidth - 1,
          barHeight
        );
      }

      // Continuar animación
      requestAnimationFrame(animateAudioBars);
    }

    // Iniciar animación
    animateAudioBars();
  }

  // Efectos de hover mejorados
  function createHoverEffects() {
    // Mejorar hover en tarjetas de canciones
    gsap.utils.toArray(".song-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -15,
          scale: 1.03,
          boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
          duration: 0.3,
          ease: "power2.out",
        });

        const playBtn = card.querySelector(".card-play");
        gsap.to(playBtn, {
          scale: 1.2,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });

        const playBtn = card.querySelector(".card-play");
        gsap.to(playBtn, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Mejorar hover en elementos de lista
    gsap.utils.toArray(".song-item").forEach((item) => {
      const playBtn = item.querySelector(".song-preview");

      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          duration: 0.3,
        });

        if (playBtn) {
          gsap.to(playBtn, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          backgroundColor: "rgba(255, 255, 255, 0)",
          duration: 0.3,
        });

        if (playBtn) {
          gsap.to(playBtn, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    });
  }

  // Efectos de desplazamiento
  function createScrollEffects() {
    // Crear un ScrollTrigger si está disponible
    if (typeof ScrollTrigger !== "undefined") {
      // Animar título de sección
      ScrollTrigger.create({
        trigger: ".section-title-v2",
        start: "top 80%",
        onEnter: () => {
          gsap.from(".section-title-v2", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        once: true,
      });

      // Animar elementos de la tabla
      ScrollTrigger.create({
        trigger: ".songs-table",
        start: "top 80%",
        onEnter: () => {
          gsap.from(".song-item", {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          });
        },
        once: true,
      });

      // Animar gráficos
      ScrollTrigger.create({
        trigger: ".top-songs-analytics",
        start: "top 70%",
        onEnter: () => {
          gsap.from(".analytics-header", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.from(".chart-container.active", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
          });
        },
        once: true,
      });
    }
  }
});
