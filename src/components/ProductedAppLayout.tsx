"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";

const ProductedAppLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const pathname = usePathname();
  const [menuopen, setmenuopen] = useState(false);
  const Menu = (props: { view: "desktop" | "mobile" }) => {
    return (
      <div
        className={`flex ${
          props.view === "desktop"
            ? "flex-row gap-4 items-center font-semibold"
            : "flex-col gap-2 text-base font-medium"
        } `}
      >
        <a href="/">About</a>
        <a href="/your-notes">Notes</a>
        <a href="/">Account</a>
        <a href="/login">Login</a>
      </div>
    );
  };
  const currentpath = pathname?.split("/")[1].replace("-", " ");
  return (
    <div className="flex justify-center items-center w-screen">
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
          <div className="w-full md:w-[80%]">
            <div className="text-subtext ">
              Homepage /{" "}
              <span className="text-foreground font-semibold capitalize">
                {currentpath}
              </span>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductedAppLayout;
