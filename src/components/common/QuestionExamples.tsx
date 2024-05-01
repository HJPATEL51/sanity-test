import React from "react";

interface Props {
  question_examples: any[];
}

const QuestionExamples: React.FC<Props> = ({ question_examples }) => {
  return (
    <div className="flex flex-col gap-[10px]">
      {question_examples.map((ele, index) => {
        return (
          <div
            className="flex p-[10px] items-baseline gap-[10px] rounded-[10px] border border-[#eef0f6]"
            key={index}
          >
            <div className="text-[11px] leading-4 text-primary font-[GT-America-Standard-Medium-Trial] font-medium dark:text-white">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="flex flex-col">
              <p className="text-[16px] font-[RecklessNeue-Regular] font-light leading-[22px] text-primary dark:text-white">
                {ele.question_example_english}
              </p>
              <p className="text-[16px] font-[RecklessNeue-LightItalic] font-light leading-[22px] text-[#353535] dark:text-white">
                {ele.question_example_french}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionExamples;
