import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import QuestionTitle from "@/components/common/QuestionTitle";
import QuestionOptions from "@/components/common/QuestionOptions";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/slices/user";
import { getCookie } from "@/helper";
import { useTheme } from "next-themes";
import classNames from "classnames";
import { setQuestionId } from "@/store/slices/questionId";

const Home = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [questionData, setQuestionData] = useState({
    publishedDate: "",
    title: "",
    animatedGif: "",
    options: [],
    _id: "",
    slug: "",
  });  

  const getUser = async (userId: any) => {
    try {
      let url = `/api/user`;
      if (userId) {
        url = `${url}?userId=${userId}`;
      }

      const res = await axios.get(url);
      if (res && res.data && res.data.data) {
        dispatch(setUserInfo(res.data.data));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestion = async () => {
    try {
      const data = await axios.get("/api/question");
      setQuestionData(data.data.data);
      dispatch(setQuestionId(data?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const CurrentDate = (publishedDate: string) => {
    const parsedDate = new Date(publishedDate);
    if (isNaN(parsedDate.getTime())) {
      return (
        <span className="text-primary translate-y-1/2">
          Hold on! We&apos;re getting ready!
        </span>
      );
    }
    const formattedDate = format(parsedDate, "MMMM dd, yyyy");
    return formattedDate;
  };

  useEffect(() => {
    fetchQuestion();
    const userId = getCookie("mdj_auth_userId");
    getUser(userId);
  }, []);

  useEffect(() => {
    fetch("/api/sendNotification")
      .then((response) => response.json())
      .then((data) => {
        if (
          data.message ===
          "Notification sent: Great news! New mot de jur is live."
        ) {
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification("Great news! New mot de jur is live.");
          }
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");

  const isPublishedDateCurrent =
    questionData?.publishedDate === formattedCurrentDate;

  return (
    <>
      {isLoading && (
        <div className="absolute top-[50%] left-[50%]">
          <svg
            fill="#fff"
            className="animate-spin h-8 w-8 mr-3 ..."
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#22467C"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              style={{ fill: theme === "dark" ? "#22467C" : "#fff" }}
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {!isLoading && (
        <div className="w-full md:px-[15px] text-center fixed top-[50%] left-[50%] sm:top-0 transform -translate-x-1/2 -translate-y-1/2 xl:pt-[30px] lg:pt-[30px] xl:w-auto xl:translate-x-0 lg:translate-x-0 sm:translate-x-0 xl:translate-y-0 lg:translate-y-0 sm:translate-y-0 xl:left-0 lg:left-0 sm:left-0 xl:static lg:static sm:static sm:overflow-x-hidden md:overflow-x-hidden lg:overflow-x-hidden">
          <p
            className={classNames(
              "mb-[26px] lg:mb-[10px] sm:mt-0 text-[14px] sm:text-[11px] font-light leading-5 font-[gtamerica-thin]",
              { "mb-0": !isPublishedDateCurrent }
            )}
          >
            {CurrentDate(questionData?.publishedDate)}
          </p>
          {isPublishedDateCurrent && (
            <>
              <QuestionTitle
                title={questionData?.title}
                animatedGif={questionData?.animatedGif}
                slug={questionData?.slug}
              />
              <QuestionOptions
                options={questionData?.options}
                _id={questionData?._id}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
