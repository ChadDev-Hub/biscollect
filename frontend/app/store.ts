import {configureStore} from '@reduxjs/toolkit';
import constructionSlice from '@/app/menu/construction/components/construction-slice';
import constructionTaskSlice from '@/app/menu/construction/project/components/constructionTaskSlice';

export const store  = configureStore({
    reducer: {
        construction: constructionSlice,
        constructionTask: constructionTaskSlice
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;