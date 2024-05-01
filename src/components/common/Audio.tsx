import React, { useState, useEffect } from "react";
import Image from "next/image";
import VolumeIcon from "@images/volume_icon.svg";

interface Props {
  phonetic: string;
  audio: any;
}

const Audio: React.FC<Props> = ({ phonetic, audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const fullAudioLink = audio?.asset?._ref;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () => {
          setIsPlaying(false);
        });
      }
    };
  }, [audioRef]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const getAudioUrl = () => {
    let url = "";
    if (fullAudioLink) {
      const parts = fullAudioLink.split("-");
      if (parts.length >= 2) {
        url = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATABASE}/${parts[1]}.mp3`;
      }
    }
    return url;
  };

  return (
    <div className="flex border border-primary rounded-[30px] items-center self-start bg-[#EEF0F6] dark:bg-black dark:border-white/[.45]">
      <div
        className="bg-primary px-[15px] py-[15px] border border-primary rounded-[30px] cursor-pointer dark:bg-white"
        onClick={toggleAudio}
      >
        <audio
          controls
          src={getAudioUrl()}
          ref={audioRef}
          className="hidden"
        ></audio>
        <Image
          alt=""
          src={VolumeIcon}
          className="dark:filter dark:brightness-100 dark:invert"
        />
      </div>
      <div className="pl-[14px] pr-[20px] text-[14px] text-primary leading-5 font-[TimesRoman] font-light dark:text-white">
        / {phonetic} /
      </div>
    </div>
  );
};

export default Audio;
