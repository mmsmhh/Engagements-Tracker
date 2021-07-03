const fs = require("fs");
const fsPromises = fs.promises;

const fileExists = (path) => {
  return fs.existsSync(path);
};

const clearFile = async (filePath) => {
  await fsPromises.writeFile(filePath, "");
};

const writeToFile = async (fileName, text, append) => {
  try {
    if (append) {
      await fsPromises.appendFile(fileName, text);
    } else {
      await fsPromises.writeFile(fileName, text);
    }
  } catch (err) {
    console.log(err);
  }
};

const readFromFile = async (fileName) => {
  try {
    return await fsPromises.readFile(fileName, "utf8");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { writeToFile, readFromFile, fileExists, clearFile };
