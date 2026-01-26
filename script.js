const params = new URLSearchParams(window.location.search);

/* helpers */
const pick = (...keys) => {
  for (const k of keys){
    const v = params.get(k);
    if (v && v.trim() !== "") return v.trim();
  }
  return "";
};

const safeHex = (v) =>
  /^#[0-9a-fA-F]{6}$/.test(v || "") ? v : "";

/* TEXT */
const title = pick("title","t","headline","label","text") || "Vai ao site";
const url   = pick("url","link","href") || "https://teusite.com";

document.getElementById("title").textContent = title;
document.getElementById("url").textContent = url;

/* CORES */
const accent = safeHex(pick("accent","primary","color","main"));
const bg     = safeHex(pick("bg","background","backgroundColor"));
const text   = safeHex(pick("textColor","text","fg","font"));

if (accent) document.documentElement.style.setProperty("--accent", accent);
if (bg)     document.documentElement.style.setProperty("--bg", bg);
if (text)   document.documentElement.style.setProperty("--text", text);

/* ICON LOGIC */
const iconEl = document.getElementById("icon");

function detectIcon(u){
  const s = u.toLowerCase();
  if (s.includes("youtube.com") || s.includes("youtu.be")) return "▶️";
  if (s.includes("instagram.com")) return "📸";
  if (s.includes("spotify.com")) return "🎧";
  if (s.includes("linkedin.com")) return "💼";
  if (s.includes("facebook.com")) return "📘";
  if (s.includes("tiktok.com")) return "🎵";
  if (s.includes("twitter.com") || s.includes("x.com")) return "🐦";
  if (s.includes("github.com")) return "💻";
  return "🌐";
}

iconEl.textContent = detectIcon(url);
