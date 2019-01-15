import * as React from "react";
import { AddKeysBox } from "./AddKeysBox";
import { TagFilteringBox } from "./TagFilteringBox";

export class TranslationsBar extends React.PureComponent {
  public render() {
    return (
      <div className="translations-bar">
        <ul className="translations-bar__ul">
          <TagFilteringBox />
          <AddKeysBox numberOfKeys={0} />
        </ul>
      </div>
    );
  }
}
