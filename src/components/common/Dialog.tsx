import Image from "next/image";
import React from "react";
import Modal from "react-modal";
import CrossIcon from "@images/cross_grey_icon.svg";
import { useTheme } from "next-themes";

type Props = {
  isOpen: any;
  className: any;
  children: any;
  src: any;
  setShowDialog: any;
};

const customDark = {
  overlay: {
    background: "rgba(0, 0, 0, 0.75)",
  },
};

const customLight = {
  background: "rgba(255, 255, 255, 0.75)",
};

const Dialog: React.FC<Props> = ({
  isOpen,
  className,
  children,
  src,
  setShowDialog,
}) => {
  const { theme } = useTheme();

  const toClose = () => {
    setShowDialog(false);
    document.body.style.overflow = "";
  };

  return (
    <Modal
      isOpen={isOpen}
      className={className}
      style={theme === "dark" ? customDark : customLight}
    >
      <div className="w-full flex justify-between">
        <Image
          alt=""
          src={src}
          className="dark:filter dark:brightness-0 dark:invert"
        />
        <Image
          alt=""
          src={CrossIcon}
          onClick={toClose}
          className="cursor-pointer dark:filter dark:brightness-0 dark:invert"
        />
      </div>
      {children}
    </Modal>
  );
};

export default Dialog;
