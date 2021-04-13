import jwt from 'jsonwebtoken'
import _ from 'dotenv'

_.config()

export const validTokenNeeded = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        
        if (!authHeader) {
            return res.status(401).json({ msg: 'Unauthorized action!. No access token found.' })
        }

        const authInfo = authHeader.split(' ')

        if (authInfo[0] !== 'Bearer' || !authInfo[1] || authInfo[1] === '') {
            return res.status(401).json({ msg: 'Invalid access token!.'})
        }

        req.user = jwt.verify(authInfo[1], process.env.JWT_SECRET)
        
        next()

    } catch (err) {
        res.status(500).json(err)
    }
}

