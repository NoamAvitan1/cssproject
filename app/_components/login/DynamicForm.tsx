'use client'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BaseSyntheticEvent, useState } from "react";
import { object, string } from "yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import Messages from "./messages";

type Props = {

};

export const DynamicForm: React.FC<Props> = (props) => {

  YupPassword(yup);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [type, setType] = useState<"sign-in" | "sign-up">("sign-in");
  const [validationError, setValidationError] = useState<yup.ValidationError | null>(null);

  const authSchema = () => {
    let passwordValidation = string().min(8).required();

    if (type === "sign-up") {
      passwordValidation =
      passwordValidation.password() as typeof passwordValidation;
    }

    return object({
      email: string().email().required(),
      password: passwordValidation,
    });
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    try {
      const inputs = e.target.elements;
      const forValidation = {
        email: inputs[0]?.value,
        password: inputs[1]?.value,
        confirmPassword: inputs[2]?.value,
      };
      if (type === 'sign-up' && forValidation.confirmPassword !== forValidation.password) {
        e.preventDefault();
        throw new Error("Passwords do not match");
      }
      authSchema()
        .validate(forValidation)
        .catch((error: yup.ValidationError) => {
          e.preventDefault();
          setValidationError(error);
        });
    } catch (error : any) {
      setValidationError(error);
    }
  };

  return (
    <form
      className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action={`/auth/${type}`}
      method="post"
      onSubmit={(e) => handleSubmit(e)}
    >
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <section className="rounded-md border mb-6 flex justify-between items-center relative">
        <input
          className="p-2 w-full text-[#060504]"
          name="email"
          placeholder="you@example.com"
        />
      </section>
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <section className="rounded-md border mb-6 flex justify-between items-center relative">
        <input
          className="p-2 w-full text-[#060504]"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          required
        />
        <span className="absolute right-2.5 cursor-pointer">
          {showPassword ? (
            <AiOutlineEye className="text-slate-900"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiOutlineEyeInvisible className="text-slate-900"
              onClick={() => setShowPassword(true)}
            />
          )}{" "}
        </span>
      </section>
      {type === 'sign-up' && <div>
      <label className="text-md" htmlFor="password">
        Confirm Password
      </label>
      <section className="rounded-md border mb-6 flex justify-between items-center relative">
        <input
          className="p-2 w-full text-[#060504]"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          required
        />
        <span className="absolute right-2.5 cursor-pointer">
          {showPassword ? (
            <AiOutlineEye className="text-slate-900"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiOutlineEyeInvisible className="text-slate-900"
              onClick={() => setShowPassword(true)}
            />
          )}{" "}
        </span>
      </section>
        </div>}
      <p className="text-sm">
        {(type === "sign-in" ? "Not a user?" : "Login User?")+" "}
        <button className="text-blue-400"
          type="button"
          onClick={() => {
            type === "sign-in" ? setType("sign-up") : setType("sign-in");
          }}
        >
          {type === "sign-in" ? "sign-up" : "sign-in"}
        </button>
      </p>
      <button className="bg-secondary rounded px-4 py-2 text-text mb-2">
        {type}
      </button>
      <Messages validationError={validationError} />
    </form>
  );
};