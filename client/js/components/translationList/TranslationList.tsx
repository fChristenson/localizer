import * as React from "react";
import { TranslationRow } from "./TranslationRow";

export class TranslationList extends React.PureComponent {
  public render() {
    return (
      <ul className="translation-list">
        <TranslationRow />
        <TranslationRow />
        <TranslationRow />
        <TranslationRow />
      </ul>
    );
  }
}
