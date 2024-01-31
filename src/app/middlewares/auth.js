import jwt from 'jsonwebtoken';
import authConfiguration from '../../config/auth'

export default (request, response, next) => {
    const authToken = request.headers.authorization

    const token = authToken.split(' ')[1]

    try {
        jwt.verify(token, authConfiguration.secretKey, function (err, decoded) {

            if (err) {
                throw new Error()
            }

            request.UserId = decoded.id

        })

        return next()

    } catch (error) {
        return response.status(401).json({ error: 'Token is invalid' })
    }


}