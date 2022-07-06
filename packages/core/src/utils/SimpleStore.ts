import * as React from "react";
import { SimpleEventEmitter } from "./SimpleEventEmitter";

export class SimpleStore<S> {
  #getValue!: () => S;
  #ee = new SimpleEventEmitter<S>();

  constructor(getValue: () => S) {
    this.#getValue = getValue;
  }

  reeval() {
    this.#ee.emit(this.#getValue());
  }

  useStoreValue() {
    const [val, setVal] = React.useState(() => this.#getValue());

    React.useEffect(() => {
      const { unsubscribe } = this.#ee.subscribe((v) => {
        setVal(v);
      });

      return unsubscribe;
    }, []);

    return val;
  }
}
