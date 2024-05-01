import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const SwitchButton = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      setIsChecked(true);
    }
  }, [isChecked, mounted]);

  if (!mounted) {
    return null;
  }

  const handleToggle = () => {
    setIsChecked(!isChecked);
    setTheme(isChecked ? "light" : "dark");
  };

  return (
    <div className="relative w-[51px] h-[31px]">
      <input
        type="checkbox"
        id="switch"
        className="sr-only"
        checked={isChecked}
        onChange={handleToggle}
      />
      <label
        htmlFor="switch"
        className={`${
          isChecked ? "bg-isoGreen" : "bg-gray-300 "
        } block w-full h-full rounded-full cursor-pointer transition duration-300 ease-in-out`}
      >
        <span
          className={`${
            isChecked ? "translate-x-[21px]" : "translate-x-0"
          } block w-[26px] h-[26px] bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out absolute top-[2px] left-[2px]`}
        ></span>
      </label>
    </div>
  );
};

export default SwitchButton;
