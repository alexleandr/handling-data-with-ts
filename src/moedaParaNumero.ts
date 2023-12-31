/**
 * Recebe string e retorna number: "1.200,50" -> 1200.50
 */
export default function moedaParaNumero(moeda: string): number | null {
  const numero = Number(moeda.replaceAll(".", "").replace(",", "."));

  if (isNaN(numero)) return null;
  else return numero;
}
