"use client";
import { useEffect, useState } from "react";
import { LineConstructionType } from "@/types/construction";
import ConstructionCard from "./construction-card";
import {
  UtilityPole,
  Spline,
  GitFork,
  LineDotRightHorizontal,
} from "lucide-react";
import { getDB } from "@/lib/db";
import {
  GetConductorName,
  GetNeutralName,
} from "../../../../../lib/actions/conductor";

const ConductorData = () => {
  const [data, setData] = useState<LineConstructionType[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      const db = await getDB();
      const transaction = db.transaction("line_constructions", "readonly");
      const store = transaction.objectStore("line_constructions");
      const result = await store.getAll();
      const reverse = result.reverse();
      const filtered = reverse.filter(
        (entry: LineConstructionType) => !entry.is_deleted,
      );

      const neutral = await GetNeutralName();
      const conductor = await GetConductorName();

      const conductorMap = new Map(
        conductor?.map((item) => [item.id, item.name]),
      );
      const neutralMap = new Map(neutral?.map((item) => [item.id, item.name]));

      const clean_data = filtered.map((val: LineConstructionType) => ({
          ...val,
          conductor: conductorMap.get(Number(val.conductor))??"",
          neutral: neutralMap.get(Number(val.neutral))??"" 
       
      }));
      setData(clean_data)
    };
    fetchData();
    window.addEventListener("line_constructions-updated", fetchData);
    return () => {
      window.removeEventListener("line_constructions-updated", fetchData);
    };
  }, []);

  return (
    <>
      {data.map((entry: LineConstructionType) => (
        <ConstructionCard
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

export default ConductorData;
