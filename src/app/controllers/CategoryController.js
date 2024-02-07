import * as Yup from 'yup';

import Category from '../models/Category';


class CategoryController {
    async store(request, response) {


        try {
            await Yup.object().shape({
                name: Yup.string().required()
            }).validateSync(request.body, { abortEarly: false })

        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { name } = request.body


        const categoryExist = await Category.findOne({
            where: {
                name,
            },
        })

        if (categoryExist) {
            return response.status(400).json({ error: 'Category already exists' })
        }

        const { id } = await Category.create({ name })

        return response.json({ id, name })


    }

    async index(request, response) {
        const category = await Category.findAll()

        return response.json(category)

    }
}

export default new CategoryController()