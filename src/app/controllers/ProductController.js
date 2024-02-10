import * as Yup from 'yup';
import Product from '../models/Product'
import Category from '../models/Category';
import User from '../models/User'
class ProductController {
    async store(request, response) {

        try {
            await Yup.object().shape({
                name: Yup.string().required(),
                price: Yup.number().required(),
                category_id: Yup.number().required(),
            }).validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        
        const { name, price, category_id } = request.body;
        const { filename: path } = request.file;
        

        const { admin: isAdmin } = await User.findByPk(request.UserId)

        if(!isAdmin) {
            return response.status(401).json()
        }


        const product = await Product.create({
            name,
            price,
            category_id,
            path
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
};


export default new ProductController(); 