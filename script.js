const box = document.getElementById("box");
const cardsArea = document.getElementById("cardsArea");
const addBtn = document.getElementById("addCard");
const removeLastBtn = document.getElementById("removeLast");
const clearAllBtn = document.getElementById("clearAll");
const startAnimBtn = document.getElementById("startAnim");

let cardsData = [];
let currentIndex = 0;
let animationActive = false;

const pastelColors = [
  "#f8b195", "#f67280", "#c06c84",
  "#6c5b7b", "#355c7d", "#99b898",
  "#f8b88b", "#f67280"
];

addBtn.onclick = () => {
  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  if (!titulo || !descripcion) return alert("Completa ambos campos antes de agregar una carta.");

  cardsData.push({ titulo, descripcion });
  document.getElementById("titulo").value = "";
  document.getElementById("descripcion").value = "";
  alert("Carta guardada en la caja 🎴");
};

removeLastBtn.onclick = () => {
  if (cardsData.length > 0) {
    cardsData.pop();
    alert("Última carta eliminada 🗑️");
  } else {
    alert("No hay cartas para eliminar.");
  }
};

clearAllBtn.onclick = () => {
  cardsData = [];
  cardsArea.innerHTML = "";
  currentIndex = 0;
  alert("Todas las cartas fueron eliminadas 🧹");
};

startAnimBtn.onclick = () => {
  animationActive = !animationActive;
  alert(animationActive
    ? "Modo animación activado. Haz clic en la caja para liberar cartas 💫"
    : "Modo animación desactivado."
  );
};

box.onclick = () => {
  if (!animationActive || cardsData.length === 0) return;

  if (currentIndex < cardsData.length) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.background = pastelColors[currentIndex % pastelColors.length];
    card.innerHTML = `<h3>${cardsData[currentIndex].titulo}</h3><p>${cardsData[currentIndex].descripcion}</p>`;
    cardsArea.appendChild(card);

    const row = Math.floor(currentIndex / 4);
    const col = currentIndex % 4;
    const xOffset = col * 200;
    const yOffset = row * 140;

    // Animación de salida
    setTimeout(() => {
      card.style.opacity = 1;
      card.classList.add("shine");
      card.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1)`;
    }, 100);

    currentIndex++;
  } else {
    // Todas regresan
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = 0;
        card.style.transform = "translateY(-40px) scale(0.8)";
        if (i === cards.length - 1) {
          setTimeout(() => {
            cardsArea.innerHTML = "";
            currentIndex = 0;
          }, 1000);
        }
      }, i * 150);
    });
  }
};
