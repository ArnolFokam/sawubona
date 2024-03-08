import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Replace with your user model name
        required: true,
    },
}, {
    timestamps: true, // Add timestamps for created and updated at
});

export default model('Project', projectSchema);