function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj; // Return primitives as they are
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
  } else {
    clone = {};
  }

  hash.set(obj, clone); // Store reference in WeakMap

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }

  return clone;
}

// Example Usage
const obj = {
  name: "Alice",
  details: { age: 25, hobbies: ["reading", "coding"] },
  date: new Date(),
  regex: /test/i,
};

const clonedObj = deepClone(obj);
clonedObj.details.age = 30;

console.log(obj.details.age); // 25 (Original remains unchanged)
console.log(clonedObj.details.age); // 30 (Modified copy)
console.log(obj.date === clonedObj.date); // false (Deep cloned)
console.log(obj.regex === clonedObj.regex); // false (Deep cloned)
