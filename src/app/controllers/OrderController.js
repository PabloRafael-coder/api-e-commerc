
import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'

class OrderController {
    async store(request, response) {

        try {
            await Yup.object().shape({
                products: Yup.array().required().of(
                    Yup.object().shape({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                    })
                )
            }).validate(request.body, { abortEarly: false })
        } catch (error) {
            return response.status(400).json({ error: error.errors })
        }

        const productsId = request.body.products.map((product) => product.id)

        const updateProducts = await Product.findAll({
            where: {
                id: productsId
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        })


        const listedProducts = updateProducts.map((product) => {

            const indexProducts = request.body.products.findIndex((requestProducts) => requestProducts.id === product.id);

            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category.name,
                url: product.url,
                quantity: request.body.products[indexProducts].quantity
            }

            return newProduct;
        })

        const order = {
            user: {
                id: request.UserId,
                name: request.UserName
            }
        }

        return response.status(201).json(listedProducts);
    }
}

export default new OrderController()
