import { promises as fs } from "fs";
import path from "path";

const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true });
  let entries = await fs.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
      await fs.rm(srcPath);
    }
  }
};

export default copyDir;

// https://stackoverflow.com/questions/39106516/node-fs-copy-a-folder
