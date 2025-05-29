"use client";
import CustomInput from "@/components/inputs/CustomInput";
import CustomTextArea from "@/components/inputs/CustomTextArea";
import ProductedAppLayout from "@/components/ProductedAppLayout";
import { addNote, deleteNote } from "@/utils/notesSice";
import { RootState } from "@/utils/store";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdSpeakerNotes } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

type formtype = {
  title: string;
  content: string;
};

const YourNote = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const name = currentUser?.split("/")[1];
  const email = currentUser?.split("/")[0];
  const id = currentUser?.split("/")[3];
  const notes = useSelector((state: RootState) =>
    state.notes.notes.filter((n) => n.ownerid === id)
  );
  const [isAdd, setIsAdd] = useState(false);
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
    reset,
  } = useForm<formtype>();

  const dispatch = useDispatch();

  const formSubmit = (value: formtype) => {
    if (currentUser) {
      dispatch(
        addNote({
          id: uuid(),
          content: value.content,
          ownerid: id,
          title: value.title,
        })
      );
      toast.success(`Note added`);
      setIsAdd(false)
      reset()
    }
  };

  return (
    <ProductedAppLayout>
      <title>Your Notes</title>
      <div className="relative">
        <div className="py-4 text-4xl font-bold">Good Morning, {name}</div>
        <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {notes.map((note, index) => (
            <div className=" w-full border-2 rounded-lg" key={index}>
              <div className="bg-primary px-3 py-2 rounded-t-lg flex justify-between gap-2">
                <div className="font-medium">{note.title}</div>
                <div>
                  <RiDeleteBinLine
                    className=" text-red-400 text-lg cursor-pointer"
                    onClick={() => {
                      dispatch(deleteNote(note.id));
                    }}
                  />
                </div>
              </div>
              <div className=" p-3 font-medium leading-6 line-clamp-4 break-all break-words">
                {note.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="absolute z-20 h-12 w-12 bg-[#EAB384] rounded-full drop-shadow-2xl bottom-5 right-5 md:right-10 flex justify-center items-center"
        onClick={() => {
          setIsAdd(true);
        }}
      >
        <MdSpeakerNotes className="text-xl" />
      </div>
      {isAdd && (
        <div className="bg-black/50 z-40 absolute inset-0 flex justify-center items-center">
          <div className=" border-2 rounded-lg bg-background w-[90%] sm:w-[60%] md:[40%] lg:[50%] xl:w-[30%] ">
            <div className="bg-primary px-3 py-2 rounded-t-lg  flex justify-between gap-2">
              <div className="font-medium">Add Notes</div>
            </div>
            <form
              className="space-y-3 pt-2 px-5"
              onSubmit={handleSubmit(formSubmit)}
            >
              <CustomInput
                name="title"
                label="Title"
                control={control}
                errors={errors}
                rules={{
                  required: "Title is required",
                }}
                placeholder={"Title"}
              />
              <CustomTextArea
                name="content"
                label="Content"
                control={control}
                errors={errors}
                rules={{
                  required: "content is required",
                }}
                placeholder={"content"}
              />
              <div className="py-5 flex justify-end items-center gap-4 font-mono">
                <button
                  className="px-4 text-center py-1 rounded-lg bg-green-500 text-white font-medium cursor-pointer"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="px-4 text-center py-1 rounded-lg bg-red-500 text-white font-medium cursor-pointer"
                  onClick={() => {
                    setIsAdd(false);
                    reset();
                  }}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ProductedAppLayout>
  );
};

export default YourNote;
