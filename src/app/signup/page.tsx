"use client";
import FormLayout from "@/components/FormLayout";
import CustomInput from "@/components/inputs/CustomInput";
import { EMAIL, PASSWORD } from "@/utils/regex";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearError } from "@/utils/userSlice";
import { v4 as uuid } from "uuid";
import { RootState } from "@/utils/store";
import { toast } from "react-toastify";

type formtype = {
  username: string;
  password: string;
  email: string;
  confirm_password: string;
};

const SignUp = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
  } = useForm<formtype>();

  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.user);

  const router = useRouter();
  const password = watch("password");

  const formSubmit = (value: formtype) => {
    clearError();
    dispatch(
      signup({
        email: value.email,
        password: value.password,
        username: value.username,
        id: uuid(),
      })
    );
    setTimeout(() => {
      if (error) {
        toast.error(error);
        return;
      }

      toast.success(`Thanks ${value.username} for creating account`);
      router.push("/login");
    }, 1000);
  };

  return (
    <Layout>
      <title>Signup</title>
      <div className="flex justify-center items-center pt-20">
        <FormLayout title="Signup">
          <form className="space-y-3" onSubmit={handleSubmit(formSubmit)}>
            <CustomInput
              name="username"
              label="Username"
              control={control}
              errors={errors}
              rules={{
                required: "Username is required",
              }}
              placeholder={"Username"}
            />
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
            <CustomInput
              name="confirm_password"
              label="Confirm Password"
              control={control}
              errors={errors}
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              placeholder={"Password"}
              type="password"
            />
            <div className="py-5 flex justify-center items-center gap-4 font-mono">
              <button
                className="px-4 text-center py-1 rounded-lg bg-lightblue text-blue font-medium cursor-pointer"
                type="submit"
              >
                Register
              </button>
              <button
                className="px-4 text-center py-1 rounded-lg bg-[#EAB384] font-medium cursor-pointer"
                onClick={() => {
                  router.push("/login");
                }}
                type="button"
              >
                Login
              </button>
            </div>
          </form>
        </FormLayout>
      </div>
    </Layout>
  );
};

export default SignUp;
