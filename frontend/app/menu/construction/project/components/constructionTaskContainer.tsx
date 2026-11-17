"use client";

import { LineConstructionType } from "@/types/construction";
import { useEffect } from "react";
import ConstructionCardTask from "@/app/menu/construction/project/(task)/line-construction/component/construction-card";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchConstructionTask } from "./constructionTaskSlice";
import { useSearchParams } from "next/navigation";
import { filterData } from "./constructionTaskSlice";
import Search from "@/app/common/components/search";
import NoItemsFound from "../../../../common/components/noItemFound";
import TransformerInstallationCard from "../(task)/transformer-installation/components/transformer-installation-card";

const ConstructionTaskContainer = () => {
  const dispatch = useAppDispatch();
  const { construction_task, loading } = useAppSelector(
    (state) => state.constructionTask,
  );
  const searchParams = useSearchParams();

  const cuuid = searchParams.get("cuuid");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchConstructionTask(cuuid || ""));
    };
    fetchData();
  }, [dispatch, cuuid]);

  return (
    <div className="flex flex-col items-center w-full max-w-6xl gap-5">
      <div className="w-full">
        <Search
          loading={loading}
          resetActions={() => dispatch(fetchConstructionTask(cuuid || ""))}
          data={construction_task ?? []}
          actions={filterData}
        />
      </div>
      {construction_task.length === 0 ? (
        <NoItemsFound
          title="Construction Task"
          description="There are currently no construction tasks to display."
          actionLabel="Search"
        />
      ) : (
        <div className="grid transition-all duration-500 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {construction_task.map((entry, index) => {
            switch (entry.task) {
              case "Line Construction":
                return (
                  <ConstructionCardTask
                    key={index}
                    data={entry as LineConstructionType}
                  />
                );

              case "Transformer Installation":
                return <TransformerInstallationCard key={index} data={entry} />;
              default:
                return null;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default ConstructionTaskContainer;
