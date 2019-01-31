import * as React from "react";
import { AddKeysBox } from "./AddKeysBox";
import { TagFilteringBox } from "./TagFilteringBox";

interface ITranslationsBarProps {
  numberOfKeys: number;
}
export class TranslationsBar extends React.PureComponent<ITranslationsBarProps> {
  public render() {
    return (
      <div className="translations-bar">
        <ul className="translations-bar__ul">
          <TagFilteringBox />
          <AddKeysBox numberOfKeys={this.props.numberOfKeys} />
        </ul>
      </div>
    );
  }
}
