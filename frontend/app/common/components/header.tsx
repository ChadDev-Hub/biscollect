"use client";
import { useState } from "react";
import { Settings, ChevronDown } from "lucide-react";
type Props = {
  title: string;
  returnMenu?: React.ReactNode;
  tools?: React.ReactNode[];
};

const Header = ({ title, returnMenu, tools }: Props) => {
  const [Open, setOpen] = useState(false);
  const handleRotate = () => setOpen((prev) => !prev);
  
  return (
    <header className="p-4 w-full flex items-center text-center bg-base-200 rounded-b-4xl">
      {returnMenu}
      <h1 className="text-lg text-primary justify-self-center flex-1 font-bold">
        {title}
      </h1>
      {tools && tools.length > 0 && (
        <div className="relative">
          <button
            onClick={handleRotate}
            className="btn btn-circle btn-sm btn-secondary"
          >
            {Open ? (
              < label className="swap swap-rotate">
              <ChevronDown className="size-6 swap-off" />
              <Settings className="size-6 swap-on" />
              </ label>
              
            ) : (
              <label className="swap swap-rotate">
              <ChevronDown className="size-6 swap-on" />
              <Settings className="size-6 swap-off" />
              </label>
            )}
          </button>

          {Open && (
            <ul className=" absolute right-0 top-full mt-2 menu w-52 rounded-box bg-base-100 z-100 shadow-sm">
              {tools?.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
