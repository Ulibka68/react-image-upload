import React from "react";
import styled from "@emotion/styled";
import { connect, ConnectedProps } from "react-redux";
import { LifeGameRootState } from "@/redux/store";

const ChanelWrapper = styled.div<{ bacgroundColor: string }>`
  background: ${({ bacgroundColor }) => bacgroundColor};
  width: 400px;
  height: 60px;
`;

class ChanelsWindowClass extends React.Component<Props, any> {
  clickHandler = (evt: React.SyntheticEvent) => {
    console.log(evt);
    // evt.preventDefault();
    evt.stopPropagation();
  };
  render() {
    return (
      <ChanelWrapper
        bacgroundColor={this.props.backgroundColor}
        onClick={this.clickHandler}
      >
        ChanelsWindow заготовка
      </ChanelWrapper>
    );
  }
}

const connector = connect(
  (state: LifeGameRootState) => state.chanelWindowState
);

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export const ChanelsWindow = connector(ChanelsWindowClass);
