"use client";
import ProductedAppLayout from "@/components/ProductedAppLayout";
import { RootState } from "@/utils/store";
import React from "react";
import { MdSpeakerNotes } from "react-icons/md";
import { useSelector } from "react-redux";

const YourNote = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const name = currentUser?.split("/")[1];
  const email = currentUser?.split("/")[0];
  const id = currentUser?.split("/")[3];
  const notes = useSelector((state: RootState) =>
    state.notes.notes.filter((n) => n.ownerid === id)
  );

  return (
    <ProductedAppLayout>
      <div className="relative">
        <div className="py-4 text-4xl font-bold">Good Morning, {name}</div>
        <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {notes.map((notes, index) => (
            <div className="h-20 w-full border-2 rounded-lg" key={index}>
              <div className="bg-primary px-3 py-2 rounded-t-lg flex justify-between gap-2">
                <div className="font-medium">{notes.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute z-20 h-12 w-12 bg-[#EAB384] rounded-full drop-shadow-2xl bottom-5 right-5 md:right-10 flex justify-center items-center">
        <MdSpeakerNotes className="text-xl" />
      </div>
      <div className=" z-40 absolute inset-0 flex justify-center items-center">
        <div className=" border-2 rounded-lg h-20 w-20"></div>
      </div>
    </ProductedAppLayout>
  );
};

export default YourNote;
