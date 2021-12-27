import CryptoJS from "crypto-js";

const key = "X7cfCohbU4emX5TKeS8N0oaRNXgndJU0";
const iv = "o9FaNyOTxr";

const encrypt = (value: string) => {
  const cipher = CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC
  });

  return cipher.toString();
};

const decrypt = (value: string) => {
  const cipher = CryptoJS.AES.decrypt(value, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC
  });

  return CryptoJS.enc.Utf8.stringify(cipher).toString();
};

export const crypto = { encrypt, decrypt };
