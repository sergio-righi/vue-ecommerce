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
 * It converts date to UTC format
 * @param {Date} value
 * @returns {string}
 */

const toUTC = (value: Date): number => {
  return value.getTime();
};

/**
 * IT capitalizes a string
 * @param {string} value
 * @returns {string}
 */

const toCapitalize = (value: string): string => {
  const lower = value.toLowerCase();
  return value.charAt(0).toUpperCase() + lower.slice(1);
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
 * It generates ObjectId
 * @param {Math} m
 * @param {DateConstructor} d
 * @param {Function} s
 * @returns {string}
 */

const generateId = (m: Math = Math, d: DateConstructor = Date, h = 16, s: Function = (s: number) => m.floor(s).toString(h)): string =>
  s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

/**
 * It generates OrderId
 * @param {string} value
 * @returns {string}
 */

const generateOrderId = (value: string): string => {
  return value.replace(/\D/g, "").slice(-7)
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

export const helpers = {
  format,
  toDictionary,
  toCapitalize,
  fromUTC,
  generateId,
  generateOrderId,
  toUTC,
  deepMerge,
  randomFloat,
};
