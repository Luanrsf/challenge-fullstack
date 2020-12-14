import mongoose from '@shared/database/index';

class Products extends mongoose.Document {
    _id: string;

    amount: Number;

    name: string;

    picture: string;

    description: string;

    price: Number;

    variants?: Products[];
}

export default Products;
