/**
 * Receives string and returns number: "1.200,50" -> 1200.50
 */
export default function currencyToNumber(currency: string): number | null {
  const number = Number(currency.replaceAll(".", "").replace(",", "."));

  if (isNaN(number)) return null;
  else return number;
}
