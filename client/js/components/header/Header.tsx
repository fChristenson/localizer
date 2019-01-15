import * as React from "react";

interface IHeaderProps {
  username: string;
}

export class Header extends React.PureComponent<IHeaderProps> {
  public render() {
    return (
      <header>
        <ul className="header__ul">
          <li className="header__username">
            {"Logged in as: "}{this.props.username}
          </li>
        </ul>
      </header>
    );
  }
}
