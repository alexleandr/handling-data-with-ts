import countBy from "./countBy.js";

type TransactionValue = Transaction & { value: number };

function filterValue(
  transaction: Transaction
): transaction is TransactionValue {
  return transaction.value !== null;
}

export default class Statistics {
  private transactions;
  total;
  payment;
  status;
  week;
  bestDay;
  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
    this.total = this.setTotal();
    this.payment = this.setPayment();
    this.status = this.setStatus();
    this.week = this.setWeek();
    this.bestDay = this.setBestDay();
  }
  private setTotal() {
    return this.transactions.filter(filterValue).reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);
  }
  private setPayment() {
    return countBy(this.transactions.map(({ payment }) => payment));
  }
  private setStatus() {
    return countBy(this.transactions.map(({ status }) => status));
  }
  private setWeek() {
    const week = {
      ["Domingo"]: 0,
      ["Segunda"]: 0,
      ["Terça"]: 0,
      ["Quarta"]: 0,
      ["Quinta"]: 0,
      ["Sexta"]: 0,
      ["Sábado"]: 0,
    };

    for (let i = 0; i < this.transactions.length; i++) {
      const day = this.transactions[i].date.getDay();
      if (day === 0) week["Domingo"] += 1;
      if (day === 1) week["Segunda"] += 1;
      if (day === 2) week["Terça"] += 1;
      if (day === 3) week["Quarta"] += 1;
      if (day === 4) week["Quinta"] += 1;
      if (day === 5) week["Sexta"] += 1;
      if (day === 6) week["Sábado"] += 1;
    }

    return week;
  }
  private setBestDay() {
    return Object.entries(this.week).sort((x, y) => {
      return y[1] - x[1];
    })[0];
  }
}
