import React from "react";
import HowtoplayIcon from "@images/how_to_play_icon.svg";
import Dialog from "@/components/common/Dialog";
import HOwToPlayItems from "./common/HowToPlayItems";

type Props = {
  setShowDialog: any;
  showDialog: any;
};

const data = [
  {
    option: "Le pomme",
  },
  {
    option: "Une pomme",
  },
  {
    option: "Le applet",
  },
  {
    option: "Pomme",
  },
];

const HOwToPlay: React.FC<Props> = (props) => {
  const { showDialog, setShowDialog } = props;

  return (
    <Dialog
      isOpen={showDialog}
      className="w-[489px] md:w-full px-[30px] md:px-[20px] md:py-[20px] rounded-[30px] py-[30px] bg-white
                 dark:bg-black shadow-[4px_4px_40px_0px_rgba(0,0,0,0.20)] outline-none top-1/2 left-1/2 
                 absolute right-auto bottom-auto -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[20px] dark:border"
      src={HowtoplayIcon}
      setShowDialog={setShowDialog}
    >
     <HOwToPlayItems />
    </Dialog>
  );
};

export default HOwToPlay;
