import * as Yup from 'yup';
import Product from '../models/Product'

class ProductController {
    async store(request, response) {

        const { name, price, category } = request.body;
        const { filename: path } = request.file;

        try {
            await Yup.object().shape({
                name: Yup.string().required(),
                price: Yup.number().required(),
                category: Yup.string().required(),
            }).validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }


        const product = await Product.create({
            name,
            price,
            category,
            path
        });


        return response.json(product);
    }

    async index (request, response) {
        const products = await Product.findAll()

        return response.json(products)
    }
};


export default new ProductController(); 