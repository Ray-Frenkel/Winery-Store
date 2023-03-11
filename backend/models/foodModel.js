import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
    {
        foodType: { type: String, required: true },
        wineType: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Food = mongoose.model('Food', foodSchema);
export default Food;