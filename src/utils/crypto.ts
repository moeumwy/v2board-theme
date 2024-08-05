import CryptoJS from "crypto-js";

export const Base64Encode = (input: string) => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(input));
export const Base64Decode = (input: string) => CryptoJS.enc.Base64.parse(input).toString(CryptoJS.enc.Utf8);
