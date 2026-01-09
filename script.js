const params = new URLSearchParams(window.location.search);

const urlText = params.get("url") || "particulainfluente.pt";
const headlineText = params.get("headline") || "Visita o website";
const intervalSec = Number(params.get("interval") || 45); // reaparece
const showSec = Number(params.get("show") || 8);          // fica visível
const align = params.get("align") || "left";              // left | right
const debugOn = params.get("debug") === "1";              // debug=1

const banner = document.getElementById("banner");
const urlEl = document.getElementById("url");
const headlineEl = document.getElementById("headline");
const fill = document.getElementById("barFill");
const debugEl = document.getElementById("debug");

urlEl.textContent = urlText;
headlineEl.textContent = headlineText;

if (align === "right") {
  banner.style.left = "auto";
  banner.style.right = "48px";
  // entra pela direita
  banner.style.transform = "translateX(120%)";
}

function logDebug(msg){
  if (!debugOn) return;
  debugEl.style.display = "block";
  debugEl.textContent = msg;
}

function animateBar(durationMs){
  fill.style.transition = "none";
  fill.style.width = "0%";
  requestAnimationFrame(() => {
    fill.style.transition = `width ${durationMs}ms linear`;
    fill.style.width = "100%";
  });
}

let hideTimer = null;

function showBanner(){
  const durationMs = Math.max(1500, showSec * 1000);

  banner.classList.remove("hide");
  banner.classList.add("show");

  animateBar(durationMs);

  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    banner.classList.remove("show");
    banner.classList.add("hide");
    logDebug(
      `OK: mostrou e escondeu\n` +
      `url=${urlText}\nheadline=${headlineText}\nshow=${showSec}s interval=${intervalSec}s align=${align}`
    );
  }, durationMs);
}

function start(){
  // 1) mostra logo ao iniciar (para veres no OBS)
  showBanner();

  // 2) repete de X em X segundos
  setInterval(showBanner, Math.max(5, intervalSec) * 1000);
}

logDebug("A iniciar... se não vires o banner, o OBS pode estar a bloquear ou o URL está errado.");
start();
