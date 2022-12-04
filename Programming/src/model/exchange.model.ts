import mongoose from "mongoose";

export interface IExchange {
    sourceCurr: string,
    changeCurr: string,
    rate: number
}

const exchangeSchema = new mongoose.Schema<IExchange>({
    sourceCurr: {type: String, required: true},
    changeCurr: {type: String, required: true},
    rate: {type: Number, required: true}
})

export default mongoose.model<IExchange>('Exchange', exchangeSchema)

