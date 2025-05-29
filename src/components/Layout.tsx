"use client";
import { RootState } from "@/utils/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const currentpath = pathname?.split("/")[1].replace("-", " ");
  const [menuopen, setmenuopen] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (currentUser) {
      router.push("/your-notes");
    } else {
      setloading(false);
    }
  }, [currentUser]);
  
  const Menu = (props: { view: "desktop" | "mobile" }) => {
    return (
      <div
        className={`flex ${
          props.view === "desktop"
            ? "flex-row gap-4 items-center font-semibold"
            : "flex-col gap-2 text-base font-medium"
        } `}
      >
        <Link href="/">About</Link>
        {currentpath === "login" ? (
          <Link href="/signup">Signup</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center w-screen">
      <ToastContainer />
      <div className="max-w-[2650px] w-full">
        {/* topbar */}
        <div className="flex justify-center bg-lightblue text-blue">
          <div className="h-16 flex justify-between px-10 items-center w-full md:w-[80%]">
            <div className="font-bold text-xl">Keep Notes</div>
            <div className="hidden sm:block">
              <Menu view={"desktop"} />
            </div>
            <div
              className="group font-semibold cursor-pointer sm:hidden relative"
              onClick={() => {
                setmenuopen((prev) => !prev);
              }}
            >
              <div>Menu</div>
              <div
                className={`${
                  menuopen ? "block" : "hidden"
                } p-2 bg-background absolute rounded-md drop-shadow-2xl -right-5`}
              >
                <Menu view={"mobile"} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center p-5 items-center">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="w-full md:w-[80%]">
              <div className="text-subtext ">
                Homepage /{" "}
                <span className="text-foreground font-semibold capitalize">
                  {currentpath}
                </span>
              </div>
              <div>{children}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
