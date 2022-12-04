import { Request, Response } from "express"
import { ICurrency } from "../model/currency.model"
import { IExchange } from "../model/exchange.model"
import { increaseOrdecreaseBalance, setBalance } from "../service/admin.service"
import { addCurrency, getAllCurrency, getCurrency } from "../service/currency.service"
import { createExchange, updateEx } from "../service/exchange.service"
import { getWalletId } from "../service/wallet.service"

export const addCrypto = async (req: Request, res: Response) => {
    
    const {name, abbreviation}: ICurrency = req.body

    const add = await addCurrency(name, abbreviation)

    res.send(add)
}

export const updateBalance = async (req :Request, res: Response) => {
    
    const {username, amount} = req.body

    const wallet_id = await setBalance(username, amount)
    const wallet = await getWalletId(wallet_id)
    await wallet?.populate([{path: 'user_id', model: 'User'}, {path: 'currency_id', model: 'Currency'}])

    res.json({ 
        "wallet_id": wallet?.id,
        "userOwn": (wallet as any).user_id.username,
        "updated balance": wallet?.balance,
        "currency_rate": (wallet as any).currency_id.abbreviation
    })

}

export const plusOrminusBalance = async (req :Request, res: Response) => {
    
    const {username, amount} = req.body

    const wallet_id = await increaseOrdecreaseBalance(username, amount)
    const wallet = await getWalletId(wallet_id)
    await wallet?.populate([{path: 'user_id', model: 'User'}, {path: 'currency_id', model: 'Currency'}])

    res.json({ 
        "wallet_id": wallet?.id,
        "userOwn": (wallet as any).user_id.username,
        "updated balance": wallet?.balance,
        "currency_rate": (wallet as any).currency_id.abbreviation
    })
}

export const coin = async (req: Request, res: Response) => {
    const coinName: string = req.body.coinName
    
    const coin = await getCurrency(coinName)

    res.send(coin)
}

export const allCoin = async (req: Request, res: Response) => {
    const coins = await getAllCurrency()

    res.send(coins)
}

export const makeExchange = async (req: Request, res: Response) => {
    const data: IExchange = req.body

    const ex = await createExchange(data)

    res.send(ex)
}
 
export const updateExchange = async (req: Request, res: Response) => {
    const data: IExchange = req.body

    const ex = await updateEx(data)

    res.send(ex)
}