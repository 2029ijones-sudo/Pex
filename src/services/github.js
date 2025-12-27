import { supabase, getCurrentUser } from './supabase.js';
import { encryptURL } from '../utils/crypto.js';

/**
 * Save a package to Supabase and generate GitHub Pages URL
 * @param {object} files - Nested files/folders of the package
 * @param {string} packageName - Name of the package
 * @param {boolean} isPrivate - Whether package is private
 * @returns {string} - URL of the package
 */
export const savePackage = async (files, packageName, isPrivate) => {
  // 1️⃣ Get the logged-in user
  const user = await getCurrentUser();
  if (!user) throw new Error('User not logged in!');

  // 2️⃣ Generate the GitHub Pages URL
  const baseURL = isPrivate
    ? `https://pex.github.io/ENC/Packages/Private/${packageName}/`
    : `https://pex.github.io/P/Packages/${packageName}/`;

  // 3️⃣ Encrypt URL for private packages using the user's public_key
  const url = isPrivate
    ? encryptURL(baseURL, user.public_key)
    : baseURL;

  // 4️⃣ Save package metadata to Supabase
  const { data, error } = await supabase.from('Packages').insert({
    creator_id: user.id,  // real logged-in user
    url,
    private: isPrivate
  });

  if (error) throw error;

  // 5️⃣ Return the actual URL (encrypted or public)
  return url;
};
