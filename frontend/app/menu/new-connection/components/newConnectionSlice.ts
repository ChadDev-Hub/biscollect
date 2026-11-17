import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {getDB} from "@/lib/db";
import { NewConnectionType } from '@/types/new-connection';
import {DeleteRecordType} from '@/types/delete';



// ASYNC THUNKS ============================================================================================
// FETCH NEW CONNECTION
export const fetchNewConnection = createAsyncThunk<NewConnectionType[], void, {rejectValue: string}>(
    "newConnection/fetchNewConnection",
    async () => {
        const db = await getDB();
        const store = db.transaction("new_connections", "readonly").objectStore("new_connections");
        const result = await store.getAll();
        const reverse = result.reverse();
        const filtered = reverse.filter((entry: NewConnectionType) => !entry.is_deleted);
        return filtered;
    },
)
// FETCH CHANGE METER DETAILS
export const fetchNewConnectionDetails = createAsyncThunk<NewConnectionType, string, {rejectValue: string}>(
    "newConnection/fetchNewConnectionDetails",
    async (uuid) => {
        const db = await getDB();
        const store = db.transaction("new_connections", "readonly").objectStore("new_connections");
        const index = store.index("uuid");
        const result = await index.get(uuid);
        return result;
    },
)
// ADD NEW CONNECTION
export const addNewConnection = createAsyncThunk<NewConnectionType, NewConnectionType, {rejectValue: string}>(
    "newConnection/addNewConnection",
    async (data) => {
        try {
            const db = await getDB();
            const transaction = db.transaction("new_connections", "readwrite");
            const store = transaction.objectStore("new_connections");
            await store.put(data);
            await transaction.done;
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("Error adding new connection");
        }
    },
)
// DELETE NEW CONNECTION
export const deleteNewConnection = createAsyncThunk<DeleteRecordType, DeleteRecordType, {rejectValue: string}>(
    "newConnection/deleteNewConnection",
    async (data) => {
        try {
            const db = await getDB();
            const transaction = db.transaction("new_connections", "readwrite");
            const store = transaction.objectStore("new_connections");
            const index = store.index("uuid");
            const result = await index.get(data.uuid);
            result.is_deleted = true;
            result.datetime_deleted = data.datetime_deleted;
            await store.put(result);
            await transaction.done;
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting new connection");
        }
    }
)
// EDIT NEW CONNECTION
export const editNewConnection = createAsyncThunk<NewConnectionType, NewConnectionType, {rejectValue: string}>(
    "newConnection/editNewConnection",
    async (data) => {
        try {
            const db = await getDB();
            const transaction = db.transaction("new_connections", "readwrite");
            const store = transaction.objectStore("new_connections");
            await store.put(data);
            await transaction.done;
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("Error editing new connection");
        }
    }
)


// ASYNC THUNKS ============================================================================================

// INTERFACES ============================================================================================
type NewConnectionState = {
    data: NewConnectionType[];
    loading: boolean;
    error: string;
}
const initialState: NewConnectionState = {
        data: [],
        loading: false,
        error: "",
    };
// INTERFACES ============================================================================================

const NewConnectionSlice = createSlice({
    name: "newConnection",
    initialState,
    reducers: {
        filterNewConnection: (state, action) => {
            state.loading = true;
            state.data = action.payload;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
        // FETCH NEW CONNECTION
        .addCase(fetchNewConnection.fulfilled, (state, action: PayloadAction<NewConnectionType[]>) => {
            state.data = action.payload;
            state.error = "";
            state.loading = false;
        })
        .addCase(fetchNewConnection.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        .addCase(fetchNewConnection.rejected, (state) => {
            state.loading = false;
            state.error = "Error fetching new connection";
        })
        // ADD NEW CONNECTION
        .addCase(addNewConnection.fulfilled, (state, action: PayloadAction<NewConnectionType>) => {
            const maxId = Math.max(...state.data.map((item) => item.id || 0), 0);
            action.payload.id = maxId + 1;
            state.data = [action.payload, ...state.data];
            state.loading = false;
        })
        .addCase(addNewConnection.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        .addCase(addNewConnection.rejected, (state, error) => {
            state.loading = false;
            if (error) state.error = "Error adding new connection";
        })
        // DELETE NEW CONNECTION
        .addCase(deleteNewConnection.fulfilled, (state, action: PayloadAction<DeleteRecordType>) => {
            state.data = state.data.filter((item) => item.uuid !== action.payload.uuid);
            state.loading = false;
            state.error = "";
        })
        .addCase(deleteNewConnection.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        .addCase(deleteNewConnection.rejected, (state, error) => {
            state.loading = false;
            if (error) state.error = "Error deleting new connection";
        })
        // EDIT NEW CONNECTION
        .addCase(editNewConnection.fulfilled, (state, action: PayloadAction<NewConnectionType>) => {
            state.data = state.data.map((item) => item.uuid === action.payload.uuid ? action.payload : item);
            state.loading = false;
            state.error = "";
        })
        .addCase(editNewConnection.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        .addCase(editNewConnection.rejected, (state, error) => {
            state.loading = false;
            if (error) state.error = "Error editing new connection";
        })
        // CHANGE METER DETAILS
        .addCase(fetchNewConnectionDetails.fulfilled, (state) => {
            state.loading = false;
            state.error = "";
        })
        .addCase(fetchNewConnectionDetails.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        .addCase(fetchNewConnectionDetails.rejected, (state, error) => {
            state.loading = false;
            if (error) state.error = "Error changing meter details";
        })
        ;
    },
});

export const { filterNewConnection } = NewConnectionSlice.actions;
export default NewConnectionSlice.reducer;