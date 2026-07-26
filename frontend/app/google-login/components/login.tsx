"use client";
import {useRouter} from "next/navigation";
import GoogleIcon from "./googleIcon";
const GoogleLoginButton = () => {
  const router = useRouter();
  const handleGoogleLogin = () => {
    router.push("/google-login");
  };

  return (
    <div className="aura">
      <button onClick={handleGoogleLogin} className="flex btn w-full justify-between">
        <span className="text-xs">Sign in with Google</span>
        <span>
          <GoogleIcon />
        </span>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
