import coinStringToNumber from "./coinStringToNumber.js";
import stringToDate from "./stringToDate.js";

declare global {
    type TransacaoPagamento = "Cartão de Crédito" | "Boleto";
    type TransacaoStatus = "Paga" | "Recusada pela operadora de cartão" | "Aguardando pagamento" | "Estornada";

    interface TransactionOld {
        ["Cliente Novo"]: number;
        Data: string;
        Email: string;
        ["Forma de Pagamento"]: TransacaoPagamento;
        ID: number;
        Nome: string;
        Status: TransacaoStatus;
        ["Valor (R$)"]: string;
    }

    interface TransactionNew {
        new: Boolean;
        date: Date;
        email: string;
        payment: string;
        id: number;
        name: string;
        status: string;
        value: number | null;
        coin: string;
    }
}

const normalizeData = (data: TransactionOld): TransactionNew => {
    return {
        new: Boolean(data["Cliente Novo"]),
        date: stringToDate(data.Data),
        email: data.Email,
        payment: data["Forma de Pagamento"],
        id: data.ID,
        name: data.Nome,
        status: data.Status,
        value: coinStringToNumber(data["Valor (R$)"]),
        coin: data["Valor (R$)"]
    }
}

export default normalizeData