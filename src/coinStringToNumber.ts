/**
 * 
 * @param coin 
 * @obs Recieve string like '1.200,00' and return '1200,00' 
 */

const coinStringToNumber = (coin: string): number | null => {

    const myNumber = Number(coin.replaceAll('.', '').replace(',', '.'));

    return isNaN(myNumber) ? null : myNumber

}

export default coinStringToNumber
