import * as React from "react";

export class SearchField extends React.PureComponent {
  public render() {
    return (
      <form noValidate>
        <input type="text" placeholder="Search" className="project-bar__searchfield" />
      </form>
    );
  }
}
