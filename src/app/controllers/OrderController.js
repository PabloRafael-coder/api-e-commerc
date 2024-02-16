
import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import Order from '../schema/Order'
import User from '../models/User'

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
            User: {
                id: request.UserId,
                name: request.UserName
            },
            products: listedProducts,
            status: 'Pedido realizado',

        }

        const OrderResponse = await Order.create(order)

        return response.status(201).json(OrderResponse);
    }

    async index(request, response) {

        const orders = await Order.find()

        return response.json(orders)

    }

    async update(request, response) {

        const { id } = request.params

        const { status } = request.body


        const { admin: isAdmin } = await User.findByPk(request.UserId)

        if(!isAdmin) {
            return response.status(401).json()
        }


        try {
            await Yup.object().shape({
                status: Yup.string().required(),
            }).validate(request.body, { abortEarly: false });
            
            await Order.updateOne({ _id: id, status })


            return response.json({ message: 'Status updated successfully' })
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }
}

export default new OrderController()
