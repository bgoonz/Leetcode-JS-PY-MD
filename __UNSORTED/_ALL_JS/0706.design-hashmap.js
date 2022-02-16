/**
 * Initialize your data structure here.
 */
class MyHashMap {
  constructor() {
    this.size = 1543;
    this.map = new Array(this.size);

    for (let i = 0; i < this.size; i++) {
      this.map[i] = [];
    }
  }

  /**
   * value will always be non-negative.
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    const hashKey = key % this.size;
    const item = this.search(hashKey, key);

    if (item === -1) {
      this.map[hashKey].push([key, value]);
    } else {
      item[1] = value;
    }
  }

  search(hashKey, key) {
    const bucket = this.map[hashKey];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i];
      }
    }

    return -1;
  }

  /**
   * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key
   * @param {number} key
   * @return {number}
   */
  get(key) {
    const item = this.search(key % this.size, key);

    if (item === -1) return -1;

    return item[1];
  }

  /**
   * Removes the mapping of the specified value key if this map contains a mapping for the key
   * @param {number} key
   * @return {void}
   */
  remove(key) {
    const hashKey = key % this.size;

    const bucket = this.map[hashKey];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
      }
    }
  }

  /**
   * Your MyHashMap object will be instantiated and called as such:
   * var obj = Object.create(MyHashMap).createNew()
   * obj.put(key,value)
   * var param_2 = obj.get(key)
   * obj.remove(key)
   */
}
