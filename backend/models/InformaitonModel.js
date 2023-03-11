import mongoose from 'mongoose';

const informationSchema = new mongoose.Schema(
    {
        country: { type: String, required: true },
        location: { type: String, required: true },
        winery: { type: Array, required: true },
        wine: { type: Array, required: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Information = mongoose.model('Inofrmation', informationSchema);
export default Information;