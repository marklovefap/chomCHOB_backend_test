import { inOrdeCurTotal, updateCurTotal } from "./currency.service"
import { getWalletUserName } from "./wallet.service"

export const setBalance = async (username: string, amount: number) => {
    const wallet = await getWalletUserName(username)
    await wallet?.updateOne({ $set:{ balance: amount } })
    await updateCurTotal(wallet?.currency_id, amount)
    return await wallet?.id
}

export const increaseOrdecreaseBalance = async (username: string, amount: number) => {
    const wallet = await getWalletUserName(username)
    await wallet?.updateOne({ $inc:{ balance: amount } })
    await inOrdeCurTotal(wallet?.currency_id, amount)
    return await wallet?.id
}