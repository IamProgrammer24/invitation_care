const WEEKDAY_COLOURS = [
  { en: "Orange", hi: "नारंगी", hex: "#f28c28" },
  { en: "White", hi: "सफेद", hex: "#ffffff" },
  { en: "Red", hi: "लाल", hex: "#d32f2f" },
  { en: "Blue", hi: "नीला", hex: "#1f4fa3" },
  { en: "Yellow", hi: "पीला", hex: "#f6c90e" },
  { en: "Green", hi: "हरा", hex: "#2e7d32" },
  { en: "Grey", hi: "स्लेटी", hex: "#8a8a8a" },
];

export function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getNights(startDate) {
  const start = parseDate(startDate);
  return Array.from({ length: 9 }, (_, i) => {
    const date = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + i,
    );
    return { day: i + 1, date, ...WEEKDAY_COLOURS[date.getDay()] };
  });
}
