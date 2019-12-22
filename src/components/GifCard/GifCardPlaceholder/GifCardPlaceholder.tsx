import React, { CSSProperties, ReactNode } from "react";

export interface GifPlaceholderProps {
  index: number;
  style: CSSProperties;
  gifCardStyle: CSSProperties;
  children?: ReactNode;
}

export const GifCardPlaceholder: React.FC<GifPlaceholderProps> = ({
  index,
  style,
  gifCardStyle,
  children
}) => (
  <div className="gif-wrapper" style={style}>
    <div className="gif-card" style={gifCardStyle}>
      <h1># {index + 1}</h1>
      {children}
    </div>
  </div>
);
