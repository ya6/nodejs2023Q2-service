import { writeFile } from 'node:fs/promises';
import { join } from 'path';

export async function writeToFile(fileName, data) {
  const path = join(__dirname, '../../', fileName);
  try {
    await writeFile(path, data + '\n', {
      encoding: 'utf8',
      flag: 'a+',
    });

    console.log(`Log  successfully added to file ${path} \n`);
  } catch (err) {
    console.error(err);
  }
}
