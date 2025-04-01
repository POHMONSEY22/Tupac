// Script para la página de poesía de Tupac

document.addEventListener('DOMContentLoaded', function() {
    // Comprobar si estamos en la página de poesía
    if (!document.querySelector('.poetry-page')) return;
    
    // Efecto parallax para el hero
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const x = (window.innerWidth - (mouseX * speed * 100));
        const y = (window.innerHeight - (mouseY * speed * 100));
        
        layer.style.transform = `translateX(${x / 100}px) translateY(${y / 100}px)`;
      });
    });
    
    // Scroll suave para el indicador de scroll
    const scrollIndicator = document.querySelector('.poetry-scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const poetryIntro = document.querySelector('.poetry-intro');
        if (poetryIntro) {
          poetryIntro.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    
    // Libro 3D interactivo
    const book = document.getElementById('poetry-book');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentPage = 0;
    const totalPages = document.querySelectorAll('.book-page').length;
    
    if (book) {
      // Abrir/cerrar libro al hacer clic
      book.addEventListener('click', () => {
        if (!book.classList.contains('open')) {
          book.classList.add('open');
          
          // Mostrar controles después de abrir
          setTimeout(() => {
            nextBtn.disabled = false;
          }, 1500);
        }
      });
      
      // Navegación de páginas
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que se propague al libro
        
        if (currentPage < totalPages - 1) {
          currentPage++;
          updateBookControls();
        }
      });
      
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que se propague al libro
        
        if (currentPage > 0) {
          currentPage--;
          updateBookControls();
        }
      });
      
      function updateBookControls() {
        // Actualizar estado de los botones
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
        
        // Animar las páginas
        const pages = document.querySelectorAll('.book-page');
        
        pages.forEach((page, index) => {
          if (index < currentPage) {
            page.style.transform = 'rotateY(-180deg)';
          } else {
            page.style.transform = 'rotateY(0)';
          }
        });
      }
    }
    
    // Visualizaciones poéticas
    const visualizationItems = document.querySelectorAll('.visualization-item');
    const visualizationModal = document.getElementById('visualization-modal');
    const modalClose = document.querySelector('.modal-close');
    const canvas = document.getElementById('visualization-canvas');
    const modalPoemTitle = document.getElementById('modal-poem-title');
    const modalPoemText = document.getElementById('modal-poem-text');
    
    let animationFrame;
    let visualizer;
    
    if (visualizationItems.length > 0) {
      visualizationItems.forEach(item => {
        item.addEventListener('click', () => {
          const poemType = item.getAttribute('data-poem');
          openVisualization(poemType);
        });
      });
      
      if (modalClose) {
        modalClose.addEventListener('click', closeVisualization);
      }
    }
    
    function openVisualization(poemType) {
      // Mostrar modal
      visualizationModal.classList.add('active');
      
      // Configurar el poema en el modal
      setPoemContent(poemType);
      
      // Iniciar visualización
      initVisualization(poemType);
    }
    
    function closeVisualization() {
      // Ocultar modal
      visualizationModal.classList.remove('active');
      
      // Detener animación
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      // Limpiar visualizador
      if (visualizer) {
        visualizer.clear();
      }
    }
    
    function setPoemContent(poemType) {
      // Contenido de los poemas
      const poems = {
        rose: {
          title: "La Rosa que Creció del Concreto",
          text: `<p>¿Escuchaste de la rosa que creció</p>
                 <p>desde una grieta en el concreto?</p>
                 <p>Probando que la ley de la naturaleza está equivocada</p>
                 <p>aprendió a caminar sin tener pies</p>
                 <p>Divertido parece, pero al recordar que respiró aire fresco</p>
                 <p>cuando nadie más se preocupaba por ella</p>
                 <p>creció a pesar de que no le prestaban atención</p>
                 <p>porque la rosa que creció del concreto</p>
                 <p>cuando nadie más le importaba demostrar que</p>
                 <p>se pueden crear rosas desde el concreto.</p>`
        },
        liberty: {
          title: "Libertad",
          text: `<p>¿Cómo puedo decir que soy negro y orgulloso?</p>
                 <p>¿Cómo puedo hablar en absoluto?</p>
                 <p>Cuando mi gente está muriendo</p>
                 <p>Y yo estoy escondido detrás de estos muros</p>
                 <p>Muros que me mantienen cautivo</p>
                 <p>Pero no a mi mente</p>
                 <p>Porque en mi mente soy libre</p>
                 <p>Y siempre lo seré</p>`
        },
        soul: {
          title: "En la Profundidad de mi Alma",
          text: `<p>En la profundidad de mi alma hay</p>
                 <p>Un guerrero sin descanso</p>
                 <p>En la profundidad de mi alma hay</p>
                 <p>Amor que sangra</p>
                 <p>En la profundidad de mi alma hay</p>
                 <p>Un grito tan fuerte que ensordece mis oídos</p>
                 <p>En la profundidad de mi alma hay</p>
                 <p>Un silencio tan tranquilo que me asusta</p>`
        },
        tomorrow: {
          title: "Y Mañana",
          text: `<p>Hoy es la sombra de mañana</p>
                 <p>Hoy es el sueño de ayer</p>
                 <p>Hoy es la esperanza de mañana</p>
                 <p>Hoy es la vida de ayer</p>
                 <p>Y mañana bien podría ser nada</p>
                 <p>Nada más que un sueño</p>
                 <p>Así que vive hoy y vive bien</p>
                 <p>Haz de hoy un sueño para mañana</p>
                 <p>Y de ayer un sueño de felicidad</p>`
        }
      };
      
      // Establecer contenido
      if (poems[poemType]) {
        modalPoemTitle.textContent = poems[poemType].title;
        modalPoemText.innerHTML = poems[poemType].text;
      }
    }
    
    function initVisualization(poemType) {
      if (!canvas) return;
      
      // Configurar canvas
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Crear visualizador según el tipo de poema
      switch(poemType) {
        case 'rose':
          createRoseVisualization(ctx);
          break;
        case 'liberty':
          createLibertyVisualization(ctx);
          break;
        case 'soul':
          createSoulVisualization(ctx);
          break;
        case 'tomorrow':
          createTomorrowVisualization(ctx);
          break;
        default:
          createDefaultVisualization(ctx);
      }
    }
    
    function createRoseVisualization(ctx) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      
      // Partículas para representar pétalos
      const particles = [];
      const particleCount = 100;
      
      // Crear partículas
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 5 + 1,
          color: `hsl(${Math.random() * 60 + 330}, 100%, 50%)`,
          speed: Math.random() * 2 + 0.5,
          angle: Math.random() * Math.PI * 2
        });
      }
      
      // Función para dibujar una rosa
      function drawRose(x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        
        // Tallo
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, size * 2);
        ctx.strokeStyle = '#2a9d2a';
        ctx.lineWidth = size / 10;
        ctx.stroke();
        
        // Pétalos
        const petalCount = 12;
        const petalSize = size / 2;
        
        for (let i = 0; i < petalCount; i++) {
          const angle = (i / petalCount) * Math.PI * 2;
          const distance = size / 2;
          
          ctx.beginPath();
          ctx.ellipse(
            Math.cos(angle) * distance,
            Math.sin(angle) * distance - size / 2,
            petalSize,
            petalSize / 2,
            angle,
            0,
            Math.PI * 2
          );
          
          const gradient = ctx.createRadialGradient(
            Math.cos(angle) * distance,
            Math.sin(angle) * distance - size / 2,
            0,
            Math.cos(angle) * distance,
            Math.sin(angle) * distance - size / 2,
            petalSize
          );
          
          gradient.addColorStop(0, '#ff3366');
          gradient.addColorStop(1, '#cc0033');
          
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        // Centro de la rosa
        ctx.beginPath();
        ctx.arc(0, -size / 2, size / 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffcc00';
        ctx.fill();
        
        ctx.restore();
      }
      
      // Función para dibujar concreto
      function drawConcrete() {
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, height - 100, width, 100);
        
        // Textura del concreto
        for (let i = 0; i < 500; i++) {
          ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.2})`;
          ctx.fillRect(
            Math.random() * width,
            height - 100 + Math.random() * 100,
            Math.random() * 10,
            Math.random() * 10
          );
        }
        
        // Grieta
        ctx.beginPath();
        ctx.moveTo(width / 2 - 50, height - 100);
        
        // Dibujar una línea zigzag
        let x = width / 2 - 50;
        let y = height - 100;
        
        while (y > height / 2) {
          x += (Math.random() - 0.5) * 30;
          y -= Math.random() * 20 + 10;
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = '#222222';
        ctx.lineWidth = 5;
        ctx.stroke();
        
        // Sombra de la grieta
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowColor = 'transparent';
      }
      
      // Función de animación
      function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Fondo degradado
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#001f3f');
        gradient.addColorStop(1, '#003366');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Dibujar concreto
        drawConcrete();
        
        // Dibujar rosa creciendo desde la grieta
        drawRose(width / 2, height / 2, 50 + Math.sin(Date.now() / 1000) * 5);
        
        // Actualizar y dibujar partículas
        particles.forEach(p => {
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          
          // Reiniciar si sale de la pantalla
          if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
            p.angle = Math.random() * Math.PI * 2;
          }
          
          // Dibujar partícula
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.7;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
        
        // Continuar animación
        animationFrame = requestAnimationFrame(animate);
      }
      
      // Iniciar animación
      animate();
      
      // Guardar referencia al visualizador
      visualizer = {
        clear: function() {
          ctx.clearRect(0, 0, width, height);
        }
      };
    }
    
    function createLibertyVisualization(ctx) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      
      // Partículas para representar libertad
      const particles = [];
      const particleCount = 200;
      
      // Crear partículas
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: height,
          radius: Math.random() * 3 + 1,
          color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
          speed: Math.random() * 3 + 1,
          angle: -Math.PI / 2 + (Math.random() - 0.5) * 0.5
        });
      }
      
      // Función para dibujar jaula/muros
      function drawCage() {
        // Dibujar barrotes
        const barCount = 10;
        const barWidth = 10;
        const spacing = width / barCount;
        
        ctx.fillStyle = '#333';
        
        for (let i = 0; i < barCount; i++) {
          ctx.fillRect(i * spacing, height / 2, barWidth, height / 2);
        }
        
        // Base de la jaula
        ctx.fillRect(0, height - 50, width, 50);
      }
      
      // Función para dibujar silueta
      function drawSilhouette() {
        ctx.fillStyle = '#000';
        
        // Cuerpo
        ctx.beginPath();
        ctx.ellipse(width / 2, height - 150, 40, 100, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Cabeza
        ctx.beginPath();
        ctx.arc(width / 2, height - 270, 30, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Función de animación
      function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Fondo degradado
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#000');
        gradient.addColorStop(1, '#333');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Dibujar jaula
        drawCage();
        
        // Dibujar silueta
        drawSilhouette();
        
        // Actualizar y dibujar partículas (representando libertad)
        particles.forEach(p => {
          p.y += Math.sin(p.angle) * p.speed;
          p.x += Math.cos(p.angle) * p.speed * 0.5;
          
          // Reiniciar si sale de la pantalla
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
          
          // Dibujar partícula
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.7;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
        
        // Texto "LIBERTAD"
        ctx.font = 'bold 40px var(--poetry-font)';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillText('LIBERTAD', width / 2, height / 3);
        
        // Continuar animación
        animationFrame = requestAnimationFrame(animate);
      }
      
      // Iniciar animación
      animate();
      
      // Guardar referencia al visualizador
      visualizer = {
        clear: function() {
          ctx.clearRect(0, 0, width, height);
        }
      };
    }
    
    function createSoulVisualization(ctx) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      
      // Partículas para representar el alma
      const particles = [];
      const particleCount = 150;
      
      // Crear partículas
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: width / 2,
          y: height / 2,
          radius: Math.random() * 4 + 1,
          color: `hsl(${Math.random() * 60 + 270}, 100%, 60%)`,
          speed: Math.random() * 2 + 0.5,
          angle: Math.random() * Math.PI * 2,
          amplitude: Math.random() * 20 + 10,
          frequency: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2
        });
      }
      
      // Función de animación
      function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Fondo degradado
        const gradient = ctx.createRadialGradient(
          width / 2, height / 2, 0,
          width / 2, height / 2, height
        );
        gradient.addColorStop(0, '#1a0033');
        gradient.addColorStop(1, '#000');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Dibujar silueta del guerrero
        const time = Date.now() / 1000;
        const silhouetteX = width / 2;
        const silhouetteY = height / 2;
        
        ctx.save();
        ctx.translate(silhouetteX, silhouetteY);
        
        // Cuerpo
        ctx.beginPath();
        ctx.moveTo(-30, -50);
        ctx.lineTo(-50, 50);
        ctx.lineTo(50, 50);
        ctx.lineTo(30, -50);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fill();
        
        // Cabeza
        ctx.beginPath();
        ctx.arc(0, -70, 25, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
        
        // Actualizar y dibujar partículas
        particles.forEach(p => {
          // Movimiento orbital con variación sinusoidal
          p.angle += p.speed * 0.01;
          
          const orbitX = Math.cos(p.angle) * (100 + Math.sin(time * p.frequency + p.phase) * p.amplitude);
          const orbitY = Math.sin(p.angle) * (100 + Math.sin(time * p.frequency + p.phase) * p.amplitude);
          
          const x = width / 2 + orbitX;
          const y = height / 2 + orbitY;
          
          // Dibujar partícula
          ctx.beginPath();
          ctx.arc(x, y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.7;
          ctx.fill();
          
          // Conectar con líneas al centro
          ctx.beginPath();
          ctx.moveTo(width / 2, height / 2);
          ctx.lineTo(x, y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = 0.1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        });
        
        // Continuar animación
        animationFrame = requestAnimationFrame(animate);
      }
      
      // Iniciar animación
      animate();
      
      // Guardar referencia al visualizador
      visualizer = {
        clear: function() {
          ctx.clearRect(0, 0, width, height);
        }
      };
    }
    
    function createTomorrowVisualization(ctx) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      
      // Partículas para representar el tiempo
      const particles = [];
      const particleCount = 100;
      
      // Crear partículas
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 3 + 1,
          color: `hsl(${Math.random() * 60 + 40}, 100%, 70%)`,
          speed: Math.random() * 1 + 0.5,
          direction: Math.random() > 0.5 ? 1 : -1
        });
      }
      
      // Función para dibujar reloj
      function drawClock(x, y, radius, time) {
        ctx.save();
        ctx.translate(x, y);
        
        // Círculo exterior
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Marcas de horas
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          
          ctx.save();
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, -radius + 10);
          ctx.lineTo(0, -radius);
          ctx.strokeStyle = '#d4af37';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }
        
        // Manecilla de horas
        ctx.save();
        ctx.rotate(time * Math.PI / 6);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -radius * 0.5);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();
        
        // Manecilla de minutos
        ctx.save();
        ctx.rotate(time * Math.PI * 2);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -radius * 0.7);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        
        ctx.restore();
      }
      
      // Función de animación
      function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Fondo degradado
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#000');
        gradient.addColorStop(1, '#003366');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Dibujar relojes
        const time = Date.now() / 1000;
        drawClock(width / 4, height / 2, 80, time * 0.1);
        drawClock(width * 3 / 4, height / 2, 80, -time * 0.05);
        
        // Actualizar y dibujar partículas
        particles.forEach(p => {
          p.y += p.speed * p.direction;
          
          // Reiniciar si sale de la pantalla
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
          
          // Dibujar partícula
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.7;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
        
        // Texto "HOY" y "MAÑANA"
        ctx.font = 'bold 24px var(--poetry-font)';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText('HOY', width / 4, height / 2 - 120);
        ctx.fillText('MAÑANA', width * 3 / 4, height / 2 - 120);
        
        // Continuar animación
        animationFrame = requestAnimationFrame(animate);
      }
      
      // Iniciar animación
      animate();
      
      // Guardar referencia al visualizador
      visualizer = {
        clear: function() {
          ctx.clearRect(0, 0, width, height);
        }
      };
    }
    
    function createDefaultVisualization(ctx) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      
      // Función de animación
      function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Fondo degradado
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#000');
        gradient.addColorStop(1, '#333');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Texto central
        ctx.font = 'bold 40px var(--poetry-font)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#d4af37';
        ctx.fillText('Visualización Poética', width / 2, height / 2);
        
        // Continuar animación
        animationFrame = requestAnimationFrame(animate);
      }
      
      // Iniciar animación
      animate();
      
      // Guardar referencia al visualizador
      visualizer = {
        clear: function() {
          ctx.clearRect(0, 0, width, height);
        }
      };
    }
    
    // Análisis literario - Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabBtns.length > 0) {
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Desactivar todos los botones y paneles
          tabBtns.forEach(b => b.classList.remove('active'));
          tabPanels.forEach(p => p.classList.remove('active'));
          
          // Activar el botón clickeado
          btn.classList.add('active');
          
          // Activar el panel correspondiente
          const tabId = btn.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
        });
      });
    }
    
    // Sección interactiva de escritura
    const promptBtns = document.querySelectorAll('.prompt-btn');
    const poemTextarea = document.getElementById('poem-textarea');
    const inspirationContent = document.getElementById('inspiration-content');
    const saveBtn = document.getElementById('save-poem-btn');
    const shareBtn = document.getElementById('share-poem-btn');
    const printBtn = document.getElementById('print-poem-btn');
    const clearBtn = document.getElementById('clear-poem-btn');
    
    if (promptBtns.length > 0) {
      promptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Desactivar todos los botones
          promptBtns.forEach(b => b.classList.remove('active'));
          
          // Activar el botón clickeado
          btn.classList.add('active');
          
          // Mostrar inspiración según el tema
          const theme = btn.getAttribute('data-theme');
          showInspiration(theme);
        });
      });
    }
    
    function showInspiration(theme) {
      // Inspiración según el tema
      const inspirations = {
        resilience: `
          <p>Piensa en los momentos de tu vida en que has tenido que superar obstáculos. ¿Cómo te has levantado después de caer? Tupac utilizaba metáforas poderosas como la rosa que crece a través del concreto para simbolizar la resistencia.</p>
          <p>Palabras clave: fuerza, obstáculos, crecimiento, supervivencia, determinación.</p>
        `,
        love: `
          <p>El amor en todas sus formas fue un tema recurrente en la poesía de Tupac. Explora el amor romántico, familiar o el amor por tu comunidad. Tupac a menudo contrastaba la dureza del mundo con la ternura del amor.</p>
          <p>Palabras clave: corazón, conexión, sacrificio, vulnerabilidad, sanación.</p>
        `,
        justice: `
          <p>La justicia social era fundamental en la obra de Tupac. Reflexiona sobre las injusticias que ves en el mundo y cómo te afectan a ti y a tu comunidad. Tupac usaba su poesía como una forma de protesta y concientización.</p>
          <p>Palabras clave: igualdad, lucha, voz, cambio, despertar.</p>
        `,
        hope: `
          <p>A pesar de las dificultades, Tupac siempre mantuvo la esperanza en un futuro mejor. Piensa en tus propias esperanzas y sueños. ¿Qué te da esperanza en los momentos difíciles?</p>
          <p>Palabras clave: luz, mañana, sueños, posibilidad, renacimiento.</p>
        `,
        identity: `
          <p>Tupac exploró constantemente su identidad y lugar en el mundo. Reflexiona sobre quién eres, de dónde vienes y hacia dónde vas. La poesía de Tupac a menudo navegaba entre diferentes aspectos de su identidad.</p>
          <p>Palabras clave: raíces, camino, máscara, verdad, evolución.</p>
        `,
        freedom: `
          <p>La libertad, tanto física como mental, era un tema central para Tupac. Considera lo que significa ser libre para ti y las barreras que limitan esa libertad. Tupac escribió sobre cómo su mente permanecía libre incluso cuando su cuerpo estaba encarcelado.</p>
          <p>Palabras clave: cadenas, vuelo, mente, espacio, liberación.</p>
        `
      };
      
      // Establecer contenido de inspiración
      if (inspirations[theme]) {
        inspirationContent.innerHTML = inspirations[theme];
      }
    }
    
    // Botones de herramientas
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        // Simular guardado
        if (poemTextarea.value.trim() !== '') {
          alert('Tu poema ha sido guardado.');
        } else {
          alert('Por favor, escribe un poema antes de guardar.');
        }
      });
    }
    
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        // Simular compartir
        if (poemTextarea.value.trim() !== '') {
          alert('Compartiendo tu poema...');
        } else {
          alert('Por favor, escribe un poema antes de compartir.');
        }
      });
    }
    
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        // Simular impresión
        if (poemTextarea.value.trim() !== '') {
          alert('Preparando tu poema para imprimir...');
        } else {
          alert('Por favor, escribe un poema antes de imprimir.');
        }
      });
    }
    
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        // Limpiar textarea
        if (poemTextarea.value.trim() !== '') {
          if (confirm('¿Estás seguro de que quieres borrar tu poema?')) {
            poemTextarea.value = '';
          }
        }
      });
    }
    
    // Inicializar particles.js si existe
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
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
            value: 0.5,
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
            opacity: 0.4,
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
  });