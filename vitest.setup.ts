import { vi } from "vitest";

vi.mock("react-native", () => ({
  Appearance: {
    getColorScheme: () => "dark",
    addChangeListener: () => ({
      remove: () => {
        /* ... */
      },
    }),
  },
  StyleSheet: {
    hairlineWidth: 0.5,
  },
}));
