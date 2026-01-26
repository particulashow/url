const params = new URLSearchParams(window.location.search);

/* ===============================
   helpers
================================ */
const pick = (...keys) => {
  for (const k of keys){
    const v = params.get(k);
    if (v && v.trim() !== "") return v.trim();
  }
  return "";
};

const safeHex = (v) =>
  /^#[0-9a-fA-F]{6}$/.test(v || "") ? v : "";

/* ===============================
   TEXT (aliases)
================================ */
const title = pick("title","t","headline","label","text") || "Vai ao site";
const url   = pick("url","link","href") || "https://teusite.com";

document.getElementById("title").textContent = title;
document.getElementById("url").textContent = url;

/* ===============================
   CORES (aliases)
================================ */
const accent = safeHex(pick("accent","primary","color","main"));
const bg     = safeHex(pick("bg","background","backgroundColor"));
const text   = safeHex(pick("textColor","text","fg","font"));

if (accent) document.documentElement.style.setProperty("--accent", accent);
if (bg)     document.documentElement.style.setProperty("--bg", bg);
if (text)   document.documentElement.style.setProperty("--text", text);
