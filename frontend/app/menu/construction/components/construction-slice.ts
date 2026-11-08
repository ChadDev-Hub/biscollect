import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ConstructionType } from "@/types/construction";
import { getDB } from "../../../../lib/db";

export const fetchConstruction = createAsyncThunk<ConstructionType[], void>(
  "construction/fetchConstruction",
  async () => {
    const db = await getDB();
    const store = db
      .transaction("constructions", "readonly")
      .objectStore("constructions");
    const result = await store.getAll();
    const reverse = result.reverse();
    return reverse;
  },
);

export const addConstructionActivity = createAsyncThunk<void, ConstructionType>(
  "construction/addConstructionActivity",
  async (data: ConstructionType, { rejectWithValue }) => {
    try {
      const db = await getDB();
      const transaction = db.transaction("constructions", "readwrite");
      const store = transaction.objectStore("constructions");
      await store.add(data);
      await transaction.done;
    } catch (error) {
      if (error) return rejectWithValue("Error adding construction activity");
    }
  },
);

type ConstructionState = {
  data: ConstructionType[];
  loading: boolean;
  error: string | null;
};

const initialState: ConstructionState = {
  data: [],
  loading: false,
  error: null,
};

export const constructionSlice = createSlice({
  name: "construction",
  initialState,
  reducers: {
    addConstruction: (state, action: PayloadAction<ConstructionType>) => {
      const maxId = Math.max(...state.data.map((item) => item.id || 0), 0);
      action.payload.id = maxId + 1;
      action.payload.is_deleted = false;
      action.payload.is_synced = false;
      state.data = [action.payload, ...state.data];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchConstruction.fulfilled,
        (state, action: PayloadAction<ConstructionType[]>) => {
          state.data = action.payload;
        },
      )
      .addCase(fetchConstruction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConstruction.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching construction";
      })
      .addCase(addConstructionActivity.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addConstructionActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addConstructionActivity.rejected, (state, error) => {
        state.loading = false;
        if (error) state.error = "Error adding construction activity";
      });
  },
});

export const { addConstruction } = constructionSlice.actions;
export default constructionSlice.reducer;
