"use client";

import { LineConstructionType } from "@/types/construction";
import { useEffect} from 'react'
import ConstructionCardTask from "./construction-card";
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {fetchLineConstructions} from "./constructionTaskSlice";
import {useSearchParams} from 'next/navigation';
import {
  UtilityPole,
  Spline,
  GitFork,
  LineDotRightHorizontal,
} from "lucide-react";


const ConstructionTaskContainer = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.constructionTask.line_constructions);
  const searchParams = useSearchParams();

  const cuuid = searchParams.get("cuuid");
  
  useEffect(()=>{
    
    const fetchData = async () => {
      dispatch(fetchLineConstructions(cuuid || ''));
    }
    fetchData();
  }, [dispatch, cuuid])

  return (
    <>
      {data.map((entry: LineConstructionType) => (
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
    </>
  );
};

export default ConstructionTaskContainer;
