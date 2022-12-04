import Wallet from '../model/wallet.model'
import { getCurrencyAbb } from './currency.service'
import { getUserName } from './user.service'

export const createWallet = async (userId: string, balance: string, curr: string) => {
    
    // const user = await getUserId(userId)
    const currency = await getCurrencyAbb(curr)
    
    const wallet = new Wallet({
        user_id: userId,
        balance: '0',
        currency_id: currency?.id
    })

    return await wallet.save()
}

export const getWalletUserId = async (userId: string) => {
    
    return await Wallet.findOne({ user_id: userId })
}

export const getWalletCurrencyId = async (id: string) => {
    
    return await Wallet.find({ user_id: id })
}

export const getWalletUserName = async (username: string) => {
    
    const user = await getUserName(username)
    
    return await Wallet.findOne({ user_id: user?.id })
}

export const getWalletId = async (userId: string) => {
    
    return await Wallet.findById(userId)
}
