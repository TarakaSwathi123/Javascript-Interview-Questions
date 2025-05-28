function customSetInterval(callback, delay) {
  let timerId;

  function repeat() {
    timerId = setTimeout(() => {
      callback();
      repeat(); // recursively call again
    }, delay);
  }

  repeat();

  // return a function to stop the interval
  return () => clearTimeout(timerId);
}

// Example usage
const stop = customSetInterval(() => {
  console.log('Tick 🕒');
}, 1000);

// Stop after 5 seconds
setTimeout(() => {
  stop();
  console.log('Stopped 🚫');
}, 5000);
