/**
 * It converts UTC date string to Date
 * @param {string} value
 * @returns {Date}
 */

const fromUTC = (value: string): Date => {
  const timestamp = Date.parse(value.slice(1));
  const date = new Date(timestamp);
  date.setTime(date.getTime() + 4 * 60 * 60 * 1000);
  return date;
};

/**
 * object array to dropdown list
 * @param {[any]} o
 * @param {any} i18n
 * @param {boolean} index
 * @returns {[Object]}
 */

const toDropdownList = (enumerable: Array<any>, i18n: any, index: boolean = false): Object | any => {
  if (i18n === null) return;
  return Object.entries(enumerable).map(x => ({
    value: parseInt(x[0]),
    text: i18n.tc(x[1], 1)
  }));
};

/**
 * It parses a form to pair-value object
 * @param {[Object]} form
 * @returns {Object}
 */

const toDictionary = (form: any): object => {
  if (!form) return {};
  else if (typeof form !== "object") return {};
  else {
    return Object.values(form)
      .filter((item: any) => item.name && item.value)
      .map((item: any) => ({ [item.name]: item.value }))
      .reduce((o, item) => Object.assign(o, item), {});
  }
};

/**
 * Simple object check.
 * @param {any} value
 * @returns {boolean}
 */

const isObject = (value: any): boolean => {
  return value && typeof value === "object" && !Array.isArray(value);
};

/**
 * Deep merge two objects
 * @param {Object} target
 * @param {Object} ...sources
 * @returns {Object}
 */

const deepMerge = (target: any, ...sources: any): any => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
};

/**
 * create an instance using a generic constraint
 * @param {any} type 
 * @param {any[]} args 
 * @returns {T}
 */

function createInstance<T>(type: new (...constructorArgs: any[]) => T, ...args: any[]): T {
  // eslint-disable-next-line new-cap
  return new type(...args);
}

/**
* It interpolates a string and its given parameters
* @param {array} arguments
* @returns {string}
*/
const format = function (): string {
  if (arguments.length === 1) return arguments[0];
  const args = arguments;
  return args[0].replace(/{(\d+)}/g, (match: any, i: number) =>
    typeof args[Number(i) + 1] !== "undefined" ? args[Number(i) + 1] : match
  );
};

/**
 * It returns a random float number between X and Y
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */

const randomFloat = (min: number, max: number): number => Math.random() * (max - min) + min;

/**
 * it converts a string to slug e.g. My name is X => my-name-is-x
 * @param {string} value 
 * @returns {string | null}
 */

const slug = (value: string): string | null => value ? value.replace(/ +/g, '-').toLowerCase() : null;

/**
 * it runs recursively till the string is converted to JSON object
 * @param json 
 * @returns 
 */

 function toJSON(json: string): any {
  if (!json) return;
  let parsed = JSON.parse(json);
  if (typeof parsed === 'string') parsed = toJSON(parsed);
  return parsed;
}

export default {
  format,
  toJSON,
  toDropdownList,
  toDictionary,
  fromUTC,
  createInstance,
  deepMerge,
  randomFloat,
  slug,
};
