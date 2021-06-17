import mongoose from "mongoose";
import personSchema from "./personSchema.js";

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: String,
  price: Number,
  author: personSchema,
});

export default itemSchema;
