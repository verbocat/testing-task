// Every src/locales/<code>.json present at build time is a language of the app: en.json is the source;
// hi.json (or any other) is picked up when it exists, and missing keys fall back to English.
const files = import.meta.glob("./locales/*.json", { eager: true, import: "default" });

export const SOURCE = "en";
export const translations = Object.fromEntries(
  Object.entries(files).map(([path, data]) => [path.match(/([\w-]+)\.json$/)[1], data]),
);
export const languages = Object.keys(translations).sort((a, b) =>
  a === SOURCE ? -1 : b === SOURCE ? 1 : a.localeCompare(b),
);

const NAMES = {
  en: "English", hi: "हिन्दी", af: "Afrikaans", de: "Deutsch", fr: "Français", es: "Español", ar: "العربية",
  bn: "বাংলা", gu: "ગુજરાતી", mr: "मराठी", ta: "தமிழ்", te: "తెలుగు", ja: "日本語", zh: "中文", ru: "Русский",
};
export const languageName = (code) => NAMES[code] || code;

const RTL = ["ar", "ur", "he", "fa"];
export const isRtl = (code) => RTL.includes(code.split("-")[0]);

const STORAGE_KEY = "taskflow.lang";

// ?lang=hi (also lng / locale), then the saved choice, then the browser language, then English
export function initialLanguage() {
  const q = new URLSearchParams(window.location.search);
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch { /* private mode */ }
  const wanted = [q.get("lang"), q.get("lng"), q.get("locale"), saved, navigator.language, navigator.language?.split("-")[0]];
  return wanted.find((c) => c && translations[c]) || SOURCE;
}

export function saveLanguage(code) {
  try { localStorage.setItem(STORAGE_KEY, code); } catch { /* private mode */ }
  const url = new URL(window.location.href);
  url.searchParams.set("lang", code);
  window.history.replaceState(null, "", url);
}

const get = (obj, path) => path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);

export function translator(lang) {
  return (key, args) => {
    const text = get(translations[lang], key) ?? get(translations[SOURCE], key) ?? key;
    return String(text).replace(/\{(\w+)\}/g, (m, k) => (args && args[k] !== undefined ? args[k] : m));
  };
}
