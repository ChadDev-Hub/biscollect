"use client";

import ReturnMenu from "@/app/common/components/buttons/return-menu";
import ToolsNavar from "../../../common/components/tools-navbar";
import AddTask from "./components/addTask";
import ConstructionTaskContainer from "./components/constructionTaskContainer";
import { Suspense } from "react";

const ProjectPage = () => {
  return (
    <>
    <ToolsNavar>
        <div className="flex-1">
          <ReturnMenu />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <AddTask />
        </Suspense>
      </ToolsNavar>
      <div className="flex flex-col gap-4 w-full place-items-center p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ConstructionTaskContainer />
        </Suspense>
      </div>
    
    </>
      
    
  );
};

export default ProjectPage;
