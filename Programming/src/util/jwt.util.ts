import jwt from 'jsonwebtoken'

export const signJwt = (payload: object, expireIn: string | number) => {
    return jwt.sign(payload, process.env.KEY as string, {expiresIn: expireIn})
}

export const verifyJwt = (token: string) => {
    return jwt.verify(token, process.env.KEY as string)
}