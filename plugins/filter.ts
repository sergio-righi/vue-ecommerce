import Vue from "vue";

import { calculation, helpers } from "utils";

Vue.filter("age", age);
Vue.filter("utc", utc);
Vue.filter("basket", basket);
Vue.filter("enumerable", enumerable);
Vue.filter("greeting", greeting);
Vue.filter("money", money);
Vue.filter("timestamp", timestamp);
Vue.filter("masked", masked);

function age(value: string) {
  if (value === undefined) return "-";
  const date = Date.parse(value.slice(1));
  const diff = Math.abs(date - new Date().getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function utc(value: string, locale = "en") {
  if (!value) return "-";
  const date = helpers.fromUTC(value);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function greeting(value: Date, i18n: any) {
  if (i18n === null) return;
  const hours = value.getHours();
  if (hours < 12) return i18n.t("greeting.good_morning");
  else if (hours >= 12 && hours <= 17) return i18n.t("greeting.good_afternoon");
  else if (hours >= 17 && hours <= 24) return i18n.t("greeting.good_evening");
}

function enumerable(value: number, options: Array<any>, i18n: any, index: boolean = true) {
  if (options === null || i18n === null) return "";
  const key = options[value];
  return key !== undefined ? i18n.t(key) : "";
}

function basket(value: any, i18n: any) {
  if (value === null || i18n === null) return;
  const currency = i18n.t('locale.currency');
  const unit = calculation.regularPrice(value.book.price, i18n);
  const sum = calculation.regularPrice(value.book.price, i18n, value.count);
  return `${value.count} x ${unit} = ${currency} ${money(calculation.reducedPrice(sum, value.book.discount))}`;
}

function money(value: number) {
  return calculation.toRound(value);
}

function masked(value: string) {
  return value.replace(/^[\d-\s]+(?=\d{4})/, "************");
}

function timestamp(value: number, locale = "en") {
  return new Date(value * 1000).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}