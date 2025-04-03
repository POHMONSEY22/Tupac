// Script para la sección de Momentos Clave - Versión Moderna
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".moments-track");
  const cards = document.querySelectorAll(".moment-card");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const dots = document.querySelectorAll(".carousel-dot");
  const markers = document.querySelectorAll(".timeline-marker");
  const progress = document.querySelector(".timeline-progress");

  let currentIndex = 0;
  const visibleCards = getVisibleCardsCount();
  let maxIndex = Math.max(0, cards.length - visibleCards);

  // Función para obtener el número de tarjetas visibles según el ancho de la pantalla
  function getVisibleCardsCount() {
    const viewportWidth = window.innerWidth;
    if (viewportWidth >= 1200) return 3;
    if (viewportWidth >= 768) return 2;
    return 1;
  }

  // Función para actualizar la posición del carrusel
  function updateCarousel(index) {
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;

    currentIndex = index;

    // Calcular el ancho de cada tarjeta incluyendo el margen
    const cardWidth =
      cards[0].offsetWidth +
      Number.parseInt(window.getComputedStyle(cards[0]).marginRight);
    const translateX = -currentIndex * cardWidth;
    track.style.transform = `translateX(${translateX}px)`;

    // Actualizar dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    // Actualizar marcadores de línea de tiempo
    markers.forEach((marker, i) => {
      marker.classList.toggle("active", i === currentIndex);
    });

    // Actualizar barra de progreso
    const progressWidth = (currentIndex / maxIndex) * 100;
    progress.style.width = `${progressWidth}%`;

    // Habilitar/deshabilitar botones de navegación
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
      prevBtn.classList.toggle("disabled", currentIndex === 0);
    }

    if (nextBtn) {
      nextBtn.disabled = currentIndex === maxIndex;
      nextBtn.classList.toggle("disabled", currentIndex === maxIndex);
    }
  }

  // Inicializar carrusel
  updateCarousel(0);

  // Event listeners para botones de navegación
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      updateCarousel(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      updateCarousel(currentIndex + 1);
    });
  }

  // Event listeners para dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      updateCarousel(i);
    });
  });

  // Event listeners para marcadores de línea de tiempo
  markers.forEach((marker, i) => {
    marker.addEventListener("click", () => {
      updateCarousel(i);
    });
  });

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      updateCarousel(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      updateCarousel(currentIndex + 1);
    }
  });

  // Soporte para gestos táctiles (swipe)
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe izquierda (siguiente)
      updateCarousel(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe derecha (anterior)
      updateCarousel(currentIndex - 1);
    }
  }

  // Resize handler
  window.addEventListener("resize", () => {
    const newVisibleCards = getVisibleCardsCount();
    maxIndex = Math.max(0, cards.length - newVisibleCards);
    updateCarousel(Math.min(currentIndex, maxIndex));
  });

  // Animación al hacer scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
});
