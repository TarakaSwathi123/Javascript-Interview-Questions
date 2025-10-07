// Only define fetch if it doesn't exist
if (!window.fetch) {
  // Polyfill fetch using XMLHttpRequest
  window.fetch = function (url, options = {}) {
    // Return a Promise like native fetch
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest() // Create XHR object
      xhr.open(options.method || 'GET', url) // Set method or default to GET

      // Set headers if provided
      for (const key in options.headers || {}) {
        xhr.setRequestHeader(key, options.headers[key])
      }

      // Resolve Promise on success
      xhr.onload = () => {
        resolve({
          text: () => Promise.resolve(xhr.responseText), // text() method
          status: xhr.status, // HTTP status code
        })
      }

      // Reject Promise on network error
      xhr.onerror = () => reject(new TypeError('Network request failed'))

      // Send request body if provided
      xhr.send(options.body)
    })
  }
}
