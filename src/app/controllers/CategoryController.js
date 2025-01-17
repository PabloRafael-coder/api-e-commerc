import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User'


class CategoryController {
    async store(request, response) {


        try {
            await Yup.object().shape({
                name: Yup.string().required()
            }).validateSync(request.body, { abortEarly: false })

        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }
        const { admin: isAdmin } = await User.findByPk(request.UserId)

        if (!isAdmin) {
            return response.status(401).json()
        }

        const { name } = request.body
        const { filename: path } = request.file


        const categoryExist = await Category.findOne({
            where: {
                name,
            },
        })

        if (categoryExist) {
            return response.status(400).json({ error: 'Category already exists' })
        }

        const { id } = await Category.create({ name, path })

        return response.json({ id, name })


    }

    async index(request, response) {
        const category = await Category.findAll()
        return response.json(category)

    }

    async update(request, response) {
        try {
            await Yup.object().shape({
                name: Yup.string(),
            }).validateSync(request.body, { abortEarly: false })

        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }
        const { admin: isAdmin } = await User.findByPk(request.UserId)

        if (!isAdmin) {
            return response.status(401).json()
        }

        const { name } = request.body

        const { id } = request.params

        const category = await Category.findByPk(id)

        if (!category) {
            return response.status(401).json({ error: 'Make sure your ID is current' })
        }

        let path
        if (request.file) {
            path = request.file.filename
        }

        await Category.update({ name, path }, {where: {id}})

        return response.status(200).json({ id, name })
    }
}


export default new CategoryController()