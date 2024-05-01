import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import JSConfetti from "js-confetti";

interface Option {
  title: string;
  isCorrect: boolean;
  _key: string;
}

interface Props {
  options: Option[];
  _id: string;
}

const QuestionOptions: React.FC<Props> = ({ options, _id }) => {
  const [correct, setCorrect] = useState("");
  const confettiRef = useRef(null);
  const [answer, setAnswer] = useState({
    label: "",
    key: "",
  });
  const [isSelected, SetIsSelected] = useState(false);
  const jsConfetti = new JSConfetti();
  const router = useRouter();
  const userId: string | undefined = useSelector(
    (state: RootState) => state.user.data?._id
  );
  const createdAt = new Date();
  const payload = {
    userId: userId,
    createdAt: createdAt,
    selectedOption: answer.label,
    result: correct,
    questionRef: {
      _type: "reference",
      _ref: _id,
    },
  };

  const handleClick = (selectedAnswer: any, isCorrect: any, _key: any) => {
    SetIsSelected(true);
    setCorrect(isCorrect);
    setAnswer({
      label: selectedAnswer,
      key: _key,
    });
    setTimeout(() => {
      router.push("/result");
    }, 4000);
  };

  useEffect(() => {
    const emojiListTrue = ["😉", "🤗", "🤩", "🤓", "🥳", "🎉", "😊"];
    const emojiListFalse = ["😞", "😶", "😵", "😔", "😓", "🥺"];
    const isMobile = window.innerWidth < 768;

    if (answer.label) {
      const interval = setInterval(
        () => {
          const emojiList = correct ? emojiListTrue : emojiListFalse;
          let emojiSize = 55;

          if (isMobile) {
            emojiSize = 100;
          }
          jsConfetti.addConfetti({
            emojis: emojiList,
            emojiSize: emojiSize,
            confettiNumber: isMobile ? 5 : 3,
          });
        },
        isMobile ? 500 : 200
      );

      axios
        .post("/api/setResponse", payload)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error saving user data:", error);
        });

      return () => {
        clearInterval(interval);
      };
    }
  }, [answer.label]);

  return (
    <div
      ref={confettiRef}
      className="w-full flex flex-col items-center gap-[58px]"
    >
      <div className="w-[1200px] sm:w-full md:w-full lg:w-full pt-[34px] inline-flex flex-wrap justify-center gap-[20px]">
        {options &&
          options.length > 0 &&
          options?.map((data, index) => {
            return (
              <div
                className={classNames("gap-[15px] sm:gap-[8px] md:w-full", {
                  "pointer-events-none": answer.label,
                })}
                key={index}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleClick(data.title, data.isCorrect, data._key)
                  }
                  className={classNames(
                    "w-[400px] md:w-full p-[15px] border rounded-[60px] border-solid border-primary dark:border-white hover:shadow-xl sm:hover:shadow-none md:hover:shadow-none lg:hover:shadow-none xl:hover:shadow-none hover:transition hover:duration-700 group",
                    {
                      "!bg-greenDark focus:bg-greenDark":
                        correct && answer.label === data.title,
                      "!bg-redDark focus:bg-redDark":
                        !correct && answer.label === data.title,
                      "!border-0":
                        answer.label !== "" && answer.label === data.title,
                      "bg-paleBlue": isSelected && answer.label === data.title,
                    }
                  )}
                >
                  <div className="flex gap-[15px] items-center">
                    <div
                      className={classNames(
                        "w-[40px] h-[40px] flex items-center justify-center border border-primary dark:border-white rounded-[100px] text-[20px] leading-6 text-primary font-[Carrosserie-Bold] font-medium group-hover:border group-hover:border-[#cde2f3] sm:text-[18px] group-hover:bg-primary group-hover:text-white dark:text-white",
                        {
                          "bg-primary": answer.key === data._key,
                          "border-0": answer.label === data.title,
                          "!text-redDark":
                            !correct && answer.label === data.title,
                          "!text-greenDark":
                            correct && answer.label === data.title,
                          "!bg-white": answer.label === data.title,
                          "dark:text-red":
                            !correct && answer.label === data.title,
                          "dark:text-greenDark":
                            correct && answer.label === data.title,
                        }
                      )}
                    >
                      {index === 0
                        ? "A"
                        : index === 1
                        ? "B"
                        : index === 2
                        ? "C"
                        : "D"}
                    </div>
                    <p
                      className={classNames(
                        "text-[24px] z-[100] sm:text-[18px] text-primary leading-7 font-[gtamerica-thin] dark:text-white dark:group-hover:text-black",
                        {
                          "text-white": answer.label === data.title,
                        }
                      )}
                    >
                      {data.title}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
      </div>
      <div>
        {(answer.label && correct && (
          <>
            <h3 className="mb-[12px] text-[40px] leading-[48px] font-[Carrosserie-Bold] sm:text-[24px] sm:leading-[28px] text-[#70A26C] dark:text-white">
              Hooray!
            </h3>
            <p className="text-[14px] leading-5 font-[Carrosserie-Bold] sm:hidden text-[#70A26C] dark:text-white">
              This is an encouraging message
            </p>
          </>
        )) ||
          (answer.label && !correct && (
            <>
              <h3 className="mb-[12px] text-[40px] sm:text-[24px] leading-[48px] sm:leading-[28px] font-[Carrosserie-Bold] text-[#BF3940] dark:text-white">
                Oh oh!
              </h3>
              <p className="text-[14px] leading-5 font-[Carrosserie-Bold] sm:hidden text-[#BF3940] dark:text-white">
                This is an error message
              </p>
            </>
          ))}
      </div>
    </div>
  );
};

export default QuestionOptions;
