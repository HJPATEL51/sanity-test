import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { useTheme } from "next-themes";
import MinusIcon from "@images/minus_icon.svg";
import PlusIcon from "@images/plus_icon.svg";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { CSSProperties } from "react";
import { motion } from "framer-motion";

interface Props {
  keepLearningSectionUrl1: any;
  setShowMobileKeepLearning: any;
  showmobileKeepLearning: any;
  keepLearningSectionImage1: any;
}

const customDark: CSSProperties = {
  background: "rgba(0, 0, 0, 1)",
};

const customLight: CSSProperties = {
  background: "rgba(255, 255, 255, 1)",
};

const MobileAdvertisementDialog: React.FC<Props> = ({
  keepLearningSectionUrl1,
  setShowMobileKeepLearning,
  showmobileKeepLearning,
  keepLearningSectionImage1,
}) => {
  const { theme } = useTheme();
  const [showImage, setShowImage] = useState("");

  const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATABASE}/${showImage}.png`;

  useEffect(() => {
    if (keepLearningSectionImage1) {
      let originalUrl = keepLearningSectionImage1?.asset?._ref;
      let startIndex = originalUrl?.indexOf("-") + 1;
      let endIndex = originalUrl?.lastIndexOf("-");
      const finalUrl = originalUrl?.substring(startIndex, endIndex);
      setShowImage(finalUrl);
    }
  }, [keepLearningSectionImage1]);

  const toggleDrawer = () => {
    setShowMobileKeepLearning(!showmobileKeepLearning);
    document.body.style.overflow = "";
  };

  return (
    <Drawer
      open={showmobileKeepLearning}
      direction="bottom"
      className="!w-full !h-auto rounded-t-3xl"
      style={theme === "dark" ? customDark : customLight}
    >
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full flex flex-col gap-[10px]">
          <div className="w-full flex px-[15px] pt-[10px] justify-between items-center">
            <span className="text-[24px] font-[Carrosserie-Bold] text-primary dark:text-white leading-[33px]">
              keep learning french
            </span>
            <Image
              alt=""
              src={MinusIcon}
              onClick={toggleDrawer}
              className="cursor-pointer dark:filter dark:brightness-0 dark:invert"
            />
          </div>
          <div className="px-[15px] relative">
            <div className="text-[14px] leading-[20px] text-accentDark darK:text-white font-[gtamerica-thin]">
              Morem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
          <Link
            href={keepLearningSectionUrl1}
            target="_blank"
            className="cursor-pointer pb-[5px]"
          >
            <img alt="" src={imageUrl} className="px-[20px]" />
          </Link>

          <div className="flex justify-center items-center gap-[10px] py-[18px] px-[20px] bg-[#172337]">
            <span className="text-white text-[14px] font-[GTAmerica-Regular] leading-[22px]">
              $60 • ADD TO BAG
            </span>
            <Image
              alt=""
              src={PlusIcon}
              className="filter brightness-0 invert"
            />
          </div>
        </div>
      </motion.div>
    </Drawer>
  );
};

export default MobileAdvertisementDialog;
