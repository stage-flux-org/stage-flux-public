import { UserId } from '../public.interface';

/**
 * Retrieves the user ID from the specified storage.
 * If the user ID does not exist, a new one is generated, stored, and returned.
 *
 * @param {Storage} storage - The storage mechanism to use for retrieving and storing the user ID. Defaults to localStorage.
 * @param {string} key - The key under which the user ID is stored in the storage. Defaults to '_sf:site-user-id'.
 * @return {UserId} The retrieved or newly generated user ID.
 */
export function getStorageUserId(storage: Storage = localStorage, key = '_sf:site-user-id'): UserId {
  let userId = storage.getItem(key);

  if (!userId) {
    userId = crypto.randomUUID();

    storage.setItem(key, userId);
  }

  return userId;
}