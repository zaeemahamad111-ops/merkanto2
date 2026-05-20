"use client";

import React from "react";

interface AlternatingTextProps {
  text: string;
  className?: string;
  highlightIndices?: number[]; // indices of words to style with primary gold color
}

export default function AlternatingText({ text, className = "", highlightIndices }: AlternatingTextProps) {
  if (!text) return null;

  // Strip HTML tags if any exist (e.g. from previous span injections)
  const cleanText = text.replace(/<[^>]*>/g, "");
  const words = cleanText.split(/\s+/);

  return (
    <span className={className}>
      {words.map((word, index) => {
        const isBold = index % 2 === 0;
        const isHighlighted = highlightIndices?.includes(index);
        
        return (
          <span
            key={index}
            className={`${
              isBold ? "font-bold text-white" : "font-light text-on-surface-variant/80"
            } ${isHighlighted ? "!text-primary" : ""}`}
          >
            {word}{index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}
