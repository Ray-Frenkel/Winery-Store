import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    winery: { type: String, required: true },
    wine: { type: String, required: true },
    rating: { type: Object, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    id: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
