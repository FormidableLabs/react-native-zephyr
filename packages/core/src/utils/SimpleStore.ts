import * as React from "react";
import { SimpleEventEmitter } from "./SimpleEventEmitter";

/**
 * A simple store that can be updated anywhere, with hook-support.
 *  - Used to hold state (like colorScheme preference), which can be updated from a single
 *    event listener, and have those updates emitted out to multiple hook-usages.
 */
export class SimpleStore<InitialValue, OutputValue = InitialValue> {
  #value!: OutputValue;
  #ee = new SimpleEventEmitter<OutputValue>();
  #transformer!: (val: InitialValue) => OutputValue;

  constructor({
    initialValue,
    transformer,
  }: {
    initialValue: InitialValue;
    transformer: (val: InitialValue) => OutputValue;
  }) {
    this.#value = transformer(initialValue);
    if (transformer) {
      this.#transformer = transformer;
    }
  }

  updateValue = (newValue: InitialValue) => {
    const _newValue = this.#transformer(newValue);
    if (_newValue !== this.#value) {
      this.#value = _newValue;
      this.#ee.emit(this.#value);
    }
  };

  /**
   * Custom hook that taps into this store.
   */
  useStoreValue = () => {
    const [val, setVal] = React.useState(() => this.#value);

    React.useEffect(() => {
      const { unsubscribe } = this.#ee.subscribe((v) => {
        setVal(v);
      });

      return unsubscribe;
    }, []);

    return val;
  };
}
