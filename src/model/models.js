import mongoose from "mongoose";
import personSchema from "./schema/personSchema.js";
import itemSchema from "./schema/itemSchema.js";
import commentSchema from "./schema/commentSchema.js";

const personModel = mongoose.model("Person", personSchema);
const itemModel = mongoose.model("Item", itemSchema);
const commentModel = mongoose.model("Comment", commentSchema);

export { personModel, itemModel, commentModel };
