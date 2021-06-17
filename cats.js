import mongoose from "mongoose";
const { Schema } = mongoose;

// connect to mongo

// mongoose
//   .connect("mongodb://localhost:27017/test", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // set schema & model

// const catSchema = new Schema({ name: String });
// const Cat = mongoose.model("Cat", catSchema);

// // save

// const saveNewCat = (catName, delay) => {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       new Cat({ name: catName })
//         .save()
//         .then(() => res(`${catName} saved.`))
//         .catch(() => rej(`${catName} not saved.`));
//     }, delay);
//   });
// };

// saveNewCat("Bart", 3000).then((res) => console.log(res));
// saveNewCat("Lisa", 2000).then((res) => console.log(res));
// saveNewCat("Milhouse", 1000).then((res) => console.log(res));

// OLD //////////////////////////////////////////////////////////////

// const cat1 = saveNewCat("Bart", 1000);
// const cat2 = saveNewCat("Lisa", 2000);
// const cat3 = saveNewCat("Milhouse", 3000);

// Promise.all([cat1, cat2, cat3])
//   .then((resolveArray) => console.log(resolveArray))
//   .catch((err) => console.error(err))
//   .finally(() => mongoose.disconnect());

// kitty
//   .save()
//   .then(() => console.log(kitty))
//   .catch((err) => console.log(err))
//   .finally(() => mongoose.disconnect());

// try {
//   console.log({}.test());
// } catch (err) {
//   console.log(err);
// } finally {
//   console.log("end");
// }
