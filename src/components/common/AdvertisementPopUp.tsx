import Image from "next/image";
import React, { useState } from "react";
import KeepLearingIcon from "@images/keep_learning_icon.svg";
import MinusIcon from "@images/minus_icon.svg";
import Link from "next/link";

type Props = {
  imageUrl: any;
  salesCopy: any;
  setIsVisible: any;
  siteUrl: any;
};

const AdvertisementPopUp: React.FC<Props> = (props) => {
  const { imageUrl, salesCopy, setIsVisible, siteUrl } = props;

  const onCloseAdvertisementDialog = () => {
    setIsVisible(false);
  };

  const onLinkClick = () => {
    onCloseAdvertisementDialog(); // Close the dialog when link is clicked
  };

  return (
    <>
      <div
        className="w-[469px] p-[30px] z-[100] flex flex-col gap-[15px] fixed bottom-[20px] right-[20px] bg-white 
                  rounded-[30px] shadow-[3px_3px_30px_0px_rgba(0,0,0,0.2)] dark:bg-black sm:hidden dark:border dark:borde-white"
      >
        <div className="flex justify-between">
          <h1 className="font-[Carrosserie-Bold] text-[24px] text-primary dark:text-white">
            KEEP LEARING FRENCH
          </h1>
          <Image
            alt=""
            src={MinusIcon}
            onClick={onCloseAdvertisementDialog}
            className="cursor-pointer"
          />
        </div>
        <p className="text-[14px] font-light leading-5 text-accentDark font-[gtamerica-thin]">
          {salesCopy}
        </p>
        <span className="border border-[#d9d9d9]"></span>
        <Link href={siteUrl} target="_blank" onClick={onLinkClick}>
          <img alt="" src={imageUrl} className="cursor-pointer" />
        </Link>
      </div>
    </>
  );
};

export default AdvertisementPopUp;
