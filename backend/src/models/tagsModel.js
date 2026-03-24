import { model, Schema } from "mongoose";

const tagSchema = new Schema({
    title: { type: String, required: true, unique: true }
})

const TagModel = model('tags', tagSchema)

export default TagModel;