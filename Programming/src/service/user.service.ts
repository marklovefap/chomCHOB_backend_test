import User, { IUser } from '../model/user.model'
import bcrypt from 'bcrypt'
import { getWalletUserId, getWalletUserName } from './wallet.service'
import { getExchange } from './exchange.service'
import { inOrdeCurTotal } from './currency.service'

export const compare = async (password: string, enPassword: string) => {
    const isValid = await bcrypt.compare(password, enPassword)
    return isValid
}

export const hash = async (password: string) => {
    const hashedP = await bcrypt.hash(password, 10)
    return hashedP
}

export const createUser = async (info: IUser) => {
    const user = new User({
        username: info.username,
        email: info.email,
        password: info.password,
        role: info.role
    })
    return await user.save()
}

export const getUserEmail = async (email: string) => {
    const user = await User.findOne({ email: email })
    return user
}

export const getUserId = async (id: string) => {
    return await User.findById(id)
}

export const getUserName = async (username: string) => {
    return await User.findOne({ username: username })
}

export const tranfer = async (giver: string, receiver: string, amount: number) => {
    
    const giverWallet = await getWalletUserId(giver)
    await giverWallet?.populate([{path: 'user_id', model: 'User'}, {path: 'currency_id', model: 'Currency'}])
    const receiverWallet = await getWalletUserName(receiver)
    await receiverWallet?.populate([{path: 'user_id', model: 'User'}, {path: 'currency_id', model: 'Currency'}])
    
    if((giverWallet as any).currency_id.abbreviation === (receiverWallet as any).currency_id.abbreviation){
        await giverWallet?.updateOne({ $inc:{ balance: -amount } })
        await receiverWallet?.updateOne({ $inc:{ balance: amount } })
        await inOrdeCurTotal(giverWallet?.currency_id, -amount)
        await inOrdeCurTotal(receiverWallet?.currency_id, amount)
        return {"gid": giverWallet?.id, "rid": receiverWallet?.id, "amount": amount}
    } else {
        const exchange = await getExchange((giverWallet as any).currency_id.abbreviation, (receiverWallet as any).currency_id.abbreviation)
        const rate = exchange?.rate as number
        const total = (amount * rate)
        await giverWallet?.updateOne({ $inc:{ balance: -amount } })
        await receiverWallet?.updateOne({ $inc:{ balance: total.toFixed(2) } })
        await inOrdeCurTotal(giverWallet?.currency_id, -amount)
        await inOrdeCurTotal(receiverWallet?.currency_id, Number(total.toFixed(2)))
        return {"gid": giverWallet?.id, "rid": receiverWallet?.id, "amount": total}
    }


}
