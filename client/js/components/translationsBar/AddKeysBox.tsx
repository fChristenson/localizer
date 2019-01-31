import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { BadgeButton } from "../badgeButton/BadgeButton";

interface IAddKeysBoxProps extends IContextProps {
  numberOfKeys: number;
}

class AddKeysBoxComponent extends React.PureComponent<IAddKeysBoxProps> {
  public render() {
    return (
      <div className="add-keys-box">
        <span className="add-keys-box__keys">Keys</span>
        <span className="add-keys-box__number">{this.props.numberOfKeys}</span>
        <BadgeButton onClick={this.props.context.onOpenKeyEditor}>
          Add key
        </BadgeButton>
      </div>
    );
  }
}

export const AddKeysBox = withAppContext(AddKeysBoxComponent);
