import Ex, { IExchange } from '../model/exchange.model'

export const getExchange = async (source: string, change: string) => {
    const ex = await Ex.findOne({ sourceCurr: source, changeCurr: change })
    return await ex
}

export const createExchange = async (data: IExchange) => {
    const ex = new Ex({
        sourceCurr: data.sourceCurr,
        changeCurr: data.changeCurr,
        rate: data.rate
    })

    return await ex.save()
}

export const updateEx = async (data: IExchange) => {
    
    const ex = await Ex.findOneAndUpdate({sourceCurr: data.sourceCurr, changeCurr: data.changeCurr}, {rate: data.rate}, {new: true})

    return await ex
}