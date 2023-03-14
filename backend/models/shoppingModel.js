import mongoose from 'mongoose';

const shoppingSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        winery: { type: String, required: true },
        wine: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Shopping = mongoose.model('Shopping', shoppingSchema);
export default Shopping;