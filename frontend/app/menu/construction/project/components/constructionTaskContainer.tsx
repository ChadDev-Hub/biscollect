"use client";

import { LineConstructionType } from "@/types/construction";
import { useEffect } from "react";
import ConstructionCardTask from "../line-construction/component/construction-card";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchLineConstructions } from "./constructionTaskSlice";
import { useSearchParams } from "next/navigation";
import { filterData } from "./constructionTaskSlice";
import Search from "@/app/common/components/search";
import NoItemsFound from '../../../../common/components/noItemFound';

import {
  UtilityPole,
  Spline,
  GitFork,
  LineDotRightHorizontal,
} from "lucide-react";

const ConstructionTaskContainer = () => {
  const dispatch = useAppDispatch();
  const {line_constructions, loading} = useAppSelector(
    (state) => state.constructionTask,
  );
  const searchParams = useSearchParams();

  const cuuid = searchParams.get("cuuid");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchLineConstructions(cuuid || ""));
    };
    fetchData();
  }, [dispatch, cuuid]);

 

  return (
    <div className="flex flex-col items-center w-full max-w-6xl gap-5">
      <div className="w-full">
        <Search
          loading={loading}
          resetActions={() => dispatch(fetchLineConstructions(cuuid || ""))}
          data={line_constructions ?? []}
          actions={filterData}
        />
      </div>
      {line_constructions.length === 0 ? <NoItemsFound title="Construction Task" description="There are currently no construction tasks to display." actionLabel="Search" /> : 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {line_constructions.map((entry: LineConstructionType) => (
          <ConstructionCardTask
            title={{
              title: "Line Construction",
              icon: UtilityPole,
              className: "size-4 text-amber-500",
            }}
            uuid={entry.uuid}
            description={entry.description}
            date_accomplished={entry.date_accomplished}
            is_synced={entry.is_synced}
            key={entry.uuid}
            datetime_synced={entry.datetime_synced}
            information={[
              {
                label: "Line Type",
                value: entry.line_type,
                icon: {
                  icon: LineDotRightHorizontal,
                  className: "size-4 text-primary",
                },
              },
              {
                label: "Phasing",
                value: entry.phasing,
                icon: {
                  icon: GitFork,
                  className: "size-4 text-yellow-500",
                },
              },
              {
                label: "Conductor",
                value: entry.conductor,
                icon: {
                  icon: Spline,
                  className: "size-4 text-blue-500",
                },
              },
              {
                label: "Neutral",
                value: entry.neutral,
                icon: {
                  icon: Spline,
                  className: "size-4 text-green-500",
                },
              },
            ]}
          />
        ))}
      </div>}
      
    </div>
  );
};

export default ConstructionTaskContainer;
