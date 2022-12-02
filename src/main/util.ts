/* eslint import/prefer-default-export: off */
import { URL } from 'url';
var CryptoJS = require("crypto-js");
import chalk from 'chalk';

import path from 'path';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}


// Pulled directly from RedwoodJS source code (MIT LICENSE)
// hashes a password using either the given `salt` argument, or creates a new
// salt and hashes using that. Either way, returns an array with [hash, salt]
export const hashPassword = (text: string, salt?: string) => {
  const useSalt = salt || CryptoJS.lib.WordArray.random(128 / 8).toString()

  return [
    CryptoJS.PBKDF2(text, useSalt, { keySize: 256 / 32 }).toString(),
    useSalt,
  ]
}
