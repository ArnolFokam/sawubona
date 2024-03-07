import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface User extends Document {
    username: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<User>(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error: any) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export default model<User>('User', userSchema);