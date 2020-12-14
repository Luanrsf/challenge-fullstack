import mongoose from '@shared/database/index';
import Products from '../entities/Products';

const variantsSchema: mongoose.Schema = new mongoose.Schema(
    {
        amount: Number,
        name: String,
        picture: String,
        price: Number,
        description: String,
    },
    { collection: 'variants' },
);
const productsSchema: mongoose.Schema = new mongoose.Schema(
    {
        amount: { type: Number, required: true },
        name: { type: String, required: true },
        picture: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        variants: [variantsSchema],
    },
    { collection: 'products' },
);
const productsModelDB = mongoose.model<Products>('Products', productsSchema);

export default productsModelDB;
