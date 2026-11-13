
import {configureStore} from '@reduxjs/toolkit';
import constructionSlice from '@/app/menu/construction/components/construction-slice';
import constructionTaskSlice from '@/app/menu/construction/project/components/constructionTaskSlice';
import navigationSlice from './common/slice/navigationSlice';
import ChangeMeterSlice from '@/app/menu/change-meter/components/changeMeterSlice';
export const store  = configureStore({
    reducer: {
        construction: constructionSlice,
        constructionTask: constructionTaskSlice,
        navigation: navigationSlice,
        changeMeter: ChangeMeterSlice
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
                    'changeMeter.data',
                ],
                ignoredActionPaths: [
                    /meta.arg/,
                    'meta.arg.file',
                    /^payload(?:\.\d+)?(?:\.item)?\.image$/,
                ]
            }
        })
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;