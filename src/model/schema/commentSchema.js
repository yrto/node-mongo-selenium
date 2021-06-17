import mongoose from "mongoose";
import personSchema from "./personSchema.js";

const { Schema } = mongoose;

const commentSchema = new Schema({
  body: String,
  author: personSchema,
});

export default commentSchema;
