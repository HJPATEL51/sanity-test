import React, { useEffect, useState } from "react";

interface Props {
  title: string;
  animatedGif: string;
  slug: string;
}

const QuestionTitle: React.FC<Props> = ({ title, animatedGif, slug }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0 });
  const [showImage, setShowImage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.width / 2;
      const y = rect.height / 2;
      setShowImage(true);
    } else {
      setCursorPosition({ x: e.clientX });
    }
  };

  const handleMOuseEnter = () => {
    setShowImage(true);
  };

  const handleMouseLeave = () => {
    setShowImage(false);
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <div
      className="w-full h-auto font-[RecklessNeue-Thin] text-[64px] sm:text-[32px] leading-[90px] 
                    sm:leading-10 text-primary font-light cursor-pointer dark:text-white"
    >
      <div className="w-full m-auto flex flex-col gap-[20px] md:gap-[10px] items-center justify-center">
        {slug ? (
          <span className="text-[24px] md:text-[16px] font-[RecklessNeue-Thin] leading-[28px] md:leading-[19px]">
            {slug}
          </span>
        ) : (
          ""
        )}
        <h1
          className="group z-10 relative"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMOuseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {title}
        </h1>
      </div>
      {showImage && (
        <img
          className={`w-[306px] h-[226px] object-contain overflow-hidden sm:w-full`}
          src={animatedGif}
          alt="Animated GIF"
          style={{
            position: "absolute",
            top: "0px",
            left: `${cursorPosition.x}px`,
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

export default QuestionTitle;
