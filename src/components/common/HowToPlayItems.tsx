import React from "react";

const data = [
  {
    option: "Le pomme",
  },
  {
    option: "Une pomme",
  },
  {
    option: "Le applet",
  },
  {
    option: "Pomme",
  },
];

const HOwToPlayItems = () => {
  return (
    <div className="flex flex-col gap-[20px] md:gap-[15px]">
      <div className="text-[14px] md:px-[20px] md:leading-4 leading-5 text-accentDark dark:text-white font-light font-[gtamerica-thin]">
        Win or lose, each attempt is a learning opportunity, as we reveal the
        correct translation afterwards. Share your achievements and encourage
        friends to join the fun.
      </div>
      <div>
        <p className="text-[14px] md:px-[20px] md:leading-4 leading-5 text-accentDark dark:text-white font-light font-[gtamerica-thin]">
          The Mot Du Jour is a fun way to improve your French to English
          translation skills. Enjoy and learn!
        </p>
      </div>
      <div className="text-[14px] md:px-[20px] leading-5 text-accentDark dark:text-white font-light md:leading-4 font-[gtamerica-thin]">
        <ul className="pl-[15px] list-disc gap-[20px]">
          <li>You&apos;ll be presented with a word or sentence in French.</li>
          <li>
            Below the French word or sentence, four English translations will be
            displayed. Your task is to pick the correct English translation.
          </li>
          <li>But you only get one chance per day, so choose carefully!</li>
        </ul>
      </div>
      <div className="text-primary md:px-[20px] text-[14px] md:text-[12px] dark:text-white font-[GT-America-Standard-Medium-Trial] leading-5 md:leading-4">
        EXAMPLE:
      </div>
      <div className=" text-center text-primary text-[20px] md:text-[18px] font-[RecklessNeue-Thin] dark:text-white leading-[24px] md:leading-3">
        An apple
      </div>
      <div className="w-full inline-flex md:px-[20px] flex-wrap gap-[5px] justify-center flex-warp text-[12px] font-[gtamerica-thin] leading-4">
        <div className="flex w-full gap-[5px]">
          {data.slice(0, 2).map((ele: any, index: number) => (
            <div
              key={index}
              className="flex items-center gap-[10px] dark:text-white w-[191px] px-[14px] py-[5px] border rounded-[26px] border-primary"
              style={{
                backgroundColor: index === 1 ? "#36A93F" : "white",
                border: index === 1 ? "none" : "",
              }}
            >
              <div
                className="w-[25px] h-[25px] border border-primary bg-white dark:bg-black rounded-[50%] flex items-center justify-center text-[10px] text-primary dark:text-white font-[Carrosserie-Bold]"
                style={{
                  color: index === 1 ? "#36A93F" : "",
                  border: index === 0 ? "" : "none",
                }}
              >
                {index === 0 ? "A" : null}
                {index === 1 ? "B" : null}
              </div>
              <span
                className="text-primary text-[12px] dark:text-black font-[gtamerica-thin]"
                style={{ color: index === 1 ? "white" : "" }}
              >
                {ele.option}
              </span>
            </div>
          ))}
        </div>
        <div className="flex w-full gap-[5px]">
          {data.slice(2, 4).map((ele: any, index: number) => (
            <div
              key={index + 2}
              className="flex items-center gap-[10px] dark:text-white w-[191px] px-[14px] py-[5px] border rounded-[26px] border-primary"
            >
              <div className="w-[25px] h-[25px] border border-primary bg-white dark:bg-black rounded-[50%] flex items-center justify-center text-[10px] text-primary dark:text-white font-[Carrosserie-Bold]">
                {index + 2 === 2 ? "C" : null}
                {index + 2 === 3 ? "D" : null}
              </div>
              <span className="text-primary text-[12px] dark:text-black font-[gtamerica-thin]">
                {ele.option}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[15px]">
        <div className="md:px-[20px]">
          <p className="border border-ligthBlack border-t-0"></p>
        </div>
        <p className="text-[14px] md:text-[12px] pl-[20px] font-[GTAmerica-Regular] leading-[19px] text-accentDark dark:text-white font-light">
          A new Mot Du Jour is released daily at midnight.
        </p>
        <div className="md:px-[20px]">
          <p className="border border-ligthBlack border-t-0"></p>
        </div>
      </div>
    </div>
  );
};

export default HOwToPlayItems;
