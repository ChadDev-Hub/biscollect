
import {configureStore} from '@reduxjs/toolkit';
import constructionSlice from '@/app/menu/construction/components/construction-slice';
import constructionTaskSlice from '@/app/menu/construction/project/components/constructionTaskSlice';
import navigationSlice from './common/slice/navigationSlice';
import ChangeMeterSlice from '@/app/menu/change-meter/components/changeMeterSlice';
import NewConnectionSlice from './menu/new-connection/components/newConnectionSlice';
export const store  = configureStore({
    reducer: {
        construction: constructionSlice,
        constructionTask: constructionTaskSlice,
        navigation: navigationSlice,
        changeMeter: ChangeMeterSlice,
        newConnection: NewConnectionSlice
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
                    'constructionTask.construction_task',

                    'lineconstructionDetail.data',
                    'changeMeter.data',
                    'newConnection.data',
                    
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