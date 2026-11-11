import {createSlice} from "@reduxjs/toolkit";


type NavigationState = {
    history: string[];
}

const initialState: NavigationState = {
    history: [],
}


export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        pushUrl: (state, action) => {
            state.history.push(action.payload);
        },
        popUrl: (state) => {
            state.history.pop();
        },
        clearHistory: (state) => {
            state.history = [];
        }
    }
})

export const {pushUrl, popUrl, clearHistory} = navigationSlice.actions;
export default navigationSlice.reducer;