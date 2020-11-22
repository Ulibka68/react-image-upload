import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const ColorMaps = ["lightGray", "YellowGreen", "Aqua", "CadetBlue", "Chocolate", "DarkTurquoise", "LawnGreen"];

export const chanelWindowSlice = createSlice({
    name: "cnahelWindow",
    initialState: {
        backgroundColor: "lightGray",
        curColorIndex: 0,
        colorMaps: ColorMaps,
    },
    reducers: {
        changeBgColor(state, action: PayloadAction<string>) {
            state.backgroundColor = action.payload;
        },
        nextColor(state, action: PayloadAction<void>) {
            if (++state.curColorIndex >= state.colorMaps.length) state.curColorIndex = 0;
            state.backgroundColor = state.colorMaps[state.curColorIndex];
        },
    },
});

// export const { reducer, actions } = lifeStateSlice;
export const {reducer} = chanelWindowSlice;
export const {changeBgColor, nextColor} = chanelWindowSlice.actions;
