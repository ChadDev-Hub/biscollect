"use client";

import ReturnMenu from '@/app/common/components/return-menu';
import ToolsNavar from '../../../common/components/tools-navbar';

import AddTask from './components/addTask';
import ConstructionTaskContainer from './components/constructionTaskContainer';

const ProjectPage = () => {
  return (
    <div className="bg-base-300 min-h-screen  flex flex-col items-center">
        <ToolsNavar>
            <div className="flex-1">
                <ReturnMenu />
            </div>
            <AddTask />
        </ToolsNavar>

        <div>
            <ConstructionTaskContainer />
        </div>
    </div>
  );
};

export default ProjectPage;
