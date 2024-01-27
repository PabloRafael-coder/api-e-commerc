import { v4 } from 'uuid';
import User from '../models/User';
import * as Yup from 'yup'

class UserController {
    async store(request, response) {

        const { name, email, password, admin } = request.body;


        try {
            await Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required().min(6),
                admin: Yup.boolean()
            }).validateSync(request.body, { abortEarly: false })
        } catch (error) {
            return response.status(400).json({ error: error.errors })
        }


        const userExists = await User.findOne({
            where: { email }
        })

        if (userExists) {
            return response.status(400).json({ error: "Email already exists" })
        }

        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin,
        });
        return response.json(user);
    }
}

export default new UserController()
