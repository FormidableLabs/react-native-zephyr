import { Platform, ViewStyle } from "react-native";

export const createShadowHandlers = <
  Constraints extends Record<
    string | number,
    { android: number; ios: readonly [number, number, number, number] }
  >
>(
  constraints: Constraints
) => {
  return {
    shadow: (inp: keyof Constraints): ViewStyle => {
      const val = constraints[inp];

      if (!val) return {};

      return Platform.select({
        android: { elevation: val?.android || 0 },
        default: {
          shadowOffset: {
            width: val?.ios?.[0] || 0,
            height: val?.ios?.[1] || 0,
          },
          shadowRadius: val?.ios?.[2] || 0,
          shadowOpacity: val?.ios?.[3] || 0,
        },
      });
    },
  };
};
