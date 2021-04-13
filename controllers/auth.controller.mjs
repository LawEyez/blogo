import jwt from 'jsonwebtoken'
import _ from 'dotenv'
import { hash } from '../common/global.helper.mjs'

_.config()

const jwt_secret = process.env.JWT_SECRET

export const login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwt_secret
        const { salt, hash: _hash } = hash(null, refreshId)
        req.body.refreshKey = salt
        
        let token = jwt.sign(req.body, jwt_secret)
        let b = Buffer.from(_hash)
        let refresh_token = b.toString('base64')

        res.status(201).json({ accessToken: token, refreshToken: refresh_token, userId: req.body.userId })
        
    } catch (err) {
        res.status(500).json({err})
    }
}