import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

interface User extends Document {
    email: string;
    password: string;
    apiKey: string;
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
        apiKey: {
            type: String,
            unique: true, // Ensure unique API key for each user
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
        user.apiKey = uuidv4();
        next();
    } catch (error: any) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export default model<User>('User', userSchema);