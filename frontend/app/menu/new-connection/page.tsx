"use client";
import ToolsNavar from "../../common/components/tools-navbar";
import NewConnectionContainer from "./components/new-connection-container";
import ReturnMenu from "@/app/common/components/buttons/return-menu";
import AddEntries from "@/app/common/components/add-entry";
import ClaudeSyncButton from "@/app/common/components/claude-sync-button";

const NewConnection = () => {
  return (
    <div className="bg-base-300 min-h-screen  flex flex-col items-center">
      <ToolsNavar>
        <div className="flex-1">
          <ReturnMenu />
        </div>
        <ClaudeSyncButton />
        <AddEntries />
      </ToolsNavar>
      <main className="flex w-full max-w-6xl flex-col justify-center py-15 px-4">
          <NewConnectionContainer  />
      </main>
    </div>
  );
};

export default NewConnection;
