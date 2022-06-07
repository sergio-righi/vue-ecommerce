const zero = "0";
const number = "123456789";
const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const lower = "abcdefghijkmnopqrstuvwxyz";

const run = (dictionary: any, length: any, unique: boolean = true) => {
  const result: Array<string> = [];
  do {
    const index: number = Math.floor(Math.random() * dictionary.length + 1);
    const character: string = dictionary[index - 1];
    if (unique) {
      if (result[result.length - 1] !== character) {
        result.push(character);
      }
    } else {
      result.push(character);
    }
  } while (result.length !== length);
  return result.join("");
};

const generateCode = (length: number = 6) => {
  return run(zero + number, length, false);
};

const generateKey = (length: number = 48) => {
  return run(lower + upper + number, length);
};

export default { generateCode, generateKey };
