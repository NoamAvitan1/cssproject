import { ProviderSignInButton } from "../_components/login/ProviderSignInButton";
import { DynamicForm } from "../_components/login/DynamicForm";

export default function Login() {

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-full px-8 sm:max-w-md justify-center">
        <section className="flex flex-col gap-4">
          <ProviderSignInButton />
          <div className="text-text my-4 flex min-[420px]:justify-between justify-center items-center w-full">
            <span className="grow bg-slate-500 h-[2px]"></span>
            <p className="px-4 flex">
              Or
              <span className="hidden min-[400px]:block whitespace-pre ml-2">
              with email and password
              </span>
            </p>
            <span className="grow bg-slate-500 h-[2px]"></span>
          </div>
          <DynamicForm />
        </section>
      </div>
    </div>
  );
}
