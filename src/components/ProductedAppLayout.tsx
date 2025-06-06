"use client";
import { RootState } from "@/utils/store";
import { logout } from "@/utils/userSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductedAppLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const pathname = usePathname();
  const [menuopen, setmenuopen] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setloading(false);
    } else {
      router.push("/login");
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
        <Link href="/your-notes">Notes</Link>
        <Link href="/">Account</Link>
        <div
          className="cursor-pointer"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </div>
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

export default ProductedAppLayout;
