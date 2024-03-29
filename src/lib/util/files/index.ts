import fs from 'fs';
import path from 'path';

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

const createFolderIfNotExists = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
    return true;
  }
  return false;
};

async function readJSONFilesFromDirectory<T>(
  directory: string
): Promise<{ path: string; content: T }[]> {
  let results: { path: string; content: T }[] = [];
  const entries = await fs.readdirSync(directory);

  for (const entryName of entries) {
    const entryPath = path.join(directory, entryName);
    const entryStat = await fs.statSync(entryPath);

    if (entryStat.isDirectory()) {
      const subDirFiles = await readJSONFilesFromDirectory(entryPath);
      results = results.concat(subDirFiles as any);
    } else if (path.extname(entryName) === '.json') {
      const data = await fs.readFileSync(entryPath, 'utf8');
      results.push({ path: entryPath, content: JSON.parse(data) });
    }
  }
  return results;
}

const jsonUtils = {
  pushToJsonFileArray: (filePath: string, data: any) => {
    const currentData = require(filePath);
    currentData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(currentData));
  },
  readJSONFilesFromDirectory
};

const fileUtils = {
  createFileIfNotExists,
  createFolderIfNotExists,
  json: jsonUtils
};

export default fileUtils;
