import { get } from "https";
import { createWriteStream } from "fs";

export const downloadFile = async (url, fileName, path) => {
  const request = get(url, (response) => {
    if (response.statusCode === 200) {
      var file = createWriteStream(`${path}/${fileName}.jpg`);
      response.pipe(file);
    }
    request.setTimeout(60000, () => {
      // abort a request after 60s
      request.destroy();
    });
  });
};
