import mongoose from 'mongoose'
import Cur, { ICurrency } from '../model/currency.model'
import { getWalletCurrencyId } from './wallet.service'

export const getCurrencyAbb = async (abb: string) => {
    const cur = await Cur.findOne({ abbreviation: abb })
    return cur
}

export const getCurrencyName = async (name: string) => {
    return await Cur.findOne({ name: name })
}

export const addCurrency = async (name: string, abb: string) => {
    const cur = new Cur({
        name: name,
        abbreviation: abb,
        total: 0
    })

    return await cur.save()
}

// export const getManyCurrency = async () => {
//     return await Cur.find({})
// }

export const getCurrency = async (name: string) => {
    return await Cur.findOne({ abbreviation: name })
}

export const getAllCurrency = async () => {
   return await Cur.find({})
}

export const updateCurTotal = async (current_id: mongoose.Types.ObjectId | undefined, amount: number) => {
    const cur = await Cur.findById(current_id)
    await cur?.updateOne({ $set:{ total: amount } })
}

export const inOrdeCurTotal = async (current_id: mongoose.Types.ObjectId | undefined, amount: number) => {
    const cur = await Cur.findById(current_id)
    await cur?.updateOne({ $inc:{ total: amount } })
}