class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // Move the accessed item to the end
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // Remove the key to update its position
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const lruKey = this.cache.keys().next().value; // Get the least recently used key
      this.cache.delete(lruKey);
    }
  }
}

// Example Usage
const cache = new LRUCache(3);
cache.put(1, "A");
cache.put(2, "B");
cache.put(3, "C");
console.log(cache.get(1)); // "A"
cache
