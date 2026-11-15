/**
 * Asserts that a condition is true.
 * @param {unknown} condition The condition to assert.
 * @param {string | Error} [error] The error to throw if the condition is false.
 * @throws {Error} If the condition is false.
 * @example
 * assert(1 === 1, '1 is not equal to 1.'); // Asserts successfully.
 * assert(1 === 2, '1 is not equal to 2.'); // Throws an error.
 */
export function assert(condition: unknown, error?: string | Error): asserts condition {
  if (!condition) {
    throw error instanceof Error ? Error : new Error(error);
  }
}

/**
 * Asserts that a value is defined.
 * @param {T} value The value to assert.
 * @throws {Error} If the value is undefined.
 * @example
 * assertIsDefined(1); // Asserts successfully.
 * assertIsDefined(null); // Throws an error.
 */
export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Expected 'value' to be defined, but received ${value}.`);
  }
}

/**
 * Asserts that every element in an array is defined.
 * @param {T[]} array The array to assert.
 * @throws {Error} If an element in the array is undefined.
 * @example
 * assertNoUndefinedValuesInArray([1, 2, 3]); // Asserts successfully.
 * assertNoUndefinedValuesInArray([1, null, 3]); // Throws an error.
 */
export function assertNoNullableValuesInArray<T>(
  array: (T | null | undefined)[],
): asserts array is T[] {
  for (const element of array) {
    if (element === null || element === undefined) {
      throw new Error("'array' contains a nullable value.");
    }
  }
}

/**
 * Asserts that a value is in an array.
 * @param {T} value The value to assert.
 * @param {T[] | ReadonlyArray<T>} array The array to check if the value is in.
 * @throws {TypeError} If the value is not in the array.
 * @example
 * assertIsInArray(1, [1, 2, 3]); // Asserts successfully.
 * assertIsInArray(0, [1, 2, 3]); // Throws an error.
 */
export function assertIsInArray<T, U extends T[] | ReadonlyArray<T>>(
  value: T,
  array: U,
): asserts value is (typeof array)[number] {
  if (!array.includes(value)) {
    throw new TypeError("'value' is not in array.");
  }
}

/**
 * Asserts that a value is a number.
 * @param {unknown} value The value to assert.
 * @throws {TypeError} If the value is not a number.
 * @example
 * assertIsNumber(1); // Asserts successfully.
 * assertIsNumber('1'); // Throws an error.
 */
export function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") {
    throw new TypeError(`Type of 'value' is not a number, but is ${typeof value}.`);
  }
}

/**
 * Asserts that a value is a string.
 * @param {unknown} value The value to assert.
 * @throws {TypeError} If the value is not a string.
 * @example
 * assertIsString('1'); // Asserts successfully.
 * assertIsString(1); // Throws an error.
 */
export function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new TypeError(`Type of 'value' is not a string, but is ${typeof value}.`);
  }
}

/**
 * Asserts that a key is defined in an object.
 * @param {T} object The object to assert.
 * @param {string | number | symbol} key The key to assert.
 * @throws {Error} If the key is not in the object.
 * @example
 * assertIsKeyOfObject({ key: 'value' }, 'key'); // Asserts successfully.
 * assertIsKeyOfObject({ key: 'value' }, 'value'); // Throws an error.
 */
export function assertIsKeyOfObject<T extends object>(
  object: T,
  key: string | number | symbol,
): asserts key is keyof T {
  if (!(key in object)) {
    throw new Error(`Key "${String(key)}" does not exist in the object.`);
  }
}
