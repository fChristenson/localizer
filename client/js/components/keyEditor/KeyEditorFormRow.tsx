import * as React from "react";

interface IKeyEditorFormRow {
  htmlFor: string;
  label: string;
}

export class KeyEditorFormRow extends React.PureComponent<IKeyEditorFormRow> {
  public render() {
    return (
      <div className="key-editor__row">
        <label className="key-editor__label" htmlFor={this.props.htmlFor}>{this.props.label}</label>
        {this.props.children}
      </div>
    );
  }
}
