import React, { CSSProperties, ReactNode } from "react";
import "./GifCardPlaceholder.scss";

interface GifPlaceholderProps {
  index: number;
  style: CSSProperties;
  children?: ReactNode;
}

export const GifCardPlaceholder: React.FC<GifPlaceholderProps> = ({
  index,
  style,
  children
}) => (
  <div className="gif-wrapper" style={style}>
    <div className="gif-card">
      <h1># {index + 1}</h1>
      {children}
    </div>
  </div>
);
