import { signJwt, verifyJwt } from '../util/jwt.util'
import express, {Request, Response} from 'express'
import { IUser } from '../model/user.model'
import { compare, createUser, getUserEmail, hash, tranfer } from '../service/user.service'
import { createWallet, getWalletId, getWalletUserId } from '../service/wallet.service'

export const userLogin = async (req: Request, res: Response) => {
    
    const {email, password}: IUser = req.body

    const user = await getUserEmail(email)

    if(!user){
        return res.send("Please Register") 
    }

    const isValid = compare(password, user.password)

    if(!isValid){
        res.send("Invalid Credentials") 
    }

    const token = signJwt({userId: user.id, userEmail: user.email}, "5m")

    // res.set('x-auth', token)

    res.send(token)

}

export const userRegister = async (req: Request, res: Response) => {
    // Input
    const input: IUser = req.body

    // Validate

    // check
    const user = await getUserEmail(input.email)

    if(!user){
        const hashed = await hash(input.password)
        input.password = hashed
        const user = await createUser(input)
        return res.send("User is created")
    }else{
        return res.send("User Exist")
    }

}

export const me = async (req: Request, res: Response) => {
    //@ts-ignore
    const user = await getUserEmail(req.user.userEmail)

    res.send(user)
}

export const makeWallet = async (req: Request, res: Response) => {
    
    const currency: string = req.body.currency

    //@ts-ignore
    const wallet = await createWallet(req.user.userId, '0', currency)
    await wallet.populate([{path: 'user_id', model: 'User'}, {path: 'currency_id', model: 'Currency'}])
    
    res.json({ 
        "wallet_id": wallet.id,
        "userOwn": (wallet as any).user_id.username,
        "balance": wallet.balance,
        "currency_rate": (wallet as any).currency_id.abbreviation
    })
}

export const myWallet = async (req: Request, res: Response) => {
    //@ts-ignore
    const wallet = await getWalletUserId(req.user.userId)
    await wallet?.populate([{path: 'user_id', model: 'User'}, {path: 'currency_id', model: 'Currency'}])

    res.json({ 
        "wallet_id": wallet?.id,
        "userOwn": (wallet as any).user_id.username,
        "balance": wallet?.balance,
        "currency_rate": (wallet as any).currency_id.abbreviation
    })
}

export const tranferCoin = async (req: Request, res: Response) => {
    
    const {tranfer_to, amount} = req.body

    //@ts-ignore
    const payload = await tranfer(req.user.userId, tranfer_to, amount)

    const w1 = await getWalletId(payload.gid)
    await w1?.populate([{path: 'user_id', model: 'User'}, {path: 'currency_id', model: 'Currency'}])
    const w2 = await getWalletId(payload.rid)
    await w2?.populate([{path: 'user_id', model: 'User'}, {path: 'currency_id', model: 'Currency'}])
    

    res.json({
        "sender_balance": `${w1?.balance} ${(w1 as any)?.currency_id.abbreviation}`,
        "reciever_balance": `${w2?.balance} ${(w2 as any)?.currency_id.abbreviation}`,
        "msg1": `${(w2 as any)?.user_id.username} recieve ${payload.amount} ${(w2 as any)?.currency_id.abbreviation} from ${(w1 as any)?.user_id.username}`
    })


}