/* =====================================================
   CONFIGURACIÓN GENERAL – TARIFARIO UNH
   ===================================================== */

/* 📌 URL DEL CSV (Google Sheets publicado) */
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQtYCSC4BZp4eeQcoR8ZtNcuuD80lGAEDt0mrbJJqc6iKefbu5G1zxFmRpk4gByjZy5ZrZBHTddKkFP/pub?output=csv";

/* 📄 PAGINACIÓN */
const ITEMS_PER_PAGE = 20;

/* 💰 CONFIGURACIÓN DE COMISIONES POR CANAL */
const COMISIONES = {
  caja_unh: (monto) => (monto >= 20 ? 1.0 : 0),
  bn_fijo: () => 1.8,
  bn_pct: (monto) => monto * 0.0125,
  caja_huancayo: () => 1.0,
  niubiz: (monto) => monto * 0.058,
};

/* 🆓 FILTRO ESPECIAL */
const MONTO_GRATUITO = 0;

/* 📑 EXPORTACIÓN PDF */
const PDF_CONFIG = {
  fileNameBase: "Tarifario_TUPA_TUSNE",
  title: "Tarifario TUPA / TUSNE – UNH",
};

/* 🕒 FORMATO FECHA/HORA */
function obtenerFechaHora() {
  const now = new Date();
  return now.toLocaleString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* 🧾 NORMALIZADOR DE TEXTO */
function normalizeText(text) {
  return text
    ? text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()
    : "";
}
