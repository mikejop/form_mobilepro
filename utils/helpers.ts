/**
 * Recursively removes keys with `undefined` values from an object or an array of objects.
 * This is crucial for preparing data to be sent to Firestore, which prohibits `undefined`.
 * @param obj The object or array to sanitize.
 * @returns A new object or array with all `undefined` values removed.
 */
export const removeUndefined = (obj: any): any => {
  // If not an object/array or is null, return it directly
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // If it's an array, map over its items and apply the function recursively
  if (Array.isArray(obj)) {
    return obj.map(item => removeUndefined(item));
  }

  // If it's an object, create a new object with only defined values
  const newObj: { [key: string]: any } = {};
  for (const key in obj) {
    // Ensure the key belongs to the object itself
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      // If the value is not undefined, process it recursively and add to the new object
      if (value !== undefined) {
        newObj[key] = removeUndefined(value);
      }
    }
  }
  return newObj;
};
