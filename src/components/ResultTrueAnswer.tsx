import React, { useEffect, useState } from "react";
import classNames from "classnames";
import GreenCheckMarkButton from "@images/green_check_mark_button.svg";
import ExclamationTriangle from "@images/exclamation_triangle.svg";
import Image from "next/image";
import FeedBackDialog from "@/components/FeedBack";
import { motion } from "framer-motion";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { CSSProperties } from "react";
import { useTheme } from "next-themes";
import CrossGreyIcon from "@images/cross_grey_icon.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  options: any[];
}

const customDark: CSSProperties = {
  background: "rgba(0, 0, 0, 1)",
};

const customLight: CSSProperties = {
  background: "rgba(255, 255, 255, 1)",
};

const FeedBackTitle = [
  {
    name: "I can’t hear the audio pronunciation properly",
  },
  {
    name: "The audio pronunciation doesn't play",
  },
  {
    name: "I can’t see the other answers explanations",
  },
  {
    name: "My answer was the right one",
  },
];

const ResultTrueAnswer: React.FC<Props> = ({ options }) => {
  const [showAnswerBugReport, setShowAnswerBugReport] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useTheme();
  const questionId: any = useSelector(
    (state: RootState) => state.questionId.data?._id
  );
  const qusetion: any = useSelector(
    (state: RootState) => state.questionId.data?.titleEnglish
  );

  const handleAnswerBugDialog = () => {
    setShowAnswerBugReport(true);
    setIsOpen((prevState) => !prevState);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Adjust the threshold as needed
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hanldeBugDialog = () => {
    setIsOpen((prevState) => !prevState);
    document.body.style.overflow = "";
  };

  const handleReportBug = async (text: string) => {
    try {
      const data = await fetch("/api/reportBug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, questionId, qusetion }),
      });
      const result = await data.json();
      console.log("result", result);
      alert("Your bug has been reported. Thank you!");
    } catch (error) {
      alert("Something went wrong...");
    }
    setIsOpen(false);
    setShowAnswerBugReport(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      {options.map(
        (ele, index) =>
          ele.isCorrect === true && (
            <div className="w-full pt-[16px] md:pt-[15px]" key={index}>
              <div
                className={classNames(
                  "w-full px-[30px] py-[12px] sm:p-[15px] border border-[#EEF0F6] dark:border-none rounded-t-[20px] bg-greenDark flex justify-between items-center"
                )}
              >
                <div className="flex items-center gap-[15px] sm:gap-[8px]">
                  <Image alt="" src={GreenCheckMarkButton} width={24} height={24}/>
                  <div className="flex gap-[8px] sm:items-center items-center">
                    <span className="text-white md:text-[16px] text-[24px] font-[Carrosserie-Bold] leading-6 sm:leading-[16px]">
                      OPTION
                    </span>
                    <span
                      className={classNames(
                        "w-[28px] h-[28px] bg-white text-greenDark rounded-[62px] text-[16px] sm:text-[14px] font-[Carrosserie-Bold] leading-5 sm:leading-[13px] flex justify-center items-center"
                      )}
                    >
                      {index === 0 && ele.isCorrect === true ? "A" : null}
                      {index === 1 && ele.isCorrect === true ? "B" : null}
                      {index === 2 && ele.isCorrect === true ? "C" : null}
                      {index === 3 && ele.isCorrect === true ? "D" : null}
                    </span>
                  </div>
                </div>
                <Image
                  alt=""
                  src={ExclamationTriangle}
                  onClick={handleAnswerBugDialog}
                  className="cursor-pointer"
                />
              </div>
            </div>
          )
      )}
      {showAnswerBugReport && !isMobile && (
        <FeedBackDialog
          showAnswerBugReport={showAnswerBugReport}
          setShowAnswerBugReport={setShowAnswerBugReport}
          FeedBackTitle={FeedBackTitle}
          questionId={questionId}
          qusetion={qusetion}
        />
      )}
      {showAnswerBugReport && isMobile && (
        <Drawer
          open={isOpen}
          direction="bottom"
          className="!w-full !h-auto rounded-t-[20px] hidden sm:block md:block"
          style={theme === "dark" ? customDark : customLight}
        >
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-full flex flex-col gap-[15px] pt-[15px] pb-[20px] px-[20px]">
              <div className="w-full flex items-end justify-end">
                <Image
                  alt=""
                  src={CrossGreyIcon}
                  onClick={hanldeBugDialog}
                  className="cursor-pointer dark:filter dark:brightness-0 dark:invert"
                />
              </div>
              {FeedBackTitle.map((ele, index) => {
                return (
                  <p
                    key={index}
                    className="flex flex-col text-[14px] text-accentDark cursor-pointer dark:text-white leading-5 font-[gtamerica-thin]"
                    onClick={() => handleReportBug(ele.name)}
                  >
                    {ele.name}
                    <span className="border border-lightGrey border-t-0 border-r-0 border-l-0 mt-[15px]"></span>
                  </p>
                );
              })}
            </div>
          </motion.div>
        </Drawer>
      )}
    </>
  );
};

export default ResultTrueAnswer;
