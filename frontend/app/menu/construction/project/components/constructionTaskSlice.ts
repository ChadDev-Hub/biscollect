import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LineConstructionType } from "@/types/construction";
import type { ConductorName } from "@/types/conductor-wire";
import { GetConductorName, GetNeutralName } from "@/lib/actions/conductor";

import { getDB } from "@/lib/db";

export const fetchLineConstructions = createAsyncThunk<
  LineConstructionType[],
  string
>("constructionTask/fetchLineConstructions", async (cuuid: string) => {
  console.log("fetchLineConstructions", cuuid);
  const db = getDB();
  const transaction = (await db).transaction("line_constructions", "readonly");
  const store = transaction.objectStore("line_constructions");
  const index = store.index("cuuid");
  const result = await index.getAll(cuuid);
  const reverse = result.reverse();
  return reverse;
});

export const fetchConductorData = createAsyncThunk<ConductorName[], void>(
  "constructionTask/fetchConductorData",
  async () => {
    try {
      const conductorData = await GetConductorName();
      console.log(conductorData);
      return conductorData ?? [];
    } catch (error) {
      throw error;
    }
  },
);


export const fetchNeutralData = createAsyncThunk<ConductorName[], void>(
  "constructionTask/fetchNeutralData",
  async () => {
    try {
      const neutralData = await GetNeutralName();
      return neutralData ?? [];
    } catch (error) {
      throw error;
    }
  },
)


type ConstructionTaskState = {
  line_constructions: LineConstructionType[] | [];
  conductor: ConductorName[] | [];
  neutral: ConductorName[] | [];
  error: string;
  loading: boolean;
};

const initialState: ConstructionTaskState = {
  line_constructions: [],
  conductor: [],
  error: "",
  loading: false,
  neutral: [],
};

export const constructionTaskSlice = createSlice({
  name: "constructionTask",
  initialState,
  reducers: {
    addLineConstruction: (
      state,
      action: PayloadAction<LineConstructionType>,
    ) => {
      const maxId = Math.max(
        ...state.line_constructions.map((item) => item.id || 0),
        0,
      );
      action.payload.id = maxId + 1;
      state.line_constructions = [action.payload, ...state.line_constructions];
    },
  },
  extraReducers: (builder) => {
    builder
    // LINE CONSTRUCTION DATA
      .addCase(
        fetchLineConstructions.fulfilled,
        (state, action: PayloadAction<LineConstructionType[]>) => {
          state.line_constructions = action.payload;
          state.error = "";
          state.loading = false;
        },
      )
      .addCase(fetchLineConstructions.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchLineConstructions.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching line constructions";
      })

    // CONDUCTOR DATA
    .addCase(
      fetchConductorData.fulfilled,
      (state, action: PayloadAction<ConductorName[]>) => {
        state.conductor = action.payload;
        state.error = "";
        state.loading = false;
      },
    )
    .addCase(fetchConductorData.pending, (state) => {
      state.loading = true;
      state.error = "";
    })
    .addCase(fetchConductorData.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching conductor data";
    })

    // NEUTRAL DATA
    .addCase(
      fetchNeutralData.fulfilled,
      (state, action: PayloadAction<ConductorName[]>) => {
        state.neutral = action.payload;
        state.error = "";
        state.loading = false;
      },
    )
    .addCase(fetchNeutralData.pending, (state) => {
      state.loading = true;
      state.error = "";
    })
    .addCase(fetchNeutralData.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching neutral data";
    })
  },
});

export const { addLineConstruction } = constructionTaskSlice.actions;
export default constructionTaskSlice.reducer;
