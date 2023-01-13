import coinStringToNumber from "./coinStringToNumber.js";
import stringToDate from "./stringToDate.js";
const normalizeData = (data) => {
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
    };
};
export default normalizeData;
//# sourceMappingURL=normalizeData.js.map