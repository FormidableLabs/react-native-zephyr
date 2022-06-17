import * as React from "react";
import { StyledIcon, StyledText, StyledView } from "./styles";

export const RecentlyPlayed = () => {
  return (
    <StyledView>
      {[0, 1, 2].map((i) => (
        <StyledView
          key={`row-${i}`}
          classes={["flex:row", "h:14", "shadow:lg", { "mb:1.5": i < 2 }]}
        >
          {[0, 1].map((j) => (
            <React.Fragment key={`col-${j}`}>
              <StyledView
                classes={[
                  "flex:1",
                  "bg:gray-700",
                  "rounded:md",
                  "overflow:hidden",
                  "flex:row",
                  "items:center",
                ]}
              >
                <StyledView classes={["aspect:1", "h:full", "bg:gray-400"]} />
                <StyledView
                  classes={[
                    "flex:1",
                    "p:1.5",
                    "flex:row",
                    "justify:between",
                    "items:center",
                  ]}
                >
                  <StyledText classes={["color:white", "text:sm"]}>
                    {ITEMS[2 * i + j]}
                  </StyledText>
                  {i === 0 && j === 0 && (
                    <StyledIcon
                      name="play-circle"
                      classes={["color:green-500"]}
                      size={16}
                    />
                  )}
                </StyledView>
              </StyledView>
              {j === 0 && <StyledView classes={["w:1.5"]} />}
            </React.Fragment>
          ))}
        </StyledView>
      ))}
    </StyledView>
  );
};

const ITEMS = [
  "Alt Stuff",
  "Shred2016",
  "Rock",
  "Kids Bop",
  "Really bad country",
  "Ep 398...",
];
