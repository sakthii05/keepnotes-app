'use client'
import React, { ReactNode } from "react";

const FormLayout = (props: { title: string; children: ReactNode }) => {
  const { title, children } = props;
  return (
    <div className="w-[90%] sm:w-[60%] md:[40%] lg:[50%] xl:w-[30%] border-2 border-foreground rounded-lg">
      <div className="px-4 py-2 bg-primary text-foreground flex justify-between items-center rounded-t-lg">
        <div className="font-semibold">{title}</div>
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
        </div>
      </div>
      <div className="text-center font-bold text-3xl py-5">{title}</div>
      <div className="px-5">{children}</div>
    </div>
  );
};

export default FormLayout;
