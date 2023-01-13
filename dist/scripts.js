import fillStatistics from "./statistics.js";
import { fetchData } from "./fetchData.js";
import normalizeData from "./normalizeData.js";
const handleData = async () => {
    const data = await fetchData('https://api.origamid.dev/json/transacoes.json?');
    if (!data)
        return;
    const newObject = data.map(normalizeData);
    fillTable(newObject);
    handleFillStatistics(newObject);
};
const fillTable = (TransactionsNew) => {
    const table = document.querySelector('#transactions tbody');
    if (!table)
        return;
    TransactionsNew.forEach((transaction) => {
        table.innerHTML += `
            <tr>
                <td>${transaction.name}</td>
                <td>${transaction.email}</td>
                <td>${transaction.coin}</td>
                <td>${transaction.payment}</td>
                <td>${transaction.status}</td>
            </tr>
        `;
    });
};
const fillList = (list, containerId) => {
    const containerElement = document.querySelector(containerId);
    if (containerElement) {
        Object.keys(list).forEach((key) => {
            containerElement.innerHTML += `<p>${key}: ${list[key]}</p>`;
        });
    }
};
const handleFillStatistics = (transactionsNew) => {
    const data = new fillStatistics(transactionsNew);
    fillList(data.payments, '#payments');
    fillList(data.status, '#status');
    const dayElement = document.querySelector('#day span');
    if (dayElement) {
        dayElement.innerText = data.day[0];
    }
    const totalElement = document.querySelector('#total span');
    if (totalElement) {
        totalElement.innerText = data.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }
    data.payments;
};
handleData();
//# sourceMappingURL=scripts.js.map