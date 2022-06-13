export class SimpleConstrainedCache {
  __records = new Map<string, any>();
  __maxNumRecords: number;

  constructor({ maxNumRecords }: { maxNumRecords: number }) {
    this.__maxNumRecords = maxNumRecords;
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
    if (this.__records.size > this.__maxNumRecords) {
      for (let [key] of this.__records) {
        this.__records.delete(key);
        break;
      }
    }
  };
}
