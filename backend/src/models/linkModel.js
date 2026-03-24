import { model, Schema, Types } from 'mongoose';

const linkSchema = new Schema({
    hash: { type: String },
    userId: { type: Types.ObjectId, ref: 'users', required: true, unique: true }
})

const LinkModel = model('links', linkSchema)

export default LinkModel;