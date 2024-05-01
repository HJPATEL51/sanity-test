import React from "react";
import RedCrossMark from "@images/red_cross_mark.svg";
import Image from "next/image";
import OptionsCard from "@/components/common/OptionsCard";

interface Props {
  options: any[];
}

const ResultFalseAnswer: React.FC<Props> = ({ options }) => {

  return (
    <div className="w-full flex flex-col gap-[15px] items-center md:py-[15px]">
      <div className="flex gap-[10px] items-center">
        <Image src={RedCrossMark} alt="" className="sm:w-[14px]" />
        <span className="text-[24px] sm:text-[16px] font-[Carrosserie-Bold] text-red leading-[20px]">
          THE OTHER OPTIONS
        </span>
      </div>
      <div className="w-full sm:w-full md:w-full flex flex-col gap-[20px] items-center justify-start max-h-[calc(100vh_-_185px)] overflow-y-scroll xl:max-h-full xl:overflow-hidden">
        <OptionsCard options={options} />
      </div>
    </div>
  );
};

export default ResultFalseAnswer;
