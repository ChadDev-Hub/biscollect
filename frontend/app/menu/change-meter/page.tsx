"use client";
import ToolsNavar from "../../common/components/tools-navbar";
import ChangeMeterContainer from "./components/change-meter-container";
import ReturnMenu from "@/app/common/components/buttons/return-menu";
import AddEntries from "@/app/common/components/add-entry";
import ClaudeSyncButton from "@/app/common/components/claude-sync-button";
const ChageMeters = () => {
  return (
    <div className="bg-base-300 min-h-screen  flex flex-col items-center">
      <ToolsNavar>
        <div className="flex-1">
          <ReturnMenu/>
        </div>
        <ClaudeSyncButton />
        <AddEntries />
      </ToolsNavar>
      
        <ChangeMeterContainer />
      
    </div>
  );
};

export default ChageMeters;
