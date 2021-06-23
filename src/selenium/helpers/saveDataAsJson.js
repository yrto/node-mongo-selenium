import fs from "fs";

const saveDataAsJson = async (path, fileName, data) => {
  fs.writeFileSync(`${path}/${fileName}`, JSON.stringify(data));
};

export default saveDataAsJson;
