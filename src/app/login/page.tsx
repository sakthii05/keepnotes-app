"use client";
import FormLayout from "@/components/FormLayout";
import CustomInput from "@/components/inputs/customInput";
import { EMAIL, PASSWORD } from "@/utils/regex";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";

const LoginPage = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const formSubmit = () => {};

  return (
    <Layout>
      <div className="flex justify-center items-center pt-20">
        <FormLayout title="Login">
          <form className="space-y-3" onSubmit={handleSubmit(formSubmit)}>
            <CustomInput
              name="email"
              label="Email"
              control={control}
              errors={errors}
              isrequired={true}
              rules={{
                required: "Email is required",
                pattern: { message: "Invaild Email", value: EMAIL },
              }}
              placeholder={"Email"}
            />
            <CustomInput
              name="password"
              label="Password"
              control={control}
              errors={errors}
              isrequired={true}
              rules={{
                required: "Password is required",
                pattern: {
                  message: "Invalid password format",
                  value: PASSWORD,
                },
              }}
              placeholder={"Password"}
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
