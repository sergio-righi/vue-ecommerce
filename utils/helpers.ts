/**
 * convert UTC date string to Date object
 * @param {string} value
 * @returns
 */

const fromUTC = (value: string): Date | any => {
  if (typeof value !== "string") return;
  const timestamp = Date.parse(value.slice(1));
  const date = new Date(timestamp);
  date.setTime(date.getTime() + 4 * 60 * 60 * 1000);
  return date;
};

/**
 * convert date to UTC format
 * @param {Date} value
 * @returns
 */

const toUTC = (value: Date): string | any => {
  if (value === null) return;
  value = typeof value === "string" ? new Date(value) : value;
  return "+" + value.toISOString();
};

/**
 * capitalize a word
 * @param {string} value
 * @returns {string}
 */

const toCapitalize = (value: string): string => {
  const lower = value.toLowerCase();
  return value.charAt(0).toUpperCase() + lower.slice(1);
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
 * Deep merge two objects.
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
 * generates ObjectId
 * @returns {string}
 */

const generateId = (m = Math, d = Date, h = 16, s = (s: number) => m.floor(s).toString(h)): string =>
  s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

/**
* It interpolates a string and its given parameters
* @param {array} arguments
*/
const format = function () {
  if (arguments.length === 1) return arguments[0];
  const args = arguments;
  return args[0].replace(/{(\d+)}/g, (match: any, i: number) =>
    typeof args[Number(i) + 1] !== "undefined" ? args[Number(i) + 1] : match
  );
};

export const helpers = {
  format,
  toCapitalize,
  fromUTC,
  generateId,
  toUTC,
  deepMerge
};
