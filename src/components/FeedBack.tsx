import React from "react";
import Modal from "react-modal";
import Image from "next/image";
import { useTheme } from "next-themes";
import CrossIcon from "@images/cross_grey_icon.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type Props = {
  showAnswerBugReport: any;
  setShowAnswerBugReport: any;
  onItemClick?: any;
  FeedBackTitle: any;
  questionId: any;
  qusetion: any;
};

const customDark = {
  overlay: {
    background: "rgba(0, 0, 0, 0.75)",
  },
};

const customLight = {
  background: "rgba(255, 255, 255, 0.75)",
};

const FeedBackDialog: React.FC<Props> = (props) => {
  const {
    showAnswerBugReport,
    setShowAnswerBugReport,
    onItemClick,
    FeedBackTitle,
    questionId,
    qusetion,
  } = props;
  const { theme } = useTheme();

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
    setShowAnswerBugReport(false);
    document.body.style.overflow = "";
  };

  const handleClose = () => {
    setShowAnswerBugReport(false);
    document.body.style.overflow = "";
  };

  return (
    <Modal
      className="w-[489px] md:w-[320px] md:p-[20px] p-[30px] flex flex-col gap-[20px] flex-start rounded-[30px] bg-white dark:bg-black 
        shadow-[4px_4px_40px_0px_rgba(0,0,0,0.20)] outline-none top-1/2 left-1/2 absolute right-auto bottom-auto 
        -translate-x-1/2 -translate-y-1/2 dark:border font-[gtamerica-thin]"
      setShowDialog={setShowAnswerBugReport}
      isOpen={showAnswerBugReport}
      style={theme === "dark" ? customDark : customLight}
    >
      <div className="w-full">
        <Image
          alt=""
          src={CrossIcon}
          onClick={handleClose}
          className="cursor-pointer dark:filter dark:brightness-0 dark:invert absolute right-0 mr-[30px]"
        />
        {FeedBackTitle.map((ele: any, index: number) => {
          return (
            <p
              key={index}
              className="flex flex-col my-[15px] text-[14px] text-accentDark cursor-pointer dark:text-white leading-5 font-[gtamerica-thin]"
              onClick={() => handleReportBug(ele.name)}
            >
              {ele.name}
              <span className="border border-lightGrey border-t-0 border-r-0 border-l-0 mt-[15px]"></span>
            </p>
          );
        })}
      </div>
    </Modal>
  );
};

export default FeedBackDialog;
