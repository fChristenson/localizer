import * as React from "react";
import { BadgeButton } from "../badgeButton/BadgeButton";

interface IDialogFooterProps {
  tabIndex: number;
  submitButtonText: string;
}

export class DialogFooter extends React.PureComponent<IDialogFooterProps> {
  public render() {
    return (
      <footer className="dialog__footer">
        <BadgeButton tabIndex={this.props.tabIndex}>{this.props.submitButtonText}</BadgeButton>
      </footer>
    );
  }
}
