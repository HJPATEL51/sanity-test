import classNames from "classnames";
import React from "react";

interface Props {
  options: any[];
}

const OptionsCard: React.FC<Props> = ({ options }) => {
  return (
    <>
      {options.map((ele, index) => {
        return (
          ele.isCorrect === false && (
            <div className="w-[390px] md:w-full flex flex-col" key={index}>
              <div className="flex items-center bg-red p-[15px] gap-[10px] border border-[#EEF0F6] dark:border-[#5C5E63] rounded-t-[20px]">
                <div className="w-[25px] h-[25px] border-white bg-white rounded-[50%] flex items-center justify-center text-[15.5px] text-red font-[Carrosserie-Bold]">
                  {index === 0 && ele.isCorrect === false ? "A" : null}
                  {index === 1 && ele.isCorrect === false ? "B" : null}
                  {index === 2 && ele.isCorrect === false ? "C" : null}
                  {index === 3 && ele.isCorrect === false ? "D" : null}
                </div>
                <span className="text-[18px] md:text-[16px] font-medium text-white font-[GT-America-Standard-Medium-Trial]">
                  {ele.title}
                </span>
              </div>
              <div className="bg-shadow pb-[5px] dark:pb-0 rounded-b-[20px] dark:bg-[#313337]">
                <div
                  className={classNames(
                    "flex flex-col px-[15px] pt-[15px] pb-[30px] gap-[5px] md:gap-[8px] bg-white border border-[#EEF0F6] dark:border-[#5C5E63] rounded-b-[20px] dark:bg-white/[.10]",
                    { "gap-[8px]": ele?.isExist }
                  )}
                >
                  {ele?.isExist ? (
                    <p className="text-[14px] font-[GTAmerica-Regular] font-medium leading-4 text-red dark:text-white">
                      Doesn&apos;t Exit
                    </p>
                  ) : (
                    <p className="text-[14px] font-[gtamerica-thin] font-light leading-4 text-[#353535] dark:text-white">
                      Means:
                    </p>
                  )}
                  {ele?.isExist && (
                    <p className="text-[18px] md:text-[16px] font-[GTAmerica-Regular] font-medium leading-5 text-primary dark:text-white">
                      {ele.title}
                    </p>
                  )}
                  {ele?.isExist ? (
                    <p className="text-[14px] font-light leading-5 text-[#353535] font-[gtamerica-thin] dark:text-white">
                      {ele.optionMeaning}
                    </p>
                  ) : (
                    <p className="text-[18px] md:text-[16px] font-medium leading-5 text-primary font-[GT-America-Standard-Medium-Trial] dark:text-white">
                      {ele.optionMeaning}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      })}
    </>
  );
};

export default OptionsCard;
