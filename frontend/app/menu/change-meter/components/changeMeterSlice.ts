import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ChangeMeterType } from "@/types/change-meter";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getDB } from "@/lib/db";

// ASYNC THUNKS
export const fetchChangeMeters = createAsyncThunk<ChangeMeterType[], void>(
  "changeMeter/fetchChangeMeters",
  async () => {
    const db = await getDB();
    const store = db
      .transaction("change_meters", "readonly")
      .objectStore("change_meters");
    const result = await store.getAll();
    const reverse = result.reverse();
    return reverse;
  },
);

export const addChangeMeter = createAsyncThunk<
  ChangeMeterType,
  ChangeMeterType,
  { rejectValue: string }
>("changeMeter/addChangeMeter", async (data, { rejectWithValue }) => {
  try {
    const db = await getDB();
    const transaction = db.transaction("change_meters", "readwrite");
    const store = transaction.objectStore("change_meters");
    await store.add(data);
    await transaction.done;
    return data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Error adding change meter");
  }
});

export const fetchChangeMeterDetail = createAsyncThunk<
  ChangeMeterType,
  string,
  { rejectValue: string }
>(
  "changeMeter/fetchChangeMeterDetail",

  async (uuid: string) => {
    try {
      const db = await getDB();
      const transaction = db.transaction("change_meters", "readonly");
      const store = transaction.objectStore("change_meters");
      const index = store.index("uuid");
      const result = await index.get(uuid);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching change meter detail");
    }
  },
);

export const updateChangeMeterDetail = createAsyncThunk<
  ChangeMeterType,
  ChangeMeterType,
  { rejectValue: string }
>(
  "changeMeter/updateChangeMeterDetail",
  async (data) => {
    try {
      const db = await getDB();
      const transaction = db.transaction("change_meters", "readwrite");
      const store = transaction.objectStore("change_meters");
      await store.put(data);
      await transaction.done;
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating change meter detail");
    }
  },
)
// INTERFACES
type ChangeMeterState = {
  data: ChangeMeterType[];
  loading: boolean;
  error: string;
};

const initialState: ChangeMeterState = {
  data: [],
  loading: false,
  error: "",
};

// SLICE
export const ChangeMeterSlice = createSlice({
  name: "changeMeter",
  initialState,
  reducers: {
    // FILTER
    filterChangeMeter: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
    //   FETCH ALL CHANGE METER
      .addCase(
        fetchChangeMeters.fulfilled,
        (state, action: PayloadAction<ChangeMeterType[]>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchChangeMeters.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchChangeMeters.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching change meters";
      })
    //   ADD NEW CHANGE METER
      .addCase(
        addChangeMeter.fulfilled,
        (state, action: PayloadAction<ChangeMeterType>) => {
          const maxId = Math.max(...state.data.map((item) => item.id || 0), 0);
          action.payload.id = maxId + 1;
          state.data = [action.payload, ...state.data];
          state.loading = false;
        },
      )
      .addCase(addChangeMeter.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addChangeMeter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      })
    //   FETCH THE CHANGE METER DETAIL
      .addCase(
        fetchChangeMeterDetail.fulfilled,
        (state) => {
          state.loading = false;
        },
      )
      .addCase(fetchChangeMeterDetail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchChangeMeterDetail.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching change meter detail";
      })
    //   UPDATE THE CHANGE METER DETAIL
      .addCase(
        updateChangeMeterDetail.fulfilled,
        (state, action: PayloadAction<ChangeMeterType>) => {
          state.data = state.data.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
            return item;
          })
          state.loading = false;
        })
      .addCase(updateChangeMeterDetail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateChangeMeterDetail.rejected, (state) => {
        state.loading = false;
        state.error = "Error updating change meter detail";
      })
  },
});
export const { filterChangeMeter } = ChangeMeterSlice.actions;
export default ChangeMeterSlice.reducer;
