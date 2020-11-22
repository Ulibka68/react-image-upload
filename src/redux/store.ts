import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {fork, take} from "redux-saga/effects";
import {chanelWindowSlice} from "@/modules/ChanelWindow/chanel_window_reducer";
import {GlobalWindowClickSaga} from "@/modules/ChanelWindow/chanelsWindowSaga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield fork(GlobalWindowClickSaga);
}

const reducer = combineReducers({
    chanelWindowState: chanelWindowSlice.reducer,
});

export const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type LifeGameRootState = ReturnType<typeof reducer>;
