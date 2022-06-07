import fs from 'fs'
import path from 'path'

const read = (filename: string) => {
  try {
    const fullpath = path.resolve(__dirname, '..', `static/mail/${filename}`)
    const content = fs.readFileSync(fullpath, 'utf8')
    return content;
  } catch (err) {
    return null;
  }
}

const replace = (content: string, options: any) => {
  return content.replace(/{([^{}]*)}/g, (match: any, key: number) => options[key] || match);
}

const readAndReplace = (filename: string, options: any) => {
  const content = read(filename);
  if (content !== null) {
    return replace(content, options);
  }
}

export default { readAndReplace }