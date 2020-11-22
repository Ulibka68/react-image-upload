import {eventChannel, END} from "redux-saga";
import {take, put, call} from "redux-saga/effects";
import * as wind from "@/modules/ChanelWindow/chanel_window_reducer";

function windowsEvent(eventName: string) {
    return eventChannel((emitter) => {
        window.addEventListener(eventName, emitter);
        // The subscriber must return an unsubscribe function
        return () => {
            window.removeEventListener(eventName, emitter);
        };
    });
}

export function* GlobalWindowClickSaga() {
    const chanel = yield call(windowsEvent, "click");
    while (true) {
        const event = yield take(chanel);
        yield put(wind.nextColor());
    }
}
