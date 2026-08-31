"use client";
import React from "react";
import { Settings, ChevronDown } from "lucide-react";
type Props = {
  title: string;
  returnMenu?: React.ReactNode;
  tools?: React.ReactNode[];
};

const Header = ({ title, returnMenu, tools }: Props) => {
  const [rotate, setRotate] = React.useState(false);
  const handleRotate = () => setRotate(!rotate);
  return (
    <header className="p-4 w-full flex items-center text-center bg-base-200 rounded-b-4xl">
      {returnMenu}
      <h1 className="text-lg text-primary justify-self-center flex-1 font-bold">
        {title}
      </h1>
      {tools && tools.length > 0 && (
        <>
          <button
            onClick={handleRotate}
            className="btn btn-circle btn-sm btn-secondary"
            popoverTarget="popover-1"
            style={{ anchorName: "--anchor-1" } as React.CSSProperties}
          >
            <label className="swap swap-rotate w-full">
              <input type="checkbox" />
              <ChevronDown className="swap-on size-6" />
              <Settings className="swap-off  size-6" />
            </label>
          </button>

          <ul
            className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
            popover="auto"
            id="popover-1"
            style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
          >
            {tools?.map((tool, index) => (
              <li key={index}>{tool}</li>
            ))}
          </ul>
        </>
      )}
    </header>
  );
};

export default Header;
