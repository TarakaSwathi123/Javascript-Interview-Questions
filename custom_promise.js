function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    if (promises.length === 0) resolve([]);

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // Rejects immediately if any promise fails
    });
  });
}

// Test Cases
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = new Promise((_, reject) => setTimeout(reject, 100, 'Error'));

customPromiseAll([p1, p2])
  .then(console.log) // Output: [10, 20]
  .catch(console.error);

customPromiseAll([p1, p2, p3])
  .then(console.log)
  .catch(console.error); // Output: "Error"
