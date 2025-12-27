import CryptoJS from 'crypto-js';

/**
 * Encrypt a URL for a specific user
 * @param {string} url - URL to encrypt
 * @param {string} userKey - user's public key from Supabase
 * @returns {string} encrypted URL
 */
export const encryptURL = (url, userKey) => {
  return CryptoJS.AES.encrypt(url, userKey).toString();
};

/**
 * Decrypt a URL for a specific user
 * @param {string} ciphertext - encrypted URL
 * @param {string} userKey - user's public key from Supabase
 * @returns {string} decrypted URL
 */
export const decryptURL = (ciphertext, userKey) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, userKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
