const params = new URLSearchParams(window.location.search);

// Config via URL
const urlText = params.get("url") || "particulainfluente.pt";
const headlineText = params.get("headline") || "Visita o website";
const intervalSec = Number(params.get("interval") || 45); // de quanto em quanto tempo aparece
const showSec = Number(params.get("show") || 8);          // quanto tempo fica visível

const banner = document.getElementById("banner");
const urlEl = document.getElementById("url");
const headlineEl = document.getElementById("headline");
const fill = document.querySelector(".barFill");

urlEl.textContent = urlText;
headlineEl.textContent = headlineText;

let timer;

function animateBar(durationMs){
  fill.style.transition = "none";
  fill.style.width = "0%";
  requestAnimationFrame(() => {
    fill.style.transition = `width ${durationMs}ms linear`;
    fill.style.width = "100%";
  });
}

function showBanner(){
  banner.classList.remove("hide");
  banner.classList.add("show");

  const durationMs = showSec * 1000;
  animateBar(durationMs);

  clearTimeout(timer);
  timer = setTimeout(() => {
    banner.classList.remove("show");
    banner.classList.add("hide");
  }, durationMs);
}

// começa e repete
showBanner();
setInterval(showBanner, intervalSec * 1000);

