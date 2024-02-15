import React, { useState, useEffect } from "react";
import { AiFillSound } from "react-icons/ai";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-Hans";
    u.rate = 0.3;

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;
    if( synth.speaking){
      return 
    }

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div>
      <button
        onClick={handlePlay}
        style={{
          width: "30px",
          height: "20px",
          fontSize: "10px",
          borderRadius: "8px",
          // background: "purple",
          color: "white",
        }}
      >
        <AiFillSound style={{color:"black"}}/>
        {/* {isPaused ? "Resume" : "Play"} */}
      </button>
    </div>
  );
};

export default TextToSpeech;
