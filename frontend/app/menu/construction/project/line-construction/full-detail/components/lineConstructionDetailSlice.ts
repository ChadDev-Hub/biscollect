import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type{ LineConstructionType } from '@/types/construction';
import { getDB } from '@/lib/db';
type LineConstructionDetail = {
    data?: LineConstructionType
    pending: boolean
    error: string
}

const initialState:LineConstructionDetail = {
    data: undefined,
    pending: false,
    error: '',
}

export const fetchDetail = createAsyncThunk<LineConstructionType, string>(
    'lineConstructionDetail/fetchDetail',
    async (uuid: string) => {
        const db = await getDB();
        const transaction = db.transaction('line_constructions', 'readonly');
        const store = transaction.objectStore('line_constructions');
        const index = store.index('uuid');
        const result = await index.get(uuid);
        return result;
    }
)

export const LineConstructionDetailSlice = createSlice({
    name: 'lineConstructionDetail',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDetail.fulfilled, (state, action) => {
            state.data = action.payload;
            state.pending = false;
            state.error = '';
        })
        .addCase(fetchDetail.pending, (state) => {
            state.pending = true;
            state.error = '';
        })
        .addCase(fetchDetail.rejected, (state, action) => {
            state.pending = false;
            state.error = action.error.message ?? '';
        })
    }
})


const {} = LineConstructionDetailSlice.actions
export default LineConstructionDetailSlice.reducer