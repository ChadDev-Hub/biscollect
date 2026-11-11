"use client";

import ReturnMenu from "@/app/common/components/buttons/return-menu";
import ToolsNavar from "@/app/common/components/tools-navbar";
import ProjectForm from "@/app/menu/construction/components/project-form";
import ClaudeSyncButton from "@/app/common/components/claude-sync-button";
import AddProject from "@/app/common/components/buttons/add-project";
import ConstructionContainer from "./components/constuction-project-containter";
const Construction = () => {
  return (
    <div className="bg-base-300 flex flex-col items-center min-h-screen justify-center">
      <ToolsNavar>
        <div className="flex-1">
          <ReturnMenu/>
        </div>
        <ClaudeSyncButton />
        <AddProject>
          <ProjectForm />
        </AddProject>
      </ToolsNavar>
      <main className="flex flex-1 w-full max-w-2xl flex-col items-center justify-between py-15 px-4">
        <ConstructionContainer />
      </main>
    </div>
  );
};

export default Construction;
