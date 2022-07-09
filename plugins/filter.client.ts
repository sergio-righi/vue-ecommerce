import Vue from "vue";
import { calculation, helpers } from "@/utils";
import { mapper } from "@/utils/mapper"

Vue.filter("age", age);
Vue.filter("utc", utc);
Vue.filter("basket", basket);
Vue.filter("enumerable", enumerable);
Vue.filter("greeting", greeting);
Vue.filter("money", money);
Vue.filter("timestamp", timestamp);
Vue.filter("masked", masked);
Vue.filter("address", address);

/**
 * 
 * @param value 
 * @returns 
 */

function age(value: string) {
  if (value === undefined) return "-";
  const date = Date.parse(value.slice(1));
  const diff = Math.abs(date - new Date().getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

/**
 * 
 * @param value 
 * @param locale 
 * @returns 
 */

function utc(value: string, locale = "en") {
  if (!value) return "-";
  const date = helpers.fromUTC(value);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

/**
 * 
 * @param value 
 * @param i18n 
 * @returns 
 */

function greeting(value: Date, i18n: any) {
  if (i18n === null) return;
  const hours = value.getHours();
  if (hours < 12) return i18n.t("greeting.good_morning");
  else if (hours >= 12 && hours <= 17) return i18n.t("greeting.good_afternoon");
  else if (hours >= 17 && hours <= 24) return i18n.t("greeting.good_evening");
}

/**
 * 
 * @param value 
 * @param options 
 * @param i18n 
 * @param index 
 * @returns 
 */

function enumerable(value: number, options: Array<any>, i18n: any, index: boolean = true) {
  if (options === null || i18n === null) return "";
  const key = options[value];
  return key !== undefined ? i18n.t(key) : "";
}

/**
 * 
 * @param value 
 * @param i18n 
 * @returns 
 */

function basket(value: any, i18n: any) {
  if (value === null || i18n === null) return;
  const currency = i18n.t('locale.currency');
  const unit = calculation.regularPrice(value.price, i18n);
  const sum = calculation.regularPrice(value.price, i18n, value.count);
  return `${value.count} x ${unit} = ${currency} ${money(calculation.reducedPrice(sum, value.discount))}`;
}

/**
 * 
 * @param value 
 * @returns 
 */

function money(value: number) {
  return calculation.toRound(value);
}

/**
 * 
 * @param value 
 * @returns 
 */

function masked(value: string) {
  return value.replace(/^[\d-\s]+(?=\d{4})/, "************");
}

/**
 * 
 * @param value 
 * @param i18n 
 * @returns 
 */

function address(value: any, i18n: any) {
  return `${value.number} ${value.street} - ${value.city}, ${i18n.t(mapper.countries[value.country])} (${value.zipcode})`
}

/**
 * 
 * @param value 
 * @param locale 
 * @returns 
 */

function timestamp(value: number, locale = "en") {
  return new Date(value).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}