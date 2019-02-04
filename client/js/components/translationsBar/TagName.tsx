import * as React from "react";

interface ITagNameProps {
  tag: string;
}

export class TagName extends React.PureComponent<ITagNameProps> {
  public render() {
    if (this.props.tag === "") {
      return <span></span>;
    } else {
      return <span className="tag-filtering-box__tag">Tag: {this.props.tag}</span>;
    }
  }
}
