// Script para el Estudio Virtual 2Pac - Versión Moderna
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar partículas
  initParticles();

  // Referencias a elementos DOM
  const powerBtn = document.getElementById("power-btn");
  const playBtn = document.getElementById("play-btn");
  const stopBtn = document.getElementById("stop-btn");
  const recordBtn = document.getElementById("record-btn");
  const rewindBtn = document.getElementById("rewind-btn");
  const forwardBtn = document.getElementById("forward-btn");
  const progressFill = document.getElementById("progress-fill");
  const progressHandle = document.getElementById("progress-handle");
  const progressBar = document.querySelector(".progress-bar");
  const currentTimeDisplay = document.getElementById("current-time");
  const totalTimeDisplay = document.getElementById("total-time");
  const tempoSlider = document.getElementById("tempo-slider");
  const tempoValue = document.getElementById("tempo-value");
  const masterVolume = document.getElementById("master-volume");
  const masterVolumeValue = document.getElementById("master-volume-value");
  const beatVolume = document.getElementById("beat-volume");
  const beatVolumeValue = document.getElementById("beat-volume-value");
  const vocalVolume = document.getElementById("vocal-volume");
  const vocalVolumeValue = document.getElementById("vocal-volume-value");
  const sampleVolume = document.getElementById("sample-volume");
  const sampleVolumeValue = document.getElementById("sample-volume-value");
  const beatPan = document.getElementById("beat-pan");
  const beatPanValue = document.getElementById("beat-pan-value");
  const vocalPan = document.getElementById("vocal-pan");
  const vocalPanValue = document.getElementById("vocal-pan-value");
  const samplePan = document.getElementById("sample-pan");
  const samplePanValue = document.getElementById("sample-pan-value");
  const beatSelector = document.getElementById("beat-selector");
  const vocalSelector = document.getElementById("vocal-selector");
  const sampleSelector = document.getElementById("sample-selector");
  const muteBtns = document.querySelectorAll(".mute-btn");
  const soloBtns = document.querySelectorAll(".solo-btn");
  const masterMuteBtn = document.getElementById("master-mute");
  const vizModeBtns = document.querySelectorAll(".viz-mode-btn");
  const presetItems = document.querySelectorAll(".preset-item");
  const infoToggle = document.getElementById("info-toggle");
  const infoContent = document.getElementById("info-content");

  // Variables de estado
  let isPowered = false;
  let isPlaying = false;
  let isRecording = false;
  let currentTime = 0;
  const totalTime = 180; // 3 minutos en segundos
  let tempo = 90;
  let currentVisualizerMode = "waveform";
  let animationFrameId = null;
  let timeInterval = null; // Declarar timeInterval

  // Inicializar visualizador
  const canvas = document.getElementById("main-visualizer");
  const ctx = canvas.getContext("2d");

  // Ajustar tamaño del canvas
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Función para inicializar partículas
  function initParticles() {
    particlesJS("studio-particles", {
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

  // Función para dibujar visualizador
  function drawVisualizer() {
    if (!isPowered || !isPlaying) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generar datos aleatorios para simular audio
    const dataLength = 100;
    const data = [];
    for (let i = 0; i < dataLength; i++) {
      // Simular forma de onda con valores entre -1 y 1
      data.push(
        Math.sin(i * 0.1 + currentTime * 0.01) * 0.5 +
          (Math.random() * 0.5 - 0.25)
      );
    }

    // Dibujar según el modo seleccionado
    switch (currentVisualizerMode) {
      case "waveform":
        drawWaveform(data);
        break;
      case "bars":
        drawBars(data);
        break;
      case "circular":
        drawCircular(data);
        break;
    }

    // Actualizar medidores de volumen
    updateMeters();

    // Continuar animación
    animationFrameId = requestAnimationFrame(drawVisualizer);
  }

  // Dibujar forma de onda
  function drawWaveform(data) {
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    const lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(0, centerY);

    for (let i = 0; i < data.length; i++) {
      const x = (i / data.length) * width;
      const y = centerY + data[i] * centerY;
      ctx.lineTo(x, y);
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#d4af37";
    ctx.stroke();

    // Añadir efecto de brillo
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#d4af37";
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Dibujar barras
  function drawBars(data) {
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / data.length;

    for (let i = 0; i < data.length; i++) {
      const x = i * barWidth;
      const barHeight = Math.abs(data[i]) * height;

      // Gradiente para las barras
      const gradient = ctx.createLinearGradient(
        0,
        height - barHeight,
        0,
        height
      );
      gradient.addColorStop(0, "#d4af37");
      gradient.addColorStop(1, "#8a2be2");

      ctx.fillStyle = gradient;
      ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
    }
  }

  // Dibujar visualización circular
  function drawCircular(data) {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.2)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Dibujar líneas desde el centro
    for (let i = 0; i < data.length; i++) {
      const angle = (i / data.length) * Math.PI * 2;
      const length = radius + data[i] * radius;

      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * length;
      const y2 = centerY + Math.sin(angle) * length;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      // Gradiente para las líneas
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, "rgba(212, 175, 55, 0.5)");
      gradient.addColorStop(1, "rgba(138, 43, 226, 0.8)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Dibujar círculo central
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#d4af37";
    ctx.fill();
  }

  // Actualizar medidores de volumen
  function updateMeters() {
    // Simular niveles de audio
    const beatLevel =
      (Math.random() * Number.parseFloat(beatVolume.value)) / 100;
    const vocalLevel =
      (Math.random() * Number.parseFloat(vocalVolume.value)) / 100;
    const sampleLevel =
      (Math.random() * Number.parseFloat(sampleVolume.value)) / 100;

    // Actualizar medidores
    document.getElementById("beat-meter").style.width = `${beatLevel * 100}%`;
    document.getElementById("vocal-meter").style.width = `${vocalLevel * 100}%`;
    document.getElementById("sample-meter").style.width = `${
      sampleLevel * 100
    }%`;

    // Medidor master (estéreo)
    const masterLevel =
      (((beatLevel + vocalLevel + sampleLevel) / 3) *
        Number.parseFloat(masterVolume.value)) /
      100;
    document.getElementById("master-meter-l").style.width = `${
      masterLevel * 100 * (1 + Math.random() * 0.1)
    }%`;
    document.getElementById("master-meter-r").style.width = `${
      masterLevel * 100 * (1 + Math.random() * 0.1)
    }%`;
  }

  // Actualizar tiempo y progreso
  function updateTime() {
    if (!isPowered || !isPlaying) return;

    currentTime += 0.1;
    if (currentTime > totalTime) {
      currentTime = 0;
      stopPlayback();
    }

    // Actualizar visualización de tiempo
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeDisplay.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    // Actualizar barra de progreso
    const progress = (currentTime / totalTime) * 100;
    progressFill.style.width = `${progress}%`;
    progressHandle.style.left = `${progress}%`;
  }

  // Formatear tiempo total
  function formatTotalTime() {
    const minutes = Math.floor(totalTime / 60);
    const seconds = Math.floor(totalTime % 60);
    totalTimeDisplay.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  // Iniciar reproducción
  function startPlayback() {
    if (!isPowered) return;

    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';

    // Iniciar animación del visualizador
    if (animationFrameId === null) {
      drawVisualizer();
    }

    // Iniciar actualización de tiempo
    timeInterval = setInterval(updateTime, 100);
  }

  // Detener reproducción
  function stopPlayback() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';

    // Detener animación
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    // Detener actualización de tiempo
    clearInterval(timeInterval);
  }

  // Encender/apagar el estudio
  function togglePower() {
    isPowered = !isPowered;
    powerBtn.classList.toggle("active", isPowered);

    if (isPowered) {
      // Inicializar estudio
      formatTotalTime();
      updateMeters();
    } else {
      // Apagar estudio
      stopPlayback();
      currentTime = 0;
      updateTime();

      // Resetear medidores
      document.getElementById("beat-meter").style.width = "0%";
      document.getElementById("vocal-meter").style.width = "0%";
      document.getElementById("sample-meter").style.width = "0%";
      document.getElementById("master-meter-l").style.width = "0%";
      document.getElementById("master-meter-r").style.width = "0%";

      // Limpiar visualizador
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // Actualizar valor de panorámica
  function updatePanValue(value, element) {
    if (value === 0) {
      element.textContent = "C";
    } else if (value < 0) {
      element.textContent = `L${Math.abs(value)}%`;
    } else {
      element.textContent = `R${value}%`;
    }
  }

  // Event Listeners

  // Botón de encendido
  powerBtn.addEventListener("click", togglePower);

  // Botón de reproducción/pausa
  playBtn.addEventListener("click", () => {
    if (!isPowered) return;

    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  });

  // Botón de detener
  stopBtn.addEventListener("click", () => {
    if (!isPowered) return;

    stopPlayback();
    currentTime = 0;
    updateTime();
    progressFill.style.width = "0%";
    progressHandle.style.left = "0%";
  });

  // Botón de grabación
  recordBtn.addEventListener("click", () => {
    if (!isPowered) return;

    isRecording = !isRecording;
    recordBtn.classList.toggle("active", isRecording);

    if (isRecording && !isPlaying) {
      startPlayback();
    }
  });

  // Botones de retroceso y avance
  rewindBtn.addEventListener("click", () => {
    if (!isPowered) return;

    currentTime = Math.max(0, currentTime - 10);
    updateTime();
  });

  forwardBtn.addEventListener("click", () => {
    if (!isPowered) return;

    currentTime = Math.min(totalTime, currentTime + 10);
    updateTime();
  });

  // Barra de progreso
  progressBar.addEventListener("click", (e) => {
    if (!isPowered) return;

    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;

    currentTime = percentage * totalTime;
    updateTime();
  });

  // Controles de volumen
  masterVolume.addEventListener("input", () => {
    masterVolumeValue.textContent = `${masterVolume.value}%`;
  });

  beatVolume.addEventListener("input", () => {
    beatVolumeValue.textContent = `${beatVolume.value}%`;
  });

  vocalVolume.addEventListener("input", () => {
    vocalVolumeValue.textContent = `${vocalVolume.value}%`;
  });

  sampleVolume.addEventListener("input", () => {
    sampleVolumeValue.textContent = `${sampleVolume.value}%`;
  });

  // Controles de panorámica
  beatPan.addEventListener("input", () => {
    updatePanValue(beatPan.value, beatPanValue);
  });

  vocalPan.addEventListener("input", () => {
    updatePanValue(vocalPan.value, vocalPanValue);
  });

  samplePan.addEventListener("input", () => {
    updatePanValue(samplePan.value, samplePanValue);
  });

  // Control de tempo
  tempoSlider.addEventListener("input", () => {
    tempo = tempoSlider.value;
    tempoValue.textContent = `${tempo} BPM`;
  });

  // Botones de silenciar
  muteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!isPowered) return;

      btn.classList.toggle("active");
    });
  });

  // Botones de solo
  soloBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!isPowered) return;

      btn.classList.toggle("active");

      // Si se activa solo, silenciar las demás pistas
      if (btn.classList.contains("active")) {
        const track = btn.dataset.track;

        soloBtns.forEach((otherBtn) => {
          if (otherBtn !== btn) {
            otherBtn.classList.remove("active");
          }
        });

        muteBtns.forEach((muteBtn) => {
          if (muteBtn.dataset.track !== track) {
            muteBtn.classList.add("active");
          } else {
            muteBtn.classList.remove("active");
          }
        });
      } else {
        // Si se desactiva solo, quitar silencio de todas las pistas
        muteBtns.forEach((muteBtn) => {
          muteBtn.classList.remove("active");
        });
      }
    });
  });

  // Botón de silenciar master
  masterMuteBtn.addEventListener("click", () => {
    if (!isPowered) return;

    masterMuteBtn.classList.toggle("active");
  });

  // Botones de modo de visualizador
  vizModeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!isPowered) return;

      vizModeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentVisualizerMode = btn.dataset.mode;
    });
  });

  // Presets
  presetItems.forEach((preset) => {
    preset.addEventListener("click", () => {
      if (!isPowered) return;

      const presetType = preset.dataset.preset;

      // Aplicar configuraciones según el preset
      switch (presetType) {
        case "classic":
          beatVolume.value = 70;
          beatVolumeValue.textContent = "70%";
          vocalVolume.value = 80;
          vocalVolumeValue.textContent = "80%";
          sampleVolume.value = 50;
          sampleVolumeValue.textContent = "50%";
          beatPan.value = -20;
          updatePanValue(-20, beatPanValue);
          vocalPan.value = 0;
          updatePanValue(0, vocalPanValue);
          samplePan.value = 20;
          updatePanValue(20, samplePanValue);
          tempoSlider.value = 90;
          tempoValue.textContent = "90 BPM";
          break;

        case "emotional":
          beatVolume.value = 60;
          beatVolumeValue.textContent = "60%";
          vocalVolume.value = 90;
          vocalVolumeValue.textContent = "90%";
          sampleVolume.value = 70;
          sampleVolumeValue.textContent = "70%";
          beatPan.value = -10;
          updatePanValue(-10, beatPanValue);
          vocalPan.value = 0;
          updatePanValue(0, vocalPanValue);
          samplePan.value = 10;
          updatePanValue(10, samplePanValue);
          tempoSlider.value = 75;
          tempoValue.textContent = "75 BPM";
          break;

        case "aggressive":
          beatVolume.value = 85;
          beatVolumeValue.textContent = "85%";
          vocalVolume.value = 75;
          vocalVolumeValue.textContent = "75%";
          sampleVolume.value = 40;
          sampleVolumeValue.textContent = "40%";
          beatPan.value = -30;
          updatePanValue(-30, beatPanValue);
          vocalPan.value = 0;
          updatePanValue(0, vocalPanValue);
          samplePan.value = 30;
          updatePanValue(30, samplePanValue);
          tempoSlider.value = 95;
          tempoValue.textContent = "95 BPM";
          break;

        case "modern":
          beatVolume.value = 75;
          beatVolumeValue.textContent = "75%";
          vocalVolume.value = 70;
          vocalVolumeValue.textContent = "70%";
          sampleVolume.value = 65;
          sampleVolumeValue.textContent = "65%";
          beatPan.value = 0;
          updatePanValue(0, beatPanValue);
          vocalPan.value = 0;
          updatePanValue(0, vocalPanValue);
          samplePan.value = 0;
          updatePanValue(0, samplePanValue);
          tempoSlider.value = 100;
          tempoValue.textContent = "100 BPM";
          break;
      }
    });
  });

  // Toggle de información
  infoToggle.addEventListener("click", () => {
    infoContent.classList.toggle("active");
  });

  // Inicializar valores
  updatePanValue(0, beatPanValue);
  updatePanValue(0, vocalPanValue);
  updatePanValue(0, samplePanValue);

  // Iniciar con el estudio apagado
  togglePower();
});
