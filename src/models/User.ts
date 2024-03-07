import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface User extends Document {
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<User>(
    {
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
        user.password = await bcrypt.hash(user.password, 15);
        next();
    } catch (error: any) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export default model<User>('User', userSchema);