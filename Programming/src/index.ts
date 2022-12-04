import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express, {Request, Response} from 'express'
import User, { IUser } from './model/user.model'
import Cur from './model/currency.model'
import Ex from './model/exchange.model'
import Wallet from './model/wallet.model'
import { makeWallet, me, myWallet, tranferCoin, userLogin, userRegister } from './controller/user.controller'
import { auth } from './middleware/auth'
import { admin } from './middleware/role'
import { addCrypto, allCoin, coin, makeExchange, plusOrminusBalance, updateBalance, updateExchange } from './controller/admin.controller'

dotenv.config()

async function bootStrap(){
    await mongoose.connect(process.env.MONGO_URL as string)
    await console.log("Database Connected")
    await startServer()
}

const startServer = () => {
    
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    app.post('/user/register', userRegister)
    app.post('/user/login', userLogin)
    app.get('/user/me', auth, me)
    app.post('/user/createWallet', auth, makeWallet)
    app.get('/user/myWallet', auth, myWallet)
    app.post('/user/tranfer', auth, tranferCoin)

    app.post('/admin/newCoin', auth, admin, addCrypto)
    app.post('/admin/updatedBalance', auth, admin, updateBalance)
    app.post('/admin/plusOrMinusBalance', auth, admin, plusOrminusBalance)
    app.post('/admin/createExchange', auth, admin, makeExchange),
    app.post('/admin/updateExchange', auth, admin, updateExchange)
    app.get('/admin/coin', auth, admin, coin)
    app.get('/admin/coins', auth, admin, allCoin)
 
    app.listen(process.env.PORT || 4000, () => {
        console.log('Server is running at port 4000')
    })
    
}

bootStrap()