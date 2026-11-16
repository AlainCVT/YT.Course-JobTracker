import { strict as assert } from "node:assert";
import test from "node:test";

import {
  assert as assertCondition,
  assertIsDefined,
  assertIsInArray,
  assertIsKeyOfObject,
  assertIsNumber,
  assertIsString,
  assertNoNullableValuesInArray,
} from "@/lib/assertion";

test("assert passes when the supplied condition is truthy", () => {
  assert.doesNotThrow(() => assertCondition(true));
  assert.doesNotThrow(() => assertCondition(1 === 1, "should pass"));
});

test("assert throws a custom error when the condition is falsy", () => {
  assert.throws(() => assertCondition(false, "cannot continue"), {
    message: "cannot continue",
  });

  const customError = new Error("custom failure");
  assert.throws(() => assertCondition(0, customError), {
    name: "Error",
    message: "custom failure",
  });
});

test("assertIsDefined rejects undefined and null values", () => {
  assert.doesNotThrow(() => assertIsDefined("value"));
  assert.doesNotThrow(() => assertIsDefined(0));

  assert.throws(() => assertIsDefined(undefined), /Expected 'value' to be defined/);
  assert.throws(() => assertIsDefined(null), /Expected 'value' to be defined/);
});

test("assertNoNullableValuesInArray rejects null and undefined items", () => {
  assert.doesNotThrow(() => assertNoNullableValuesInArray([1, 2, 3]));
  assert.throws(
    () => assertNoNullableValuesInArray([1, undefined, 3]),
    /contains a nullable value/,
  );
  assert.throws(() => assertNoNullableValuesInArray([1, null, 3]), /contains a nullable value/);
});

test("assertIsInArray rejects values missing from the collection", () => {
  assert.doesNotThrow(() => assertIsInArray("green", ["red", "green", "blue"]));
  assert.throws(
    () => assertIsInArray("yellow", ["red", "green", "blue"]),
    /'value' is not in array/,
  );
});

test("assertIsNumber accepts numbers and rejects other values", () => {
  assert.doesNotThrow(() => assertIsNumber(42));
  assert.throws(() => assertIsNumber("42"), /Type of 'value' is not a number/);
  assert.throws(() => assertIsNumber(null), /Type of 'value' is not a number/);
});

test("assertIsString accepts strings and rejects other values", () => {
  assert.doesNotThrow(() => assertIsString("hello"));
  assert.throws(() => assertIsString(42), /Type of 'value' is not a string/);
  assert.throws(() => assertIsString(null), /Type of 'value' is not a string/);
});

test("assertIsKeyOfObject accepts existing keys and rejects missing keys", () => {
  const obj = { name: "Job tracker", role: "admin" };

  assert.doesNotThrow(() => assertIsKeyOfObject(obj, "name"));
  assert.doesNotThrow(() => assertIsKeyOfObject(obj, "role"));
  assert.throws(() => assertIsKeyOfObject(obj, "email"), /Key "email" does not exist/);
});
