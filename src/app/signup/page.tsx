"use client";
import FormLayout from "@/components/FormLayout";
import CustomInput from "@/components/inputs/customInput";
import { EMAIL, PASSWORD } from "@/utils/regex";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";

const SignUp = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
  } = useForm();

  const router = useRouter();
  const password = watch("password");

  const formSubmit = () => {};

  return (
    <Layout>
      <div className="flex justify-center items-center pt-20">
        <FormLayout title="Signup">
          <form className="space-y-3" onSubmit={handleSubmit(formSubmit)}>
            <CustomInput
              name="username"
              label="Username"
              control={control}
              errors={errors}
              isrequired={true}
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
            <CustomInput
              name="confirm_password"
              label="Confirm Password"
              control={control}
              errors={errors}
              isrequired={true}
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              placeholder={"Password"}
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
