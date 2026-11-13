import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LineConstructionType } from "@/types/construction";
import type { ConductorName } from "@/types/conductor-wire";
import { GetConductorName, GetNeutralName } from "@/lib/actions/conductor";
import { getDB } from "@/lib/db";

//  LINE CONSTRUCTION ----------------------------------------------------------
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

  const conductorData = await GetConductorName();
  const neutralData = await GetNeutralName();

  reverse.forEach((line) => {
    line.conductor = conductorData?.find(
      (item) => item.id === line.conductor,
    )?.name;
    line.neutral = neutralData?.find((item) => item.id === line.neutral)?.name;
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

export const fetchConstructionLineDetail = createAsyncThunk<
  LineConstructionType,
  string,
  { rejectValue: string }
>("constructionTask/fetchConstructionLineDetail", async (uuid: string) => {
  try {
    const db = await getDB();
    const transaction = db.transaction("line_constructions", "readonly");
    const store = transaction.objectStore("line_constructions");
    const index = store.index("uuid");
    const result = await index.get(uuid);
  
    const conductorData = await GetConductorName();
    const neutralData = await GetNeutralName();
    result.conductor = conductorData?.find(
      (item) => item.id === result.conductor,
    )?.name;
    result.neutral = neutralData?.find(
      (item) => item.id === result.neutral,
    )?.name;
    console.log(result)
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching construction line detail");
  }
});

export const updateConstructionLineDetail = createAsyncThunk<
  LineConstructionType,
  LineConstructionType,
  { rejectValue: string }
>(
  "constructionTask/updateConstructionLineDetail",
  async (data) => {
    try {
      const db = await getDB();
      const transaction = db.transaction("line_constructions", "readwrite");
      const store = transaction.objectStore("line_constructions");
      await store.put(data);
      await transaction.done;
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating construction line detail");
    }
  },
)
//  LINE CONSTRUCTION ----------------------------------------------------------

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

      // ADD CONSTRUCTION LINE DATA
      .addCase(AddContructionLinetoDb.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        const maxId = Math.max(
          ...state.line_constructions.map((item) => item.id || 0),
          0,
        );
        action.meta.arg.id = maxId + 1;
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
      })
      .addCase(AddContructionLinetoDb.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AddContructionLinetoDb.rejected, (state) => {
        state.loading = false;
        state.error = "Error adding construction line";
      })
      // FETCH CONSTRUCTION LINE DETAIL
      .addCase(fetchConstructionLineDetail.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchConstructionLineDetail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchConstructionLineDetail.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching construction line detail";
      })
      // UPDATE CONSTRUCTION LINE DETAIL
      .addCase(updateConstructionLineDetail.fulfilled, (state, action: PayloadAction<LineConstructionType>) => {
        state.line_constructions = state.line_constructions.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        })
        state.loading = false;
        state.error = ''
      })
      .addCase(updateConstructionLineDetail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateConstructionLineDetail.rejected, (state) => {
        state.loading = false;
        state.error = "Error updating construction line detail";
      })
  },
});

export const { filterData } = constructionTaskSlice.actions;
export default constructionTaskSlice.reducer;
