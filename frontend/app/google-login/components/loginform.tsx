"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleIcon from "./googleIcon";
import { useOnline } from "../../../app/common/components/hooks/online-provider";
import { useAlert } from '@/app/common/components/alert';
import { Login } from "@/lib/actions/login"
import {useRouter} from "next/navigation";
type FormType = {
  secretKey: string;
};

const Loginform = () => {
  const { register, handleSubmit, formState: { errors} } = useForm<FormType>();
  const { isOnline } = useOnline();
  const { showAlert} = useAlert();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormType> = async(data) => {
    const formData = new FormData();
    formData.append("secret", data.secretKey);
    try {
        const results = await Login(formData);
        if (results.url) {
            router.push(results.url);
        }
        localStorage.setItem("LoginStatus", "true");
    }
    catch (error) {
        console.error(error);
        showAlert((error as Error).message, "error");
        localStorage.setItem("LoginStatus", "false");
    }
  };
  return (
    <div className="flex flex-col gap-4 p-5 justify-center items-center mt-10  w-full max-w-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex bg-base-200 rounded-box flex-col gap-2 items-center p-4 w-full"
      >
        <input
          {...register("secretKey", { required: { value: true, message: "Secret Key is required"} })}
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Secret Key"
        />
        {errors.secretKey && <p className="text-red-500 text-xs italic"> {errors.secretKey.message}</p>}
        <div className="aura aura-rainbow aura-dual">
          <button
            disabled={!isOnline}
            type="submit"
            className="btn btn-primary"
          >
            <span>Continue with</span>
            <GoogleIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Loginform;
