import * as React from "react";

export class Languages extends React.PureComponent {
  public render() {
    return (
      <ul className="project-bar__languages">
        <li className="project-bar__langauge">
          <img src="/images/us.svg" />
        </li>
        <li className="project-bar__langauge">
          <img src="/images/se.svg" />
        </li>
      </ul>
    );
  }
}
