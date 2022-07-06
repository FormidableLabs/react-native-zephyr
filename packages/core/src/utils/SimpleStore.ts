import * as React from "react";
import { SimpleEventEmitter } from "./SimpleEventEmitter";

/**
 * A simple store that can be updated anywhere, with hook-support.
 *  - Used to hold state (like colorScheme preference), which can be updated from a single
 *    event listener, and have those updates emitted out to multiple hook-usages.
 */
export class SimpleStore<S> {
  #getValue!: () => S;
  #ee = new SimpleEventEmitter<S>();

  constructor(getValue: () => S) {
    this.#getValue = getValue;
  }

  emitUpdatedValue() {
    this.#ee.emit(this.#getValue());
  }

  /**
   * Custom hook that taps into this store.
   */
  useStoreValue = () => {
    const [val, setVal] = React.useState(() => this.#getValue());

    React.useEffect(() => {
      const { unsubscribe } = this.#ee.subscribe((v) => {
        setVal(v);
      });

      return unsubscribe;
    }, []);

    return val;
  };
}
