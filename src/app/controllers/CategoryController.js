import * as Yup from 'yup';

import Category from '../models/category';


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

        const category = await Category.create({ name })


        if(categoryExist){
            return response.status(400).json({error: 'Category already exists'})
        } else {
            return response.json(category)
        }

    }

    async index(request, response) {
        const category = await Category.findAll()

        return response.json(category)

    }
}

export default new CategoryController()