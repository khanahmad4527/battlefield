import { MdMusicNote, MdMusicOff } from "react-icons/md";
import React, { useState } from "react";
function AudioPlayer() {
  const [audio] = useState(
    new Audio(
      "https://drive.google.com/uc?id=1Dis7qHbE2-xwAO5Z2vNFsD2XUh4vNYwr"
    )
  );
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handlePlay = () => {
    audio.play();
    setAudioPlaying(true);
  };

  const handlePause = () => {
    audio.pause();
    setAudioPlaying(false);
  };

  return (
    <div>
      <button
        onClick={audioPlaying ? handlePause : handlePlay}
        className="border-2 border-white p-2 rounded-lg"
      >
        {audioPlaying ? <MdMusicOff /> : <MdMusicNote />}
      </button>
    </div>
  );
}

export default AudioPlayer;
