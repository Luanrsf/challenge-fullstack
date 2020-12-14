import AppError from '@shared/errors/AppError';
import mongoose from 'mongoose';
require('dotenv').config();
const mongokey = process.env.MONGODB_KEY;
if (!!mongokey) {
    mongoose.connect(mongokey, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    mongoose.Promise = global.Promise;
} else {
    throw new AppError('Please check your Database LINK');
}

export default mongoose;
