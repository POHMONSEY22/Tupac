// Script para la sección del Proceso Creativo
document.addEventListener("DOMContentLoaded", function () {
  // Animación para las tarjetas creativas
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  // Observar elementos para animar
  const elements = document.querySelectorAll(
    ".creative-card, .timeline-phase, .technique-item"
  );
  elements.forEach((element) => {
    observer.observe(element);
  });

  // Testimonios slider
  const testimonialsTrack = document.querySelector(".testimonials-track");
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialDots = document.querySelectorAll(".testimonial-dot");
  const prevBtn = document.querySelector(".testimonial-nav.prev");
  const nextBtn = document.querySelector(".testimonial-nav.next");

  if (testimonialsTrack && testimonialSlides.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
      testimonialsTrack.style.transform = `translateX(-${index * 100}%)`;

      // Actualizar dots
      testimonialDots.forEach((dot) => {
        dot.classList.remove("active");
      });

      const activeDot = document.querySelector(
        `.testimonial-dot[data-index="${index}"]`
      );
      if (activeDot) {
        activeDot.classList.add("active");
      }

      // Actualizar estado de botones
      if (prevBtn && nextBtn) {
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === testimonialSlides.length - 1;

        prevBtn.style.opacity = index === 0 ? "0.5" : "1";
        nextBtn.style.opacity =
          index === testimonialSlides.length - 1 ? "0.5" : "1";
      }
    }

    // Eventos para los botones
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentSlide > 0) {
          currentSlide--;
          showSlide(currentSlide);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentSlide < testimonialSlides.length - 1) {
          currentSlide++;
          showSlide(currentSlide);
        }
      });
    }

    // Eventos para los dots
    testimonialDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        currentSlide = parseInt(dot.getAttribute("data-index"));
        showSlide(currentSlide);
      });
    });

    // Inicializar
    showSlide(0);
  }

  // Estudio interactivo
  const studioHotspots = document.querySelectorAll(".studio-hotspot");
  const infoContent = document.getElementById("studio-info-content");

  if (studioHotspots.length > 0 && infoContent) {
    // Contenido para cada elemento
    const itemsInfo = {
      notebook: {
        title: "Cuaderno",
        content: `
            <p>El cuaderno era una herramienta esencial en el proceso creativo de Tupac. Siempre llevaba uno consigo para capturar ideas, escribir letras y reflexionar sobre sus experiencias.</p>
            <p>Según sus colaboradores, Tupac llenaba cuadernos enteros en cuestión de días. Sus escritos abarcaban desde letras de canciones hasta poemas, guiones y planes de negocios.</p>
            <p>Después de su muerte, se encontraron docenas de cuadernos con material inédito, lo que permitió la creación de varios álbumes póstumos.</p>
          `,
      },
      microphone: {
        title: "Micrófono",
        content: `
            <p>Tupac prefería grabar con un micrófono Neumann U87, conocido por su claridad y calidez. Su técnica de grabación era distintiva: solía grabar sus voces en una sola toma para mantener la emoción y autenticidad.</p>
            <p>A diferencia de muchos raperos que graban línea por línea, Tupac generalmente grababa versos completos o incluso canciones enteras de una vez, lo que daba a sus interpretaciones una cualidad más orgánica y fluida.</p>
            <p>Los ingenieros de sonido recuerdan que rara vez necesitaba más de dos o tres tomas para conseguir la grabación perfecta.</p>
          `,
      },
      headphones: {
        title: "Auriculares",
        content: `
            <p>Tupac utilizaba auriculares Sony MDR-V600 durante sus sesiones de grabación. Le gustaba escuchar el beat a un volumen alto mientras grababa para sumergirse completamente en la música.</p>
            <p>Su formación como actor le daba una conciencia única de cómo su voz sonaba a través de los auriculares, permitiéndole ajustar su entrega y entonación para lograr el efecto deseado.</p>
            <p>A menudo se quitaba un lado de los auriculares para poder escuchar su propia voz en el espacio, una técnica que aprendió durante sus días de teatro.</p>
          `,
      },
      drink: {
        title: "Hennessy",
        content: `
            <p>El coñac Hennessy era la bebida preferida de Tupac en el estudio. Según sus colaboradores, le ayudaba a relajarse y entrar en un estado mental creativo.</p>
            <p>Esta bebida se convirtió en parte de su ritual creativo, especialmente durante las sesiones nocturnas que podían extenderse hasta el amanecer.</p>
            <p>Tupac a menudo mencionaba que el Hennessy le ayudaba a "desbloquear" ciertas emociones y recuerdos que luego incorporaba en sus letras, dándoles una cualidad más cruda y auténtica.</p>
          `,
      },
      ashtray: {
        title: "Cenicero",
        content: `
            <p>Tupac fumaba regularmente durante las sesiones de grabación. Los productores recuerdan que el estudio siempre estaba lleno de humo cuando Tupac trabajaba.</p>
            <p>El acto de fumar formaba parte de su ritual creativo, creando un ambiente específico que le ayudaba a entrar en el estado mental adecuado para crear.</p>
            <p>Algunos de sus colaboradores han comentado que Tupac utilizaba estos momentos para reflexionar sobre sus letras, a menudo haciendo pausas para fumar mientras consideraba la dirección de una canción.</p>
          `,
      },
    };

    // Función para mostrar información
    function showItemInfo(itemId) {
      // Limpiar contenido actual
      infoContent.innerHTML = "";

      // Crear nuevo contenido
      if (itemsInfo[itemId]) {
        const itemInfo = document.createElement("div");
        itemInfo.className = "info-item active";
        itemInfo.innerHTML = `
            <h4>${itemsInfo[itemId].title}</h4>
            ${itemsInfo[itemId].content}
          `;
        infoContent.appendChild(itemInfo);
      }

      // Actualizar estado de hotspots
      studioHotspots.forEach((spot) => {
        spot.classList.remove("active");
      });

      const activeSpot = document.querySelector(
        `.studio-hotspot[data-item="${itemId}"]`
      );
      if (activeSpot) {
        activeSpot.classList.add("active");
      }
    }

    // Eventos para los hotspots
    studioHotspots.forEach((hotspot) => {
      hotspot.addEventListener("click", () => {
        const itemId = hotspot.getAttribute("data-item");
        showItemInfo(itemId);
      });
    });
  }
});
