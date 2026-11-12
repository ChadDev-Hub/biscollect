import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction} from "@reduxjs/toolkit";
import type { LineConstructionType } from "@/types/construction";
import type { ConductorName } from "@/types/conductor-wire";
import { GetConductorName, GetNeutralName } from "@/lib/actions/conductor";
import { getDB } from "@/lib/db";


export const fetchLineConstructions = createAsyncThunk<
  LineConstructionType[],
  string
>("constructionTask/fetchLineConstructions", async (cuuid: string) => {
  const db = getDB();
  const transaction = (await db).transaction("line_constructions", "readonly");
  const store = transaction.objectStore("line_constructions");
  const index = store.index("cuuid");
  const result = await index.getAll(cuuid);
  const reverse = result.reverse();

  const conductorData =  await GetConductorName();
  const neutralData = await GetNeutralName();

  reverse.forEach((line) => {
    line.conductor = conductorData?.find((item) => item.id === line.conductor)?.name ;
    line.neutral = neutralData?.find((item) => item.id === line.neutral)?.name ;
  });
  return reverse;
});

export const fetchConductorData = createAsyncThunk<ConductorName[], void>(
  "constructionTask/fetchConductorData",
  async () => {
    try {
      const conductorData = await GetConductorName();
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
);

export const AddContructionLinetoDb = createAsyncThunk<
  void,
  LineConstructionType
>(
  "constructionTask/AddContructionLintoDb",
  async (data: LineConstructionType, { rejectWithValue }) => {
    try {
      const db = await getDB();
      const transaction = db.transaction("line_constructions", "readwrite");
      const store = transaction.objectStore("line_constructions");
      await store.add(data);
      await transaction.done;
    } catch (error) {
      if (error) return rejectWithValue("Error adding construction activity");
    }
  },
);

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
    filterData: (state, action) => {
      state.loading = true;
      state.line_constructions = action.payload;
      state.loading = false;
    }
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

      // ADD CONSTRUCTION LINE DATA
      .addCase(
        AddContructionLinetoDb.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = "";
          
          const maxId = Math.max(
            ...state.line_constructions.map((item) => item.id || 0),
            0,
          );
          action.meta.arg.id= maxId + 1;
          const newData = {
            ...action.meta.arg,
            conductor: state.conductor.find(
              (item) => item.id === action.meta.arg.conductor,
            )?.name as string,
            neutral: state.neutral.find(
              (item) => item.id === action.meta.arg.neutral,
            )?.name as string,
          };
          state.line_constructions = [newData, ...state.line_constructions];
        },
      );
  },
});

export const { filterData } = constructionTaskSlice.actions;
export default constructionTaskSlice.reducer;
