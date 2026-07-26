"use client";
import ThemeToggle from "../theme-toggle";
import { EllipsisVertical } from "lucide-react";
import GoogleLoginButton from "../../../google-login/components/login";
const DropDownSettings = () => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
        <EllipsisVertical className="size-6" />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu gap-2 bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <ThemeToggle />
        </li>
        <li>
          <GoogleLoginButton />
        </li>
      </ul>
    </div>
  );
};

export default DropDownSettings;
