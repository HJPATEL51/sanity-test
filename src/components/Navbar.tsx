declare global {
  interface Window {
    _klOnsite: any[];
  }
}

import React, { useEffect, useState } from "react";
import Image from "next/image";
import MenuBarsIcon from "@images/menu_bars_icon.svg";
import TitleIcon from "@images/title_icon.svg";
import QuestionCircleIcon from "@images/question_circle_icon.svg";
import SettingCogIcon from "@images/setting_cog_icon.svg";
import CrossIcon from "@images/cross_icon.svg";
import HOwToPlay from "@/components/HowToPlay";
import Settings from "@/components/Settings";
import { useTheme } from "next-themes";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { CSSProperties } from "react";
import InstagramIcon from "@images/mobile_instagram_icon.svg";
import ThreadsIcon from "@images/mobile_threads_icons.svg";
import FacebookIcon from "@images/mobile_facebook_icon.svg";
import TiktokIcon from "@images/mobile_tiktok_icon.svg";
import TwitterIcon from "@images/mobile_twitter_icon.svg";
import YoutubeIcon from "@images/mobile_youtube_icon.svg";
import SpotifyIcon from "@images/mobile_spotify_icon.svg";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { siteSettingInterface } from "@/interfaces";
import { motion } from "framer-motion";
import SettingsItems from "./common/SettingItems";
import HOwToPlayItems from "./common/HowToPlayItems";
import CrossGreyIcon from "@images/cross_grey_icon.svg";

const customDark: CSSProperties = {
  background: "rgba(0, 0, 0, 1)",
};

const customLight: CSSProperties = {
  background: "rgba(255, 255, 255, 1)",
};

type DialogType = "question" | "setting";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSettingDrawer, setShowSettingDrawer] = useState(false);
  const [showDialog, setShowDialog] = useState("");
  const [showplayDrawer, setShowPlayDrawer] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const navLinkData: siteSettingInterface | null = useSelector(
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
  const toggleDrawer = () => {
    setShowMenu(!showMenu);
    setIsOpen(!isOpen);
  };

  const toggleSettingDrawer = () => {
    setShowSettingDrawer(false);
    if (isOpen) {
      setIsOpen(false);
    }
    setShowDialog("");
    document.body.style.overflow = "";
  };

  const togglePlayerDrawer = () => {
    setShowPlayDrawer(false);
    if (isOpen) {
      setIsOpen(false);
    }
    setShowDialog("");
    document.body.style.overflow = "";
  };

  const toOpen = (type: DialogType) => {
    if (type === "question") {
      setShowDialog("question");
      document.body.style.overflow = "hidden";
      if (isMobile) {
        setShowPlayDrawer(true);
      } else {
        setIsOpen(true);
      }
    }
    if (type === "setting") {
      setShowDialog("setting");
      document.body.style.overflow = "hidden";
      if (isMobile) {
        setShowSettingDrawer(true);
      } else {
        setIsOpen(true);
      }
    }
  };

  const openKlaviyoForm = () => {
    window._klOnsite = window._klOnsite || [];
    window._klOnsite.push(["openForm", "WBqBH9"]);
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

  useEffect(() => {
    const klaviyoFormTrigger = document.querySelector(".klaviyo_form_trigger");

    if (klaviyoFormTrigger) {
      klaviyoFormTrigger.addEventListener("click", openKlaviyoForm);

      // Clean up event listener on component unmount
      return () => {
        klaviyoFormTrigger.removeEventListener("click", openKlaviyoForm);
      };
    }
  }, []); // Empty

  return (
    <>
      <div className="w-full h-[75px] md:h-[54px] border-b border-lightGrey flex items-center">
        <div className="w-full pr-[40px] pl-[26px] md:px-[15px] m-auto lg:gap-[5px] flex justify-between items-center relative">
          {showMenu ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-100%" }}
                transition={{ duration: 0.5 }}
                className="flex sm:hidden md:hidden lg:hidden xl:hidden gap-[40px]"
              >
                <Image
                  alt=""
                  src={CrossIcon}
                  className="dark:filter dark:brightness-0 dark:invert cursor-pointer"
                  onClick={() => setShowMenu(false)}
                />
                <div className="flex gap-[30px] text-[14px] leading-[22px] font-[gtamerica-thin] text-primary dark:text-white">
                  {navLinkData?.navLinks.map((ele: any, index: any) => {
                    return (
                      <div className="flex items-center" key={index}>
                        <Link href={ele?.URL} target="_blank">
                          {ele?.Label}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
              <div className="hidden sm:block md:block lg:block xl:block">
                <Drawer
                  open={isOpen}
                  onClose={toggleDrawer}
                  direction="left"
                  className="!w-full"
                  style={theme === "dark" ? customDark : customLight}
                >
                  <motion.div
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      x: isOpen ? "0%" : "-100%",
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    <div className="p-[15px]">
                      <Image
                        alt=""
                        src={CrossIcon}
                        className="dark:filter dark:brightness-0 dark:invert absolute right-[5%]"
                        onClick={toggleDrawer}
                      />
                      <div className="flex flex-col gap-[20px]">
                        <div className="flex flex-col">
                          {navLinkData?.navLinks.map((ele: any, index: any) => {
                            return (
                              <div
                                className="flex items-center py-[15px] border border-lightGrey border-t-0 border-r-0 border-l-0 text-primary dark:text-white leading-[24px] font-[RecklessNeue-Thin] text-[22px]"
                                key={index}
                              >
                                <Link href={ele?.URL} target="_blank">
                                  {ele?.Label}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex gap-[20px]">
                          <Link
                            href={"https://www.instagram.com/hellofrenchnyc/"}
                            target="_blank"
                          >
                            <Image src={InstagramIcon} alt="" />
                          </Link>
                          <Link
                            href={"https://www.threads.net/@hellofrenchnyc"}
                            target="_blank"
                          >
                            <Image src={ThreadsIcon} alt="" />
                          </Link>
                          <Link
                            href={"https://www.facebook.com/hellofrenchnyc"}
                            target="_blank"
                          >
                            <Image src={FacebookIcon} alt="" />
                          </Link>
                          <Link
                            href={
                              "https://www.tiktok.com/@hellofrenchnyc?lang=en"
                            }
                            target="_blank"
                          >
                            <Image src={TiktokIcon} alt="" />
                          </Link>
                          <Link href={"https://twitter.com/HelloFrenchNyc"}>
                            <Image src={TwitterIcon} alt="" />
                          </Link>
                          <Image src={YoutubeIcon} alt="" />
                          <Link
                            href={"https://open.spotify.com/user/tchechilia"}
                            target="_blank"
                          >
                            <Image src={SpotifyIcon} alt="" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Drawer>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.5 }}
            >
              <Image
                alt=""
                src={MenuBarsIcon}
                className="dark:filter dark:brightness-0 dark:invert cursor-pointer"
                onClick={toggleDrawer}
              />
            </motion.div>
          )}
          <div className="md:w-[150px] md:h-[17px] w-auto h-auto absolute left-[50%] translate-x-[-50%] lg:translate-x-0 lg:left-[0px] lg:static">
            <Image
              alt=""
              src={TitleIcon}
              className="dark:filter dark:brightness-0 dark:invert"
            />
          </div>
          <div className="flex gap-[20px] md:gap-[5px]">
            <button className="klaviyo_form_trigger lg:px-[12px] lg:py-[5px] px-[22px] py-[12px] border rounded-[20px] cursor-pointer border-midnightAbyss dark:border-white text-[12px] text-midnightAbyss dark:text-white leading-4 font-light font-[gtamerica-thin]">
              {!isMobile ? "Subscribe to Mot Du Jour" : "Subscribe"}
            </button>
            <Image
              alt=""
              src={QuestionCircleIcon}
              className="dark:filter dark:brightness-0 dark:invert cursor-pointer"
              onClick={() => toOpen("question")}
            />
            <Image
              alt=""
              src={SettingCogIcon}
              className="dark:filter dark:brightness-0 dark:invert cursor-pointer"
              onClick={() => toOpen("setting")}
            />
            {!isMobile && showDialog === "question" && (
              <HOwToPlay
                showDialog={showDialog}
                setShowDialog={setShowDialog}
              />
            )}
            {!isMobile && showDialog === "setting" && (
              <Settings
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                faqLinks={navLinkData?.faqLinks}
              />
            )}
          </div>
        </div>
      </div>
      {isMobile && (
        <Drawer
          open={showSettingDrawer}
          direction="bottom"
          className="!w-full !h-auto rounded-t-[20px] hidden sm:block md:block"
          style={theme === "dark" ? customDark : customLight}
          duration={500}
        >
          <div className="w-full h-full flex flex-col gap-[15px] pt-[15px] pb-[20px] px-[20px]">
            <div className="w-full flex justify-between items-center">
              <span className="text-[22px] text-primary font-bold font-[Carrosserie-Bold]">
                SETTINGS
              </span>
              <Image
                alt=""
                src={CrossGreyIcon}
                onClick={toggleSettingDrawer}
                className="cursor-pointer dark:filter dark:brightness-0 dark:invert"
              />
            </div>
            <div className="pt-0 relative">
              <SettingsItems faqLinks={navLinkData?.faqLinks} />
            </div>
          </div>
        </Drawer>
      )}
      {isMobile && (
        <Drawer
          open={showplayDrawer}
          direction="bottom"
          className="!w-full !h-auto rounded-t-[20px] hidden sm:block md:block"
          style={theme === "dark" ? customDark : customLight}
          duration={500}
        >
          <div className="w-full h-full flex flex-col gap-[15px] pt-[15px] pb-[20px]">
            <div className="w-full flex justify-between items-center px-[20px]">
              <span className="text-[22px] text-primary font-bold font-[Carrosserie-Bold]">
                HOW TO PLAY
              </span>
              <Image
                alt=""
                src={CrossGreyIcon}
                onClick={togglePlayerDrawer}
                className="cursor-pointer dark:filter dark:brightness-0 dark:invert"
              />
            </div>
            <HOwToPlayItems />
          </div>
        </Drawer>
      )}
    </>
  );
}

export default Navbar;
