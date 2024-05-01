import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ResultTrueAnswer from "@/components/ResultTrueAnswer";
import ResultFalseAnswer from "@/components/ResultFalseAnswer";
import Image from "next/image";
import Audio from "@/components/common/Audio";
import GrammarBlurb from "@/components/common/GrammerBlurb";
import QuestionExamples from "@/components/common/QuestionExamples";
import FaceBookIcon from "@images/facebook_icon.svg";
import TwitterIcon from "@images/twitter_icon.svg";
import WhatsappIcon from "@images/whatsapp_icon.svg";
import LinkedInIcon from "@images/linkedin_icon.svg";
import MailIcon from "@images/envelope_icon.svg";
import LinkIcon from "@images/link_icon.svg";
import PrintIcon from "@images/print_icon.svg";
import DownloadIcon from "@images/download_icon.svg";
import RightArrowIcon from "@images/arrow_right_icon.svg";
import FlagIslandIocn from "@images/flag_island_icon.svg";
import MobileAdvertisementDialog from "@/components/common/mobileAdvertisementDialog";
import Link from "next/link";
import { useTheme } from "next-themes";
import Footer from "@/components/common/Footer";
import { siteSettingInterface } from "@/interfaces";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import AdvertisementPopUp from "@/components/common/AdvertisementPopUp";
import PlusIcon from "@images/plus_icon.svg";
import Marquee from "react-fast-marquee";
import classNames from "classnames";
import ChartIcon from "@images/footer_chat_icon.svg";
import Spinner from "@/components/common/Spinner";
import { toHTML } from "@portabletext/to-html";

const Result = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showmobileKeepLearning, setShowMobileKeepLearning] = useState(false);
  const [dialogImageUrl, setDialogImageUrl] = useState("");
  const [pdfDownloading, setPdfDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [questionResultData, setQuestionResultData] = useState({
    options: [],
    grammarBlurb: [],
    question_examples: [],
    titleEnglish: "",
    titleFrench: "",
    phonetic: "",
    description: [],
    audio: null,
    isExist: false,
    publishedDate: "",
  });

  const advertisementDialogData: siteSettingInterface | null = useSelector(
    (state: RootState) => {
      const navLinksData = state.siteSetting.data?.navLinks;
      const faqLinks = state.siteSetting.data?.faqLinks;
      const salesImage = state.siteSetting.data?.salesImage;
      const salesCopyData = state.siteSetting.data?.salesCopy;
      const salesUrl = state.siteSetting.data?.salesUrl;
      const keepLearningSectionCopy =
        state.siteSetting.data?.keepLearningSectionCopy;
      const keepLearningSectionImage1 =
        state.siteSetting.data?.keepLearningSectionImage1;
      const keepLearningSectionUrl1 =
        state.siteSetting.data?.keepLearningSectionUrl1;
      const keepLearningSectionImage2 =
        state.siteSetting.data?.keepLearningSectionImage2;
      const keepLearningSectionUrl2 =
        state.siteSetting.data?.keepLearningSectionUrl2;
      const seeAllProduct = state.siteSetting.data?.seeAllProduct;
      return navLinksData &&
        faqLinks &&
        salesImage &&
        salesCopyData &&
        salesUrl &&
        keepLearningSectionCopy &&
        keepLearningSectionImage1 &&
        keepLearningSectionUrl1 &&
        keepLearningSectionImage2 &&
        keepLearningSectionUrl2 &&
        seeAllProduct
        ? {
            navLinks: navLinksData,
            faqLinks: faqLinks,
            salesImage: salesImage,
            salesCopy: salesCopyData,
            salesUrl: salesUrl,
            keepLearningSectionCopy: keepLearningSectionCopy,
            keepLearningSectionImage1: keepLearningSectionImage1,
            keepLearningSectionUrl1: keepLearningSectionUrl1,
            keepLearningSectionImage2: keepLearningSectionImage2,
            keepLearningSectionUrl2: keepLearningSectionUrl2,
            seeAllProduct: seeAllProduct,
          }
        : null;
    }
  );

  const { theme } = useTheme();
  const POST_URL = `https://mdj.arrowebs.net/`;
  const FACEBOOK_URL = `https://www.facebook.com/sharer.php?u=${POST_URL}`;
  const TWITTER_URL = `https://twitter.com/intent/tweet?url=${POST_URL}`;
  const WHATSAPP_URL = `https://api.whatsapp.com/send?text=${POST_URL}`;
  const EMAIL_SHARE_URL = `mailto:?body=${encodeURIComponent(POST_URL)}`;
  const LINKED_IN = `https://www.linkedin.com/sharing/share-offsite/?url=${POST_URL}`;
  const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATABASE}/${dialogImageUrl}.png`;
  let formattedDate = "";
  const date = new Date(questionResultData.publishedDate);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits for month
  const day = date.getDate().toString().padStart(2, "0"); // Ensure two digits for day
  const year = date.getFullYear();
  const printDate = `${month}-${day}-${year}`;
  const filename = `MDJ_${printDate}.pdf`;

  if (questionResultData.publishedDate) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    formattedDate = `of ${
      monthNames[date.getMonth()]
    }  ${date.getDate()}, ${date.getFullYear()}`;
  }

  const trueOptionString = questionResultData.options.reduce(
    (acc, ele: any, index) => {
      if (ele.isCorrect) {
        return acc + String.fromCharCode(65 + index);
      }
      return acc;
    },
    ""
  );

  const falseOptionsSet = new Set();
  questionResultData.options.forEach((ele: any, index: number) => {
    if (!ele.isCorrect) {
      falseOptionsSet.add(String.fromCharCode(65 + index));
    }
  });
  const falseOptions: any = Array.from(falseOptionsSet);

  const falseOptionsTitleSet = new Set();
  questionResultData.options.forEach((ele: any) => {
    if (!ele.isCorrect) {
      falseOptionsTitleSet.add(ele.title);
    }
  });
  const falseOptionsTitle: any = Array.from(falseOptionsTitleSet);

  const falseOptionsMeaningSet = new Set();
  questionResultData.options.forEach((ele: any) => {
    if (!ele.isCorrect) {
      falseOptionsMeaningSet.add(ele.optionMeaning);
    }
  });
  const falseOptionsMeaning: any = Array.from(falseOptionsMeaningSet);

  const descriptionString = toHTML(questionResultData.description).replace(
    /<\/?p>/g,
    ""
  );

  const data = {
    date: formattedDate,
    tittleEnglish: questionResultData.titleEnglish,
    titleFrench: questionResultData.titleFrench,
    phonetic: questionResultData.phonetic,
    grammarBlurb: questionResultData.grammarBlurb.join(" | "),
    description: descriptionString,
    trueOption: trueOptionString,
    falseOption1: falseOptions.length > 0 ? falseOptions[0] : "",
    falseOption2: falseOptions.length > 0 ? falseOptions[1] : "",
    falseOption3: falseOptions.length > 0 ? falseOptions[2] : "",
    falseOptionTitle1: falseOptionsTitle.length > 0 ? falseOptionsTitle[0] : "",
    falseOptionTitle2: falseOptionsTitle.length > 0 ? falseOptionsTitle[1] : "",
    falseOptionTitle3: falseOptionsTitle.length > 0 ? falseOptionsTitle[2] : "",
    falseOptionMeaning1:
      falseOptionsMeaning.length > 0 ? falseOptionsMeaning[0] : "",
    falseOptionMeaning2:
      falseOptionsMeaning.length > 0 ? falseOptionsMeaning[1] : "",
    falseOptionMeaning3:
      falseOptionsMeaning.length > 0 ? falseOptionsMeaning[2] : "",
  };

  const handleClick = async () => {
    setPdfDownloading(true);
    const response = await fetch("/api/pdfgenerator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${filename}`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setPdfDownloading(false);
    } else {
      setPdfDownloading(false);
      console.error("Failed to generate PDF");
    }
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    const response = await fetch("/api/pdfgenerator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a hidden iframe
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      // Load PDF URL into iframe
      iframe.src = url;

      // Define CSS style for printing
      const style = document.createElement("style");
      document.head.appendChild(style);

      // Trigger print dialog for iframe content
      iframe.onload = function () {
        if (iframe.contentWindow) {
          iframe.contentWindow.print();
          setIsPrinting(false);
        } else {
          setIsPrinting(false);
          console.error("Failed to access iframe contentWindow");
        }
      };
    } else {
      setIsPrinting(false);
      console.error("Failed to generate PDF");
    }
  };

  useEffect(() => {
    if (advertisementDialogData?.salesImage) {
      let originalUrl = advertisementDialogData?.salesImage?.asset?._ref;
      let startIndex = originalUrl?.indexOf("-") + 1;
      let endIndex = originalUrl?.lastIndexOf("-");
      const finalUrl = originalUrl?.substring(startIndex, endIndex);
      setDialogImageUrl(finalUrl);
    }
  }, [advertisementDialogData?.salesImage]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getQuestion = async () => {
    try {
      const res = await axios.get("/api/question");
      setQuestionResultData(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickReadMore = () => {
    setShowMore(!showMore);
  };

  const copyToClipboard = (e: any) => {
    navigator.clipboard.writeText(POST_URL);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 900);
  };

  const mobileHandleRightMove = () => {
    document.body.style.overflow = "hidden";
    setShowMobileKeepLearning(true);
  };

  const onOpenAdvertisementDialog = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    getQuestion();
  }, []);

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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.x 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {!isLoading && (
        <div className="w-full h-full flex flex-col justify-between dark:bg-[#2A2831]">
          <div className="w-full h-full xl:h-auto flex justify-between sm:flex-col lg:flex-col lg:items-center xl:flex-col xl:items-center">
            <div className="w-full h-full md:h-auto pl-[43px] pr-[77px] pb-[16px] flex flex-col sm:px-[15px]">
              <ResultTrueAnswer options={questionResultData.options} />
              <div className="flex flex-col gap-[20px]">
                <div className="bg-shadow h-full  md:h-auto pb-[5px] dark:pb-0 rounded-b-[20px] dark:bg-white/[.10]">
                  <div className="py-[14px] h-full md:h-auto px-[16px] sm:p-[15px] flex flex-col gap-[20px] border border-[#eef0f6] dark:border-none rounded-b-[20px] bg-white dark:bg-white/[.10]">
                    <div className="flex flex-col gap-[20px] md:gap-[10px]">
                      <span className="text-[48px] sm:text-[32px] leading-[40px] lg:leading-[30px] font-[RecklessNeue-LightItalic] text-greenDark">
                        {questionResultData.titleFrench}
                      </span>
                      <span className="text-[48px] sm:text-[32px] leading-[40px] lg:leading-[30px] font-light font-[RecklessNeue-Thin] text-primary dark:text-white">
                        {questionResultData.titleEnglish}
                      </span>
                    </div>
                    <Audio
                      phonetic={questionResultData.phonetic}
                      audio={questionResultData.audio}
                    />
                    <GrammarBlurb
                      grammarBlurb={questionResultData.grammarBlurb}
                      description={questionResultData.description}
                      showMore={showMore}
                      setShowMore={setShowMore}
                    />
                    {isMobile ? (
                      <>
                        {showMore && (
                          <>
                            <div className="border border-[#EEF0F6] pt-[10px] border-b-0 border-l-0 border-r-0 text-primary font-[GT-America-Standard-Medium-Trial] text-[14px] leading-5 font-medium dark:text-white">
                              Examples
                            </div>
                            <QuestionExamples
                              question_examples={
                                questionResultData.question_examples
                              }
                            />
                            {showMore && (
                              <p
                                className="hidden md:block text-[11px] cursor-pointer underline text-[#353535] font-[gtamerica-thin] leading-5 font-light dark:text-white"
                                onClick={onClickReadMore}
                              >
                                Read less
                              </p>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col gap-[20px]">
                        <span className="border border-[#EEF0F6]"></span>
                        <span className="text-primary font-[GT-America-Standard-Medium-Trial] text-[14px] leading-5 font-medium dark:text-white">
                          Examples
                        </span>
                        <QuestionExamples
                          question_examples={
                            questionResultData.question_examples
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center sm:hidden lg:hidden">
                  <div className="flex gap-[15px] items-center">
                    <p className="text-[11px] text-[#a2a2a2] font-light font-sans leading-4">
                      Share
                    </p>
                    <Link href={FACEBOOK_URL} target="_blank">
                      <Image src={FaceBookIcon} alt="" />
                    </Link>
                    <Link href={TWITTER_URL} target="_blank">
                      <Image src={TwitterIcon} alt="" />
                    </Link>
                    <Link href={WHATSAPP_URL} target="_blank">
                      <Image src={WhatsappIcon} alt="" />
                    </Link>
                    <Link href={LINKED_IN} target="_blank">
                      <Image src={LinkedInIcon} alt="" />
                    </Link>
                    <Link href={EMAIL_SHARE_URL}>
                      <Image src={MailIcon} alt="" />
                    </Link>
                    {!isCopied && (
                      <Image
                        src={LinkIcon}
                        alt=""
                        onClick={(e) => copyToClipboard(e)}
                        className="cursor-pointer"
                      />
                    )}
                    {isCopied && (
                      <p className="text-[12px] dark:text-white">
                        Link Copied!
                      </p>
                    )}
                  </div>
                  <div className="flex gap-[15px] items-center">
                    {!isPrinting ? (
                      <Image
                        src={PrintIcon}
                        alt=""
                        className="cursor-pointer"
                        onClick={handlePrint}
                      />
                    ) : (
                      <Spinner />
                    )}

                    {!pdfDownloading ? (
                      <Image
                        src={DownloadIcon}
                        alt=""
                        className="cursor-pointer"
                        onClick={handleClick}
                      />
                    ) : (
                      <Spinner />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:w-full md:w-full lg:w-full xl:w-full lg:flex xl:flex lg:justify-center xl:justify-center bg-lightslategrey dark:bg-[#2A2831] h-auto pt-[16px] pb-[16px] border border-y-0 border-[#3F4145]/[.15] lg:border-none relative sm:overflow-hidden sm:py-0">
              <div className="w-[500px] h-full xl:px-[50px] sm:!px-[15px] border-0  md:border md:border-[#d3d3d3] md:border-b-0 md:border-r-0 md:border-l-0">
                <ResultFalseAnswer options={questionResultData.options} />
              </div>
            </div>
            <div className="hidden sm:flex lg:flex lg:w-full pt-[15px] pb-[15px] px-[15px] justify-between items-center">
              <p className="text-[11px] text-[#a2a2a2] font-light font-sans leading-4">
                Share
              </p>
              <Link href={FACEBOOK_URL} target="_blank">
                <Image src={FaceBookIcon} alt="" />
              </Link>
              <Link href={TWITTER_URL} target="_blank">
                <Image src={TwitterIcon} alt="" />
              </Link>
              <Link href={WHATSAPP_URL} target="_blank">
                <Image src={WhatsappIcon} alt="" />
              </Link>
              <Link href={LINKED_IN} target="_blank">
                <Image src={LinkedInIcon} alt="" />
              </Link>
              <Link href={EMAIL_SHARE_URL}>
                <Image src={MailIcon} alt="" />
              </Link>
              {!isCopied && (
                <Image
                  src={LinkIcon}
                  alt=""
                  onClick={(e) => copyToClipboard(e)}
                  className="cursor-pointer"
                />
              )}
              {isCopied && (
                <p className="text-[12px] dark:text-white">Link Copied!</p>
              )}
            </div>
          </div>
          <Marquee className="w-max md:h-full py-[4px] sm:pb-[60px] md:py-[15px] lg:py-[15px] bg-primary overflow-x-hidden z-[0] !fixed lg:!relative bottom-0">
            <div className="w-full flex items-center gap-[80px]">
              <div className="w-full flex items-center">
                <Image alt="" src={ChartIcon} />
                <p className="text-[13px] text-white px-[4px] text-center font-[GT-America-Standard-Medium-Trial] sm:font-[GTAmerica-Regular] leading-[22px]">
                  COME BACK TOMORROW FOR ANOTHER MOT DU JOUR, A NEW ONE IS
                  RELEASE DAILY AT MIDNIGHT (EST).
                </p>
                <Footer />
              </div>
              <div className="w-full flex items-center mr-[80px] md:mr-[50px]">
                <Image alt="" src={ChartIcon} />
                <p className="text-[13px] text-white px-[4px] text-center font-[GT-America-Standard-Medium-Trial] sm:font-[GTAmerica-Regular] leading-[22px]">
                  COME BACK TOMORROW FOR ANOTHER MOT DU JOUR, A NEW ONE IS
                  RELEASE DAILY AT MIDNIGHT (EST).
                </p>
                <Footer />
              </div>
            </div>
          </Marquee>
          <div className="hidden sm:block md:block pb-[62px] w-full"></div>
          <div
            className={classNames(
              "hidden sm:block md:block fixed bottom-0 w-full px-[20px] py-[18px] border cursor-pointer border-[#172337] bg-[#172337]"
            )}
          >
            <div
              className="flex justify-center items-center gap-[5px]"
              onClick={mobileHandleRightMove}
            >
              <Image alt="" src={FlagIslandIocn} />
              <span className="text-[20px] font-[Carrosserie-Bold] leading-[25px] text-white">
                Keep learning French
              </span>
              <Image
                alt=""
                src={RightArrowIcon}
                className="filter brightness-0 invert dark:filter-none"
              />
            </div>
          </div>

          {
            <>
              {isVisible && (
                <AdvertisementPopUp
                  imageUrl={imageUrl}
                  salesCopy={advertisementDialogData?.salesCopy}
                  setIsVisible={setIsVisible}
                  siteUrl={advertisementDialogData?.salesUrl}
                />
              )}
              {!isVisible && (
                <div
                  onClick={onOpenAdvertisementDialog}
                  className="w-[469px] cursor-pointer px-[30px] py-[20px] z-[100] flex flex-col gap-[15px] fixed bottom-[20px] right-[20px] bg-white 
                  rounded-[30px] shadow-[3px_3px_30px_0px_rgba(0,0,0,0.2)] dark:bg-black sm:hidden dark:border dark:borde-white"
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-[24px] text-primary leading-[33px] font-[Carrosserie-Bold] dark:text-white">
                      KEEP LEARNING FRENCH
                    </h1>
                    <Image
                      alt=""
                      src={PlusIcon}
                      className="cursor-pointer dark:filter dark:brightness-0 dark:invert"
                    />
                  </div>
                </div>
              )}
            </>
          }
        </div>
      )}
      {showmobileKeepLearning && (
        <MobileAdvertisementDialog
          keepLearningSectionUrl1={
            advertisementDialogData?.keepLearningSectionUrl1
          }
          setShowMobileKeepLearning={setShowMobileKeepLearning}
          showmobileKeepLearning={showmobileKeepLearning}
          keepLearningSectionImage1={
            advertisementDialogData?.keepLearningSectionImage1
          }
        />
      )}
    </>
  );
};

export default Result;
