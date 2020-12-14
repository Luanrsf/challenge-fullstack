import { v4 } from 'uuid';
import mongoose from '@shared/database/index';
import User from '../entities/user';

const userSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
});
const UserMongo = mongoose.model<User>('User', userSchema);

export default UserMongo;
