import { itemModel } from "../model/models.js";

const saveItem = async (args) => {
  const newItem = new itemModel({
    name: args[1],
    price: args[2],
    author: { name: args[3], email: args[4] },
  });
  await newItem.save();
};

export default saveItem;
