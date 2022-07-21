export class SimpleEventEmitter<S> {
  cbs: ((x: S) => void)[] = [];

  subscribe(cb: (x: S) => void) {
    this.cbs.push(cb);

    return {
      unsubscribe: () => {
        const indexToRemove = this.cbs?.indexOf(cb) ?? -1;
        if (indexToRemove >= 0) this.cbs?.splice(indexToRemove, 1);
      },
    };
  }

  emit(x: S) {
    this.cbs.forEach((cb) => {
      cb(x);
    });
  }
}
