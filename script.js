/* =========================================================
   Invitación al cine · Toy Story 5
   Lógica: navegación entre pantallas, botón "No" escurridizo,
   confeti y cuenta regresiva.
   ========================================================= */

/* ----------------------------------------------------------
   1) PERSONALIZACIÓN — cambia estos valores a tu gusto 💗
   ---------------------------------------------------------- */
const CONFIG = {
  // Nombre de tu novia (aparece en el ticket)
  guestName: "Mi persona favorita",

  // Fecha y hora de la cita para la cuenta regresiva.
  // Formato: "AAAA-MM-DDTHH:MM:SS"  (24h). Déjalo en null si aún no hay fecha.
  dateTime: "2026-06-28T19:30:00", // ej: "2026-07-18T19:30:00"

  // Texto de fecha que se muestra en el ticket
  dateLabel: "28 de junio 2026",

  // Frases tiernas que aparecen al pasar el mouse por el botón "No"
  noMessages: [
    "¿Segura? 🥺",
    "Piénsalo otra vez…",
    "Las crispetas te esperan 🍿",
    "Buzz se va a poner triste 😢",
    "Porfa di que sí 💗",
    "Este botón no funciona 😉",
    "Woody dice: ¡di que sí!",
    "No me hagas esto 😅",
  ],
};

/* ----------------------------------------------------------
   2) Navegación entre pantallas
   ---------------------------------------------------------- */
const screens = {
  intro: document.getElementById("intro"),
  ticket: document.getElementById("ticket"),
  yay: document.getElementById("yay"),
};

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("is-active"));
  screens[name].classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ----------------------------------------------------------
   3) Aplicar personalización al cargar
   ---------------------------------------------------------- */
function applyConfig() {
  document.getElementById("guestName").textContent = CONFIG.guestName;
  document.getElementById("dateText").textContent = CONFIG.dateLabel;
}

/* ----------------------------------------------------------
   4) Botones principales
   ---------------------------------------------------------- */
document.getElementById("startBtn").addEventListener("click", () => {
  showScreen("ticket");
});

document.getElementById("yesBtn").addEventListener("click", () => {
  showScreen("yay");
  launchConfetti();
  startCountdown();
});

document.getElementById("restartBtn").addEventListener("click", () => {
  stopCountdown();
  showScreen("intro");
});

/* ----------------------------------------------------------
   5) Botón "No" escurridizo 😅
   ---------------------------------------------------------- */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
let noClicks = 0;

function dodge() {
  const area = noBtn.closest(".ticket__actions");
  const areaRect = area.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = areaRect.width - btnRect.width;
  const maxY = areaRect.height - btnRect.height;

  const x = Math.random() * Math.max(maxX, 10) - maxX / 2;
  const y = Math.random() * Math.max(maxY, 10) - maxY / 2;

  noBtn.style.position = "relative";
  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  // Mensaje tierno
  const msg = CONFIG.noMessages[noClicks % CONFIG.noMessages.length];
  noBtn.textContent = msg;
  noClicks++;

  // Hacemos crecer el "Sí" para que sea irresistible
  const scale = Math.min(1 + noClicks * 0.08, 1.6);
  yesBtn.style.transform = `scale(${scale})`;

  // Después de varios intentos, el "No" se rinde
  if (noClicks >= 6) {
    noBtn.style.display = "none";
  }
}

noBtn.addEventListener("mouseenter", dodge);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dodge();
});

/* ----------------------------------------------------------
   6) Cuenta regresiva
   ---------------------------------------------------------- */
let countdownTimer = null;

function startCountdown() {
  const note = document.getElementById("cdNote");

  if (!CONFIG.dateTime) {
    document.getElementById("cdDays").textContent = "∞";
    document.getElementById("cdHours").textContent = "∞";
    document.getElementById("cdMin").textContent = "∞";
    document.getElementById("cdSec").textContent = "∞";
    note.textContent = "Pon la fecha en script.js y aquí verás la cuenta regresiva 😉";
    return;
  }

  const target = new Date(CONFIG.dateTime).getTime();

  function tick() {
    const now = Date.now();
    let diff = target - now;

    if (diff <= 0) {
      stopCountdown();
      ["cdDays", "cdHours", "cdMin", "cdSec"].forEach(
        (id) => (document.getElementById(id).textContent = "0")
      );
      note.textContent = "¡Es hoy! 🍿🎬 Que empiece la función 💛";
      return;
    }

    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000); diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);

    document.getElementById("cdDays").textContent = days;
    document.getElementById("cdHours").textContent = String(hours).padStart(2, "0");
    document.getElementById("cdMin").textContent = String(mins).padStart(2, "0");
    document.getElementById("cdSec").textContent = String(secs).padStart(2, "0");
    note.textContent = "";
  }

  tick();
  countdownTimer = setInterval(tick, 1000);
}

function stopCountdown() {
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = null;
}

/* ----------------------------------------------------------
   7) Confeti (canvas, sin librerías)
   ---------------------------------------------------------- */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confettiPieces = [];
let confettiAnim = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti() {
  const colors = ["#ffd23f", "#d6322f", "#7b5cd6", "#3fb950", "#5ec2f2", "#ffffff"];
  confettiPieces = [];

  for (let i = 0; i < 160; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 9 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rot: Math.random() * 360,
      rotSpeed: Math.random() * 8 - 4,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    });
  }

  if (!confettiAnim) renderConfetti();

  // Detener tras unos segundos
  setTimeout(() => {
    confettiPieces = [];
  }, 6000);
}

function renderConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rot += p.rotSpeed;

    if (p.y > canvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rot * Math.PI) / 180);
    ctx.fillStyle = p.color;
    if (p.shape === "rect") {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });

  confettiAnim = requestAnimationFrame(renderConfetti);
}

/* ----------------------------------------------------------
   8) Init
   ---------------------------------------------------------- */
applyConfig();
