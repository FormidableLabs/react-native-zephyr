import {
  StyledIcon,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
  theme,
} from "./styles";
import * as React from "react";

/**
 * Now playing
 */
export const NowPlaying = () => {
  return (
    <StyledView classes={["p:1"]}>
      <StyledView classes={["bg:gray-900", "rounded:md", "overflow:hidden"]}>
        <StyledView
          classes={["p:1.5", "flex:row", "justify:between", "items:center"]}
        >
          <StyledView classes={["flex:row"]}>
            <StyledView
              classes={["aspect:1", "w:10", "bg:gray-300", "rounded:md"]}
            />
            <StyledView classes={["ml:2", "justify:center"]}>
              <StyledView classes={["flex:row"]}>
                <StyledText classes={["color:white"]}>Aim Steady</StyledText>
                <StyledText classes={["color:white", "mx:1"]}>
                  {"\u2022"}
                </StyledText>
                <StyledText classes={["color:gray-300", "text:sm"]}>
                  Zero 9:36, boonn
                </StyledText>
              </StyledView>
              <StyledView classes={["flex:row", "items:center"]}>
                <StyledIcon
                  name="ios-musical-notes-outline"
                  classes={["mr:1"]}
                  color={theme.colors["green-500"]}
                />
                <StyledText classes={["text:xs", "color:green-500"]}>
                  GRANT'S MACBOOK PRO
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
          <StyledView classes={["flex:row", "items:center"]}>
            <StyledTouchableOpacity>
              <StyledIcon
                name="laptop-outline"
                classes={["color:green-500", "mr:3"]}
                size={20}
              />
            </StyledTouchableOpacity>
            <StyledTouchableOpacity>
              <StyledIcon name="pause" classes={["color:white"]} size={20} />
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
        <StyledView
          classes={[
            "h:0.5",
            "bg:gray-700",
            "mx:2",
            "rounded:lg",
            "overflow:hidden",
          ]}
        >
          <StyledView
            classes={[
              "absolute",
              "inset-y:0",
              "left:0",
              "w:1/3",
              "h:0.5",
              "bg:white",
            ]}
          />
        </StyledView>
      </StyledView>
    </StyledView>
  );
};
