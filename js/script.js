// DATOS PARA FILTRAR
const dwnicole = [
  // Categoría: donaciones / voluntario
  {
    id: 1,
    name: "El comienzo de una nueva oportunidad",
    image: "img/foto8.jpg",
    genero: "voluntario",
    description: "Cada donación, sin importar su tamaño, nos acerca a construir un futuro con más esperanza y mejores condiciones de vida."
  },
  {
    id: 2,
    name: "Tu tiempo es nuestra mejor donación.",
    image: "img/foto5.jpeg",
    genero: "voluntario",
    description: "Compartir tu tiempo, tus habilidades y tu corazón para ayudar a quienes más lo necesitan nos ayuda a crear un entorno más seguro y con más esperanza."
  },
  {
    id: 3,
    name: "Una prenda puede brindar abrigo y esperanza.",
    image: "img/foto2.png",
    genero: "voluntario",
    description: "Cada prenda en buen estado puede hacer la diferencia y convertirse en una oportunidad para que alguien se sienta cuidado y protegido."
  },
  {
    id: 4,
    name: "Compartir alimentos es brindar bienestar.",
    image: "img/foto1.jpeg",
    genero: "voluntario",
    description: "Ayuda a cubrir las necesidades básicas de quienes más lo necesitan. Cada alimento compartido es un acto de solidaridad que brinda apoyo."
  },

  // Categoría: únete
  {
    id: 5,
    name: "Sé parte del Cambio",
    image: "img/foto4.jpeg",
    genero: "únete",
    description: "Únete a nuestra fundación y ayúdanos a construir una comunidad más solidaria. No necesitas hacer grandes cosas para marcar la diferencia; tu compromiso y tus ganas de ayudar son un gran comienzo."
  },
  {
    id: 6,
    name: "Juntos Hacemos Más.",
    image: "img/foto7.jpeg",
    genero: "únete",
    description: "Cada voluntario aporta algo único. Al trabajar en equipo, podemos organizar actividades, brindar apoyo y crear un entorno donde las personas se sientan acompañadas y protegidas."
  },
  {
    id: 7,
    name: "Cada Gesto Cuenta",
    image: "img/foto3.png",
    genero: "únete",
    description: "Tu disposición para ayudar puede mejorar el día de alguien. Con pequeñas acciones y trabajo en equipo, podemos brindar apoyo a quienes más lo necesitan y crear un ambiente de confianza y solidaridad."
  },
  {
    id: 8,
    name: "Tus Manos Pueden Ayudar",
    image: "img/foto6.jpeg",
    genero: "únete",
    description: "Tu participación nos permite llegar a más personas y ofrecer ayuda a quienes atraviesan momentos difíciles."
  }
];

// Función para quitar acentos y limpiar texto para comparar sin errores
function normalizarTexto(texto) {
  return (texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Función principal de Render
function renderDw(categoriaSeleccionada) {
  const dwnicoleContainer = document.getElementById("donaciones-container");
  if (!dwnicoleContainer) return;

  const categoriaLimpia = normalizarTexto(categoriaSeleccionada).replace(/[-_]/g, " ");
  let dwnicoleToRender = [];

  if (["apoyo-económico", "todos", "todas", "all"].includes(categoriaLimpia)) {
    // Si elige 'apoyo económico', muestra TODAS las tarjetas ordenadas aleatoriamente (mezcladas)
    dwnicoleToRender = [...dwnicole].sort(() => Math.random() - 0.5);
  } else if (["voluntario", "voluntariado"].includes(categoriaLimpia)) {
    // Si elige 'voluntario', muestra las tarjetas etiquetadas como 'donaciones'
    dwnicoleToRender = dwnicole.filter(item =>
      ["voluntario", "voluntariado"].includes(normalizarTexto(item.genero))
    );
  } else {
    // Para 'unete' o cualquier otra categoría exacta
    dwnicoleToRender = dwnicole.filter(item => normalizarTexto(item.genero) === categoriaLimpia);
  }

  // Limpiar el contenedor
  dwnicoleContainer.innerHTML = "";

  if (dwnicoleToRender.length === 0) {
    dwnicoleContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; width: 100%;">No hay elementos disponibles para esta categoría.</p>';
    return;
  }

  // Generar tarjetas en el HTML
  dwnicoleToRender.forEach(dw => {
    const cardHtml = `
      <figure class="donaciones-card" data-gender="${dw.genero}">
        <img src="${dw.image}" alt="${dw.name}">
        <figcaption>${dw.name}</figcaption>
        <div class="card-description">
          <p>${dw.description}</p>
        </div>
      </figure>
    `;
    dwnicoleContainer.innerHTML += cardHtml;
  });
}

// Inicialización de eventos cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderDw(button.dataset.category);
    });
  });

  // Carga inicial: Muestra todas las tarjetas mezcladas
  renderDw("apoyo-económico");

  // Botón de volver al inicio
  const botonInicio = document.querySelector(".scroll-to-top-btn");

  botonInicio?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Botón para volver al inicio
  document.addEventListener("click", (e) => {
    const boton = e.target.closest(".scroll-to-top-btn");
    if (!boton) return;

    e.preventDefault();
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Función para el botón de volver al inicio
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};