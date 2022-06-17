export class SimpleConstrainedCache {
  __records = new Map<string, Record<string, unknown>>();
  __maxNumRecords: number;

  constructor({ maxNumRecords }: { maxNumRecords: number }) {
    this.__maxNumRecords = maxNumRecords;
  }

  get size() {
    return this.__records.size;
  }

  has = (key: string) => this.__records.has(key);

  get = (key: string) => this.__records.get(key);

  set = (key: string, value: any) => {
    this.__records.set(key, value);

    this.__trim();
  };

  /**
   * After each set, we'll make sure to trim up a bit (if needed)
   */
  __trim = () => {
    while (this.__records.size > this.__maxNumRecords) {
      const [key] = this.__records.keys();
      this.__records.delete(key);
    }
  };
}
