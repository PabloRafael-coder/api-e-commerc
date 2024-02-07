import * as Yup from 'yup';
import jwt from 'jsonwebtoken'

import authConfiguration from '../../config/auth'
import User from '../models/User';

class SessionController {
    async store(request, response) {
        const { email, password } = request.body;

        try {
            await Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().required(),
            }).validate(request.body, { abortEarly: false });

            const user = await User.findOne({ where: { email } });

            if (!user || !(await user.checkPassword(password))) {
                return response.status(401).json({ error: 'Invalid email or password' });
            }

            return response.json({
                name: user.name,
                email,
                admin: user.admin,
                token: jwt.sign({ id: user.id, name: user.name }, authConfiguration.secretKey, {
                    expiresIn: authConfiguration.expiresIn
                })
            });

        } catch (error) {
            return response.status(400).json({ error: 'Validation failed', messages: error.inner });
        }
    }
}

export default new SessionController();
