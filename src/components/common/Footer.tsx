import React, { useEffect, useState } from "react";

const Footer = () => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Get the current time in UTC
      const now = new Date();

      // Set the time zone to EST (Eastern Standard Time)
      now.setUTCHours(now.getUTCHours() - 5); // UTC to EST difference is -5 hours

      // Get the start of the next day in EST
      const nextDay = new Date(now);
      nextDay.setUTCHours(0, 0, 0, 0);
      nextDay.setDate(nextDay.getUTCDate() + 1);

      // Calculate the time difference between now (in EST) and the start of the next day in EST
      const timeDifference = nextDay.getTime() - now.getTime();

      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      // Helper function to pad single digits
      const padSingleDigit = (num: any) => (num < 10 ? `0${num}` : num);

      const formattedHours = padSingleDigit(hours);
      const formattedMinutes = padSingleDigit(minutes);
      const formattedSeconds = padSingleDigit(seconds);

      setTimeRemaining(
        `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="w-[55px] text-[14px] text-white text-center font-[GT-America-Standard-Medium-Trial] sm:font-[gtamerica-thin]">
      {timeRemaining}
    </span>
  );
};

export default Footer;
