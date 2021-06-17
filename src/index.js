import mongoose from "mongoose";

import saveComment from "./controllers/saveComment.js";
import saveItem from "./controllers/saveItem.js";
import savePerson from "./controllers/savePerson.js";

// connect to mongo

const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
};

const disconnectFromMongo = async () => {
  await mongoose.disconnect();
};

// parse args

const saveArgsToMongo = async (args) => {
  try {
    if (args[0] === "Person") await savePerson(args);
    else if (args[0] === "Item") await saveItem(args);
    else if (args[0] === "Comment") await saveComment(args);
    else throw "Error: invalid argument";
  } catch (err) {
    console.log(err);
  }
};

// main

const main = async (args) => {
  await connectToMongo();
  await saveArgsToMongo(args);
  await disconnectFromMongo();
};

// const myArgs = process.argv.slice(2);

main(["Person", "Ayrton", "ayrton@email.com"]);

// mongoose.disconnect();
