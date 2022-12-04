import mongoose from "mongoose";

export interface ICurrency {
    name: string,
    abbreviation: string,
    total: number
}

const currencySchema = new mongoose.Schema<ICurrency>({
    name: {type: String, required: true},
    abbreviation: {type: String, required: true},
    total: {type: Number, required: true}
})

export default mongoose.model<ICurrency>('Currency', currencySchema)

