import mongoose from "mongoose";

export interface IWallet {
    user_id?: mongoose.Types.ObjectId,
    balance: number,
    currency_id?: mongoose.Types.ObjectId
}

const walletSchema = new mongoose.Schema<IWallet>({
    user_id: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    balance: {type: Number, required: true},
    currency_id: {type: mongoose.Types.ObjectId, ref: 'Currency', required: true}

})

export default mongoose.model<IWallet>('Wallet', walletSchema)


