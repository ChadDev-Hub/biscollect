
import {configureStore} from '@reduxjs/toolkit';
import constructionSlice from '@/app/menu/construction/components/construction-slice';
import constructionTaskSlice from '@/app/menu/construction/project/components/constructionTaskSlice';
import navigationSlice from './common/slice/navigationSlice';
import LineConstructionSlice from '@/app/menu/construction/project/line-construction/full-detail/components/lineConstructionDetailSlice';
export const store  = configureStore({
    reducer: {
        construction: constructionSlice,
        constructionTask: constructionTaskSlice,
        navigation: navigationSlice,
        lineconstructionDetail: LineConstructionSlice
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'constructionTask/AddContructionLintoDb',
                    'constructionTask/fetchLineConstructions',
                    'constructionTask/addLineConstruction',
                    'lineConstructionDetail/fetchDetail',
                ],
                ignoredPaths: [
                    'constructionTask.line_constructions',
                    'lineconstructionDetail.data',
                ],
                ignoredActionPaths: [
                    /meta.arg/,
                    'meta.arg.file',
                    /^payload\.(?:\d+\.)?image$/
                ]
            }
        })
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;