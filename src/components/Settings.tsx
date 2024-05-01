import React from "react";
import Dialog from "@/components/common/Dialog";
import SettingTitleIcon from "@images/settings_title_icon.svg";
import SwitchButton from "@/components/common/SwitchButton";
import Link from "next/link";
import SettingsItems from "./common/SettingItems";

type Props = {
  setShowDialog: any;
  showDialog: any;
  faqLinks: any;
};

const Settings: React.FC<Props> = (props) => {
  const { showDialog, setShowDialog, faqLinks } = props;

  return (
    <div>
      <Dialog
        className="w-[489px] md:w-full md:p-[20px] p-[30px] flex flex-col gap-[20px] flex-start rounded-[30px] bg-white dark:bg-black 
        shadow-[4px_4px_40px_0px_rgba(0,0,0,0.20)] outline-none top-1/2 left-1/2 absolute right-auto bottom-auto 
        -translate-x-1/2 -translate-y-1/2 dark:border font-[gtamerica-thin] "
        src={SettingTitleIcon}
        setShowDialog={setShowDialog}
        isOpen={showDialog}
      >
        <SettingsItems faqLinks={faqLinks} />
      </Dialog>
    </div>
  );
};

export default Settings;
