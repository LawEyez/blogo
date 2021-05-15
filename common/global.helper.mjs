import crypto from 'crypto'

export const isEmpty = val => {
    return (
        val === null ||
        val === undefined ||
        (typeof val === 'object' && Object.keys(val).length === 0) ||
        (typeof val === 'string' && val.trim().length === 0)
    )
}

export const hash = (salt='', str) => {
    isEmpty(salt) ? salt = crypto.randomBytes(16).toString('base64') : null
    const hash = crypto.createHmac('sha512', salt).update(str).digest('base64')

    return {
        hashedPassword: `${salt}$${hash}`,
        hash,
        salt
    }
}

export const cleaned = user => {
    const { password, __v, permissionLevel, ...cleanedUser } = {...user._doc}
    return cleanedUser
}