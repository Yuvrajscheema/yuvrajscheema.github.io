import React from "react";

interface LoaderProps {
  size?: number;   // total width/height in px
  color?: string;  // tile color
  gap?: number;    // space between tiles
}

const Loader: React.FC<LoaderProps> = ({ size = 60, color = "#555", gap = 4 }) => {
  const rows = 3;
  const cols = 3;
  const tileSize = (size - gap * (cols - 1)) / cols;

  const tiles = Array.from({ length: rows * cols }, (_, i) => (
    <div key={i} className="tile" />
  ));

  const style: React.CSSProperties = {
    width: size,
    height: size,
    display: "grid",
    gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
    gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
    gap: `${gap}px`,
    ["--loader-color" as any]: color, // CSS variable for SCSS to use
  };

  return (
    <div className="loader-wrapper">
      <div className="mosaic-loader" style={style}>
        {tiles}
      </div>
    </div>
  );
};

export default Loader;

