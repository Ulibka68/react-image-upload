import React from "react";
import {connect, ConnectedProps} from "react-redux";
import * as chanelWindowSlice from "@modules/ChanelWindow/chanel_window_reducer";
import {LifeGameRootState} from "@/redux/store";
import styled from "@emotion/styled";

const Button = styled.button`
    color: turquoise;
`;

class testPage extends React.Component<Props> {
    render() {
        return (
            <div>
                <h1>Test</h1>
                <Button>This my button component.</Button>
            </div>
        );
    }
}

const connector = connect((state: LifeGameRootState) => state.chanelWindowState, {
    changeBgColor: chanelWindowSlice.changeBgColor,
    nextColor: chanelWindowSlice.nextColor,
});

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export const TestPage = connector(testPage);
