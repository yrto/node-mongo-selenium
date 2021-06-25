import { promises as fs } from "fs";
import path from "path";

const handleFiles = async (src, dest, operation) => {
  await fs.mkdir(dest, { recursive: true });
  let entries = await fs.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
      if (operation === "move") await fs.rm(srcPath);
    }
  }
};

const copyDir = async (src, dest) => {
  await handleFiles(src, dest, "copy");
};

const moveDir = async (src, dest) => {
  await handleFiles(src, dest, "move");
};

export { copyDir, moveDir };

// https://stackoverflow.com/questions/39106516/node-fs-copy-a-folder
