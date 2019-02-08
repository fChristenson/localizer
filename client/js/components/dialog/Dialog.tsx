import * as React from "react";

interface IDialogProps {
  show: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => boolean;
}

export class Dialog extends React.PureComponent<IDialogProps> {
  public render() {
    if (this.props.show === false) {
      return null;
    }

    return (
      <div className="dialog">
        <div className="dialog__click-catcher" onClick={this.props.onClose}></div>
        <div className="dialog__dialog">
          {this.props.children}
        </div>
      </div>
    );
  }
}
