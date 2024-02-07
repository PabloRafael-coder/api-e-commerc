import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

    User: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },

    products: [
        {
            id: {
                type: Number,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            category: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ],
    status: String,
    required: true
}, {
    timestamps: true,
}
);


export default mongoose.model('Order', orderSchema)