import mongoose from '../../../../shared/database/index';

class User extends mongoose.Document {
    _id: string;

    name: string;

    email: string;

    password: string;

    created_at: Date;

    updated_at: Date;
}

export default User;
