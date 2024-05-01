import React from "react";
import SwitchButton from "@/components/common/SwitchButton";
import Link from "next/link";

type Props = {
  faqLinks: string | undefined;
};

const SettingsItems: React.FC<Props> = (props) => {
  const { faqLinks } = props;

  const handleClick = () => {
    const Email_LINK = `mailto:${process.env.NEXT_PUBLIC_EMAIL}?subject=Feedback - Le Mot Du Jour!`;

    window.location.href = Email_LINK;
  };

  const handleReportBug = () => {
    const Email_LINK = `mailto:${process.env.NEXT_PUBLIC_EMAIL}?subject=Report bug - Le Mot Du Jour!`;

    window.location.href = Email_LINK;
  };

  return (
    <>
      <div className="w-full pt-[10px] pb-[25px] md:pb-[15px] text-[14px] text-accentDark dark:text-white leading-5 font-light flex flex-col gap-[20px] self-stretch">
        <div className="w-full flex justify-between items-center">
          <p>DARK THEME</p>
          <SwitchButton />
        </div>
        <p className="border border-ligthBlack border-t-0"></p>
        <div className="w-full flex justify-between items-center">
          <p>REPORT A BUG</p>
          <label
            className="w-[51px] focus-visible:outline-lightGrey text-right cursor-pointer"
            onClick={handleReportBug}
          >
            Email
          </label>
        </div>
        <p className="border border-ligthBlack border-t-0"></p>
        <div className="w-full flex justify-between items-center">
          <p>FEEDBACK</p>
          <label
            className="w-[51px] focus-visible:outline-lightGrey whitespace-nowrap text-right cursor-pointer"
            onClick={handleClick}
          >
            Email Us
          </label>
        </div>
        <p className="border border-ligthBlack border-t-0"></p>
        <div className="w-full flex justify-between items-center">
          <p>QUESTIONS</p>
          {faqLinks && (
            <Link href={faqLinks} target="_blank">
              <label className="w-[51px] focus-visible:outline-lightGrey text-right cursor-pointer">
                FAQ
              </label>
            </Link>
          )}
        </div>
      </div>
      <p className="text-[12px] text-accentDark dark:text-white font-light leading-4">
        ® 2023 Hello French LLC
      </p>
    </>
  );
};

export default SettingsItems;
