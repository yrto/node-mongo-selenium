import { personModel } from "../model/models.js";

const savePerson = async (args) => {
  const newPerson = new personModel({ name: args[1], email: args[2] });
  await newPerson.save();
};

export default savePerson;
