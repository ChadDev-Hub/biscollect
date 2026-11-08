import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LineConstructionType } from "@/types/construction";
import {getDB} from "@/lib/db";

export const fetchLineConstructions = createAsyncThunk<LineConstructionType[], string>(
    "constructionTask/fetchLineConstructions",
    async (cuuid: string) => {
        console.log("fetchLineConstructions",cuuid);
        const db = getDB();
        const transaction = (await db).transaction("line_constructions", "readonly");
        const store = transaction.objectStore("line_constructions");
        const index = store.index("cuuid");
        const result = await index.getAll(cuuid);
        const reverse = result.reverse();
        return reverse;
    }
)




type ConstructionTaskState = {
    line_constructions: LineConstructionType[] | []
    error: string
    loading: boolean
}


const initialState: ConstructionTaskState = {
    line_constructions: [],
    error: '',
    loading: false
}




export const constructionTaskSlice = createSlice({
    name: 'constructionTask',
    initialState,
    reducers: {
        addLineConstruction: (state, action: PayloadAction<LineConstructionType>) => {
            const maxId = Math.max(...state.line_constructions.map((item) => item.id || 0), 0);
            action.payload.id = maxId + 1;
            state.line_constructions =   [action.payload, ...state.line_constructions]
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchLineConstructions.fulfilled, (state, action: PayloadAction<LineConstructionType[]>) => {
            state.line_constructions = action.payload;
            state.error = '';
            state.loading = false;
        })
        .addCase(fetchLineConstructions.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchLineConstructions.rejected, (state) => {
            state.loading = false;
            state.error = 'Error fetching line constructions';
        })
    }
})

export const {addLineConstruction} = constructionTaskSlice.actions
export default constructionTaskSlice.reducer