import React, { ReactNode, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { UserInterface } from "@/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import axios from "axios";
import OneSignal from "react-onesignal";
import { setSiteSetting } from "@/store/slices/siteSettings";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const user: UserInterface | null = useSelector(
    (state: RootState) => state.user.data
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchLinks = async () => {
    try {
      const res = await axios.get("/api/siteSetting");
      dispatch(setSiteSetting(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    OneSignal.init({
      appId: "1ddf0970-a07e-4c86-b6fa-c5a79ea15994",
    });
  }, []);

  useEffect(() => {
    fetchLinks();
    if (user && user?.responses?.length) {
      router.push("/result");
    } else {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="w-full h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
