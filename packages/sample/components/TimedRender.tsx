import { FC, ReactElement, useLayoutEffect, useState } from "react";
import { StyledText, StyledView } from "../styled";

const TimedRender: FC<{ children: ReactElement }> = ({ children }) => {
  const [start] = useState(Date.now());
  const [end, setEnd] = useState(0);

  useLayoutEffect(() => {
    setEnd(Date.now());
  }, []);

  return (
    <StyledView classes={[]}>
      {!!end && (
        <StyledText
          classes={[
            "text:lg",
            "color:indigo-500",
            "leading:loose",
            "font-weight:semibold",
          ]}
        >
          Render Took {end - start}ms
        </StyledText>
      )}
      {children}
    </StyledView>
  );
};

export default TimedRender;
