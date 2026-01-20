/* =========================================================
   script.js — FASE 1
   Carga y validación del CSV (Google Sheets)
   ========================================================= */

// Verificar que config.js esté cargado
if (typeof SHEET_CSV_URL === "undefined") {
  console.error("❌ ERROR: SHEET_CSV_URL no está definido. Revisa config.js");
} else {
  console.log("✅ config.js cargado correctamente");
  console.log("CSV URL:", SHEET_CSV_URL);
}

// Columnas esperadas (CANÓNICAS)
const REQUIRED_COLUMNS = [
  "origen",
  "unidad",
  "cxc",
  "area",
  "proceso",
  "tarifa",
  "monto",
  "requisitos",
  "correo",
  "celular"
];

// Utilidad: normalizar encabezados
function normalizeHeader(text) {
  return text
    .toString()
    .toLowerCase()
    .trim();
}

// Cargar CSV
function loadCSV() {
  if (typeof Papa === "undefined") {
    console.error("❌ ERROR: PapaParse no está cargado");
    return;
  }

  console.log("📥 Descargando CSV...");

  Papa.parse(SHEET_CSV_URL, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (result) {
      console.log("📦 CSV descargado");
      console.log("Filas crudas:", result.data.length);

      if (!result.meta || !result.meta.fields) {
        console.error("❌ ERROR: No se pudieron leer los encabezados del CSV");
        return;
      }

      // Normalizar encabezados reales
      const headers = result.meta.fields.map(normalizeHeader);

      console.log("📑 Encabezados detectados:", headers);

      // Validar columnas obligatorias
      const missing = REQUIRED_COLUMNS.filter(col => !headers.includes(col));

      if (missing.length > 0) {
        console.error("❌ ERROR: Faltan columnas obligatorias:");
        missing.forEach(col => console.error("   -", col));
        return;
      }

      console.log("✅ Todas las columnas obligatorias están presentes");

      // Validar que haya datos útiles
      const validRows = result.data.filter(row =>
        row.proceso || row.tarifa
      );

      if (validRows.length === 0) {
        console.error("❌ ERROR: No se encontraron filas válidas");
        return;
      }

      console.log("✅ Registros válidos cargados:", validRows.length);
      console.log("🔎 Ejemplo de fila:", validRows[0]);

      console.log("🎉 FASE 1 COMPLETADA CON ÉXITO");
    },
    error: function (err) {
      console.error("❌ ERROR al descargar o procesar el CSV:", err);
    }
  });
}

// Ejecutar
loadCSV();
