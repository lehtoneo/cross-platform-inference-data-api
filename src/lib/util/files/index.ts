import fs from 'fs';

/**
 *
 * @param path - path to the file
 * @param content - content to write to the file
 * @returns - True if the file was created, false if it already exists
 */
const createFileIfNotExists = (path: string, content: string) => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, content);
    return true;
  }
  return false;
};

const jsonUtils = {
  pushToJsonFileArray: (filePath: string, data: any) => {
    const currentData = require(filePath);
    currentData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(currentData));
  }
};

const fileUtils = {
  createFileIfNotExists,
  json: jsonUtils
};

export default fileUtils;
