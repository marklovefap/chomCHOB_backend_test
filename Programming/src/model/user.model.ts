import mongoose from "mongoose";

export interface IUser {
    username: string,
    email: string,
    password: string,
    role: string
}

const userSchema = new mongoose.Schema<IUser>({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
})

export default mongoose.model<IUser>('User', userSchema)

