const coinStringToNumber = (coin) => {
    const myNumber = Number(coin.replaceAll('.', '').replace(',', '.'));
    return isNaN(myNumber) ? null : myNumber;
};
export default coinStringToNumber;
//# sourceMappingURL=coinStringToNumber.js.map