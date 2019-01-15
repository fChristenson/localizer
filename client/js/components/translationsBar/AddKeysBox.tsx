import * as React from "react";
import { BadgeButton } from "../badgeButton/BadgeButton";

interface IAddKeysBoxProps {
  numberOfKeys: number;
}

export class AddKeysBox extends React.PureComponent<IAddKeysBoxProps> {
  public render() {
    return (
      <div className="add-keys-box">
        <span className="add-keys-box__keys">Keys</span>
        <span className="add-keys-box__number">{this.props.numberOfKeys}</span>
        <BadgeButton>
          Add key
        </BadgeButton>
      </div>
    );
  }
}
