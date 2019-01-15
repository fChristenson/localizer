import * as React from "react";

export enum BadgeButtonVariant {
  ACTIVE,
}

interface IBadgeButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant?: BadgeButtonVariant;
}

const getVariant = (variant?: BadgeButtonVariant): string => {
  if (variant === BadgeButtonVariant.ACTIVE) {
    return "label-btn label-btn-active";
  }
  return "label-btn";
};

export class BadgeButton extends React.PureComponent<IBadgeButtonProps> {
  public render() {
    return (
      <button className={getVariant(this.props.variant)} {...this.props}>
        {this.props.children}
      </button>
    );
  }
}
