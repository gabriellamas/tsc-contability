import countBy from "./countBy.js"

type TransactionNewWithValueNumber = TransactionNew & { value: number }

const filterValue = (transaction: TransactionNew): transaction is TransactionNewWithValueNumber => {
    return transaction.value !== null
}

class fillStatistics {
    private transactions: TransactionNew[]
    total
    payments
    status
    week
    day
    constructor(transactions: TransactionNew[]) {
        this.transactions = transactions
        this.total = this.setTotal()
        this.payments = this.paymentsType()
        this.status = this.setStatus()
        this.week = this.bestWeek()
        this.day = this.bestDay()
    }

    private setTotal() {
        // 0 is a false value, maybe we need to use 0 to sum something, because of this I needed to use "!== null" verification
        return this.transactions.filter(filterValue).reduce((acccumulator, item) => { return acccumulator + item.value }, 0)

    }

    //Verify how many times a string is inside an array
    private paymentsType() {
        return countBy(this.transactions.map((element) => element.payment))
    }

    private setStatus() {
        return countBy(this.transactions.map((element) => element.status))
    }

    private bestWeek() {

        const week = {
            ['Domingo']: 0,
            ['Segunda']: 0,
            ['Terça']: 0,
            ['Quarta']: 0,
            ['Quinta']: 0,
            ['Sexta']: 0,
            ['Sábado']: 0,
        }


        for (let i = 0; i < this.transactions.length; i++) {
            const day = this.transactions[i].date.getDay()
            if (day === 0) week['Domingo'] += 1
            if (day === 1) week['Segunda'] += 1
            if (day === 2) week['Terça'] += 1
            if (day === 3) week['Quarta'] += 1
            if (day === 4) week['Quinta'] += 1
            if (day === 5) week['Sexta'] += 1
            if (day === 6) week['Sábado'] += 1
        }

        return week
    }

    private bestDay() {
        return Object.entries(this.week).sort((a, b) => b[1] - a[1])[0]
    }

}


export default fillStatistics




//Arrow function version:
