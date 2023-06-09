import React, { useState, useEffect } from "react";

const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  var currentIndex = 0;
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const animateText = () => {
      if (currentIndex < text.length) {
        setTimeout(() => {
          setDisplayedText((prevText) => prevText + text[currentIndex]);
          currentIndex++;
        }, 40);
      }
    };

    animateText();

    // return () => {
    //   if (timer) {
    //     clearTimeout(timer);
    //   }
    // };
  }, [text, currentIndex]);

  return <span>{displayedText}</span>;
};

export default TypewriterEffect;
