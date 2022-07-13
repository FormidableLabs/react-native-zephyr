import React from "react";
import { twColors as colorPalette } from "../../packages/core/src/handlers/twColors";

export function kebabToTitleCase(str: string) {
  return str
    .replace(/(?:^|-)([a-z])/gi, (_m, p1) => ` ${p1.toUpperCase()}`)
    .trim();
}

export function ColorPaletteReference({
  colors,
}: {
  colors?: Array<keyof typeof colorPalette>;
}) {
  const displayColors = colors
    ? colors
    : (Object.keys(colorPalette) as Array<keyof typeof colorPalette>);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
        gap: "2rem",
      }}
    >
      {displayColors.map((color, i) => {
        if (!(color in colorPalette)) return null;
        const title = kebabToTitleCase(color);
        const colorVariant = colorPalette[color];
        if (typeof colorVariant !== "object") return null;
        const palette = Object.keys(colorVariant).map((variant) => ({
          name: variant,
          // @ts-ignore
          value: colorPalette?.[color]?.[variant],
        }));
        return (
          <div key={i}>
            <div
              style={{
                display: "flex",
                marginTop: "0.875rem",
                fontSize: "0.75rem",
                lineHeight: "1rem",
                flexDirection: "column",
              }}
            >
              <div style={{ width: "4rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "2.5rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.25rem",
                      fontWeight: "600",
                    }}
                  >
                    {title
                      .split("")
                      .flatMap((l, i) => {
                        return i !== 0 && l.toUpperCase() === l
                          ? [" ", l]
                          : [l];
                      })
                      .join("")}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  flex: "1 1 0%",
                  minWidth: "0",
                  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                  columnGap: "1rem",
                  rowGap: "0.75rem",
                }}
              >
                {palette?.map(({ name, value }, j) => {
                  return (
                    <div key={j} style={{ marginTop: "0.375rem" }}>
                      <div
                        style={{
                          backgroundColor: value,
                          width: "100%",
                          height: "2.5rem",
                          borderRadius: "0.25rem",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          marginTop: "0.375rem",
                          paddingLeft: "0.125rem",
                          paddingRight: "0.125rem",
                        }}
                      >
                        <div style={{ fontWeight: "500", width: "1.5rem" }}>
                          {name}
                        </div>
                        <div
                          style={{
                            fontFamily:
                              'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                            textTransform: "lowercase",
                          }}
                        >
                          {value?.replace(/^#[a-f0-9]+/gi, (m: string) =>
                            m.toUpperCase()
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
