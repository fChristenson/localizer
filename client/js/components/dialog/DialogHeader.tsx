import * as React from "react";

interface IDialogHeaderProps {
  title: string;
  onClose: (event: React.MouseEvent<HTMLElement>) => boolean;
}

export class DialogHeader extends React.Component<IDialogHeaderProps> {
  public render() {
    return (
      <header className="dialog__header">
        <h2 className="dialog__title">{this.props.title}</h2>
        <button autoFocus onClick={this.props.onClose} className="dialog__close" tabIndex={1}>×</button>
      </header>
    );
  }
}
