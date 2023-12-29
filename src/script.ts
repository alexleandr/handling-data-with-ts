import fetchData from "./fetchData.js";

type TransacaoPagamento = "Cartão de Crédito" | "Boleto";
type TransacaoStatus =
  | "Paga"
  | "Recusada pela operadora de cartão"
  | "Aguardando pagamento"
  | "Estornada";

interface TransacaoAPI {
  Nome: string;
  ID: number;
  Data: string;
  Status: TransacaoStatus;
  Email: string;
  ["Valor (R$)"]: string;
  ["Forma de Pagamento"]: TransacaoPagamento;
  ["Cliente Novo"]: number;
}

async function handleData() {
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json"
  );

  if (data) {
    data.forEach((item) => {
      console.log(item["Valor (R$)"]);
    });
  }

  console.log("Código continuou!");
}
handleData();
