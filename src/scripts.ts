import fillStatistics from "./statistics.js";
import { fetchData } from "./fetchData.js";
import normalizeData from "./normalizeData.js";
import { CountPayment } from "./countBy.js";

const handleData = async () => {
    const data = await fetchData<TransactionOld[]>('https://api.origamid.dev/json/transacoes.json?')

    if (!data) return
    const newObject = data.map(normalizeData);

    fillTable(newObject)
    handleFillStatistics(newObject)
}

//functions that not return anything, do return type like a :void
const fillTable = (TransactionsNew: TransactionNew[]): void => {

    const table = document.querySelector('#transactions tbody')
    if (!table) return

    TransactionsNew.forEach((transaction) => {
        table.innerHTML += `
            <tr>
                <td>${transaction.name}</td>
                <td>${transaction.email}</td>
                <td>${transaction.coin}</td>
                <td>${transaction.payment}</td>
                <td>${transaction.status}</td>
            </tr>
        `
    })
}

const fillList = (list: CountPayment, containerId: string): void => {
    const containerElement = document.querySelector<HTMLElement>(containerId);

    if (containerElement) {
        Object.keys(list).forEach((key) => {
            containerElement.innerHTML += `<p>${key}: ${list[key]}</p>`
        })
    }

}

const handleFillStatistics = (transactionsNew: TransactionNew[]): void => {
    const data = new fillStatistics(transactionsNew)

    fillList(data.payments, '#payments')
    fillList(data.status, '#status')

    const dayElement = document.querySelector<HTMLElement>('#day span');
    if (dayElement) {
        dayElement.innerText = data.day[0]
    }

    const totalElement = document.querySelector<HTMLElement>('#total span');
    if (totalElement) {
        totalElement.innerText = data.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
    data.payments
}

handleData()