import fetchData from "./fetchData.js";
import normalizeTransaction from "./normalizeTransaction.js";
import Statistics from "./Statistics.js";
import { CountList } from "./countBy.js";

async function handleData() {
  const data = await fetchData<TransactionAPI[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );
  if (!data) return;

  const transactions = data.map(normalizeTransaction);
  fillTable(transactions);
  fillStatistics(transactions);
}
handleData();

function fillList(list: CountList, containerId: string): void {
  const containerElement = document.getElementById(containerId);
  if (containerElement) {
    Object.keys(list).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${list[key]}</p>`;
    });
  }
}

function fillStatistics(transacoes: Transaction[]): void {
  const data = new Statistics(transacoes);

  const totalElement = document.querySelector<HTMLElement>("#total span");
  if (totalElement) {
    totalElement.innerText = data.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  fillList(data.payment, "payment");
  fillList(data.status, "status");

  const dayElement = document.querySelector<HTMLElement>("#day span");
  if (dayElement) {
    dayElement.innerText = data.bestDay[0];
  }
}

function fillTable(transactions: Transaction[]): void {
  const tabela = document.querySelector("#transactions tbody");
  if (!tabela) return;
  transactions.forEach((transaction) => {
    tabela.innerHTML += `
      <tr>
        <td>${transaction.name}</td>
        <td>${transaction.email}</td>
        <td>R$ ${transaction.currency}</td>
        <td>${transaction.payment}</td>
        <td>${transaction.status}</td>
      </tr>
    `;
  });
}
