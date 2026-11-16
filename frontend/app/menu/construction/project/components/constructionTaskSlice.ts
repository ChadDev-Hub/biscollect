import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LineConstructionType } from "@/types/construction";
import type { ConductorName } from "@/types/conductor-wire";
import { GetConductorName, GetNeutralName } from "@/lib/actions/conductor";
import { getDB } from "@/lib/db";
import { GetTransformerType } from '@/lib/actions/transformer';
import type {TransformerType, TransformerInstallation} from "@/types/transformer";


// FETCH CONSTRUCTION TASK 
export const fetchConstructionTask = createAsyncThunk<
  LineConstructionType[] | TransformerInstallation[],
  string,
  { rejectValue: string }
>("constructionTask/fetchConstructionTask", async (cuuid: string) => {
  try {
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

    const transformer_type = await GetTransformerType();
    const transformerDataTransaction = (await db).transaction("transformer_constructions", "readonly");
    const transformerStore = transformerDataTransaction.objectStore("transformer_constructions");
    const transformerIndex = transformerStore.index("cuuid");
    const transformerResult = await transformerIndex.getAll(cuuid);
    const transformerReverse = transformerResult.reverse();

    transformerReverse.forEach((transformer) => {
      transformer.transformer_type = transformer_type?.find(
        (item) => item.id === transformer.transformer_type,
      )?.name;
    })
    return [...reverse, ...transformerReverse];
  } catch (error) {
    console.error(error);
    throw error;
  }
})


//  LINE CONSTRUCTION ----------------------------------------------------------


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
    )?.id;
    result.neutral = neutralData?.find(
      (item) => item.id === result.neutral,
    )?.id;
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



// =================================== TRANSFORMER =====================================
export const fetchTransformerType = createAsyncThunk<TransformerType[], void, { rejectValue: string }>(
  "constructionTask/fetchTransformerType",
  async () => {
    try {
      const transformerType = await GetTransformerType();
      return transformerType ?? [];
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching transformer type");
    }
  }
)



export const AddTransformertoDb = createAsyncThunk<
  TransformerInstallation,
  TransformerInstallation,
  { rejectValue: string }

>(
  "constructionTask/AddTransformertoDb",
  async (data) => {
    try {
      const db = await getDB();
      const transaction = db.transaction("transformer_constructions", "readwrite");
      const store = transaction.objectStore("transformer_constructions");
      await store.add(data);
      await transaction.done;

      const transformer_type = await GetTransformerType();
      const newData: TransformerInstallation = {
        ...data,
        transformer_type: transformer_type?.find((item) => item.id === data.transformer_type)?.name ?? "",
    
      }
      return newData;
    } catch (error) {
      console.error(error);
      throw new Error("Error adding transformer type");
    }
  }
)

// =================================== TRANSFORMER =====================================

type ConstructionTaskType = (
  LineConstructionType | TransformerInstallation
)[]


type ConstructionTaskState = {
  construction_task: ConstructionTaskType;
  conductor: ConductorName[] | [];
  neutral: ConductorName[] | [];
  transformer_type: TransformerType[] | [];
  error: string;
  loading: boolean;
};

const initialState: ConstructionTaskState = {
  construction_task: [],
  conductor: [],
  transformer_type: [],
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
      state.construction_task = action.payload;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(fetchConstructionTask.fulfilled, (state, action: PayloadAction<ConstructionTaskType>) => {
      state.construction_task = action.payload;
      state.error = "";
      state.loading = false;
    })
    .addCase(fetchConstructionTask.pending, (state) => {
      state.loading = true;
      state.error = "";
    })
    .addCase(fetchConstructionTask.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching construction task";
    });
    builder
      
     

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
          ...state.construction_task.map((item) => item.id || 0),
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
        state.construction_task = [newData, ...state.construction_task as LineConstructionType[]];
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
        state.construction_task= state.construction_task.map((item) => {
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
      });

      // TRANSFORMER DATA
      builder
      .addCase(fetchTransformerType.fulfilled, (state, action) => {
        state.loading = true;
        state.transformer_type = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransformerType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchTransformerType.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching transformer type";
      }) 
      .addCase(AddTransformertoDb.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        const maxId = Math.max(
          ...state.construction_task.map((item) => item.id || 0),
          0,
        );
        action.meta.arg.id = maxId + 1;
        const newData = {
          ...action.payload,
          id : maxId + 1,
        }
        state.construction_task = [newData, ...state.construction_task as TransformerInstallation[]];
      })
  },
  
});

export const { filterData } = constructionTaskSlice.actions;
export default constructionTaskSlice.reducer;
