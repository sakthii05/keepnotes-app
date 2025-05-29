"use client";
import FormLayout from "@/components/FormLayout";
import CustomInput from "@/components/inputs/CustomInput";
import { EMAIL, PASSWORD } from "@/utils/regex";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/store";
import { login } from "@/utils/userSlice";
import { toast } from "react-toastify";

type formtype = {
  password: string;
  email: string;
};

const LoginPage = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<formtype>();

  const router = useRouter();

  const dispatch = useDispatch();
  const { error, users } = useSelector((state: RootState) => state.user);
  console.log(users);
  const formSubmit = (value: formtype) => {
    dispatch(login({ email: value.email, password: value.password }));
    setTimeout(() => {
      if (error) {
        toast.error(error);
        return;
      }

      toast.success(`Welcome back!`);
      router.push("/your-notes");
    }, 1000);
  };

  return (
    <Layout>
      <title>Login</title>
      <div className="flex justify-center items-center pt-20">
        <FormLayout title="Login">
          <form className="space-y-3" onSubmit={handleSubmit(formSubmit)}>
            <CustomInput
              name="email"
              label="Email"
              control={control}
              errors={errors}
              rules={{
                required: "Email is required",
                pattern: { message: "Invaild Email", value: EMAIL },
              }}
              placeholder={"Email"}
              type="email"
            />
            <CustomInput
              name="password"
              label="Password"
              control={control}
              errors={errors}
              rules={{
                required: "Password is required",
                pattern: {
                  message: "Invalid password format",
                  value: PASSWORD,
                },
              }}
              placeholder={"Password"}
              type="password"
            />
            <div className="py-5 flex justify-center items-center gap-4 font-mono">
              <button
                className="px-4 text-center py-1 rounded-lg bg-[#EAB384] font-medium cursor-pointer"
                type="submit"
              >
                Login
              </button>
              <button
                className="px-4 text-center py-1 rounded-lg bg-lightblue text-blue font-medium cursor-pointer"
                type="button"
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Register
              </button>
            </div>
          </form>
        </FormLayout>
      </div>
    </Layout>
  );
};

export default LoginPage;
