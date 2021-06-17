import mongoose from "mongoose";

const { Schema } = mongoose;

const personSchema = new Schema({
  name: String,
  email: String,
});

export default personSchema;
