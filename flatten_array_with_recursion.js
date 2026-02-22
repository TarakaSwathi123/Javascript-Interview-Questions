// Flatten a nested array using recursion
const arr = [1, [2, [3, 4]], 5];

const flatIt = (array) => {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result.push(...flatIt(array[i]));
    } else {
      result.push(array[i]);
    }
  }
  return result;
};
console.log(flatIt(arr));
// Output:
// [1, 2, 3, 4, 5]
