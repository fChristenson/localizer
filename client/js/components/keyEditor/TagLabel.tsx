import * as React from "react";

interface ITagLabelProps {
  show: boolean;
}

export class TagLabel extends React.PureComponent<ITagLabelProps> {
  public render() {
    if (this.props.show === false) {
      return null;
    }
    return (
      <li className="tag-field__li--label">
        <label htmlFor="tags">Tags</label>
      </li>
    );
  }
}
