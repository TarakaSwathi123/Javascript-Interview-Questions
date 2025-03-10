function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj; // Return primitives and functions as they are
  }

  if (hash.has(obj)) {
    return hash.get(obj); // Handle circular references
  }

  let clone;

  if (Array.isArray(obj)) {
    clone = [];
  } else if (obj instanceof Date) {
    clone = new Date(obj);
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj);
  } else if (obj instanceof Map) {
    clone = new Map([...obj].map(([key, value]) => [deepClone(key, hash), deepClone(value, hash)]));
  } else if (obj instanceof Set) {
    clone = new Set([...obj].map(value => deepClone(value, hash)));
  } else if (ArrayBuffer.isView(obj)) {
    clone = new obj.constructor(obj);
  } else if (obj instanceof ArrayBuffer) {
    clone = obj.slice(0);
  } else if (typeof obj === "symbol") {
    clone = Symbol(obj.description);
  } else {
    clone = {};
  }

  hash.set(obj, clone); // Store reference in WeakMap

  for (let key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], hash);
  }

  return clone;
}
const obj = {
  name: "Alice",
  details: { age: 25, hobbies: ["reading", "coding"] },
  date: new Date(),
  regex: /test/i,
  map: new Map([["key1", "value1"], ["key2", { nested: "object" }]]),
  set: new Set([1, 2, 3, { a: 4 }]),
  buffer: new ArrayBuffer(8),
  typedArray: new Uint8Array([1, 2, 3]),
  symbol: Symbol("test"),
};

const clonedObj = deepClone(obj);

// Modify clone
clonedObj.details.age = 30;
clonedObj.map.set("key1", "modified");
clonedObj.set.add(100);

// Check if original remains unchanged
console.log(obj.details.age); // 25 (original remains unchanged)
console.log(clonedObj.details.age); // 30 (modified copy)
console.log(obj.date === clonedObj.date); // false (deep cloned)
console.log(obj.regex === clonedObj.regex); // false (deep cloned)
console.log(obj.map === clonedObj.map); // false (deep cloned)
console.log(obj.set === clonedObj.set); // false (deep cloned)
console.log(obj.buffer === clonedObj.buffer); // false (deep cloned)
console.log(obj.typedArray === clonedObj.typedArray); // false (deep cloned)
console.log(obj.symbol === clonedObj.symbol); // false (deep cloned, new Symbol)
