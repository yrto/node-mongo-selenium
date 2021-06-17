import { commentModel } from "../model/models.js";

const saveComment = async (args) => {
  const newComment = new commentModel({
    body: args[1],
    author: { name: args[2], email: args[3] },
  });
  await newComment.save();
};

export default saveComment;
