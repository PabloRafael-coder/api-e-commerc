import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';
class ProductController {
    async store(request, response) {

        try {
            await Yup.object().shape({
                name: Yup.string().required(),
                price: Yup.number().required(),
                category_id: Yup.number().required(),
                offer: Yup.boolean(),
            }).validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }


        const { name, price, category_id, offer } = request.body;
        const { filename: path } = request.file;


        const { admin: isAdmin } = await User.findByPk(request.UserId)

        if (!isAdmin) {
            return response.status(401).json()
        }


        const product = await Product.create({
            name,
            price,
            category_id,
            path,
            offer,
        });


        return response.json(product);
    }

    async index(request, response) {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]


        })


        return response.json(products)


    }

    async update(request, response) {

        try {
            await Yup.object().shape({
                name: Yup.string(),
                price: Yup.number(),
                category_id: Yup.number(),
                offer: Yup.boolean(),
            }).validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { id } = request.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return response.status(401).json({ error: 'Make sure your ID is correct' })
        }

        let path
        if (request.file) {
            path = request.file.filename
        }


        const { name, price, category_id, offer } = request.body;

        const { admin: isAdmin } = await User.findByPk(request.UserId)

        if (!isAdmin) {
            return response.status(401).json()
        }


        await Product.update({
            name,
            price,
            category_id,
            path,
            offer,
        },
            {
                where: { id }
            });




        return response.status(200).json();
    }
};


export default new ProductController(); 