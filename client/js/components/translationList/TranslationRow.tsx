import * as React from "react";
import { TranslationMetaBar } from "./TranslationMetaBar";
import { TranslationValueList } from "./TranslationValueList";

export class TranslationRow extends React.PureComponent {
  public render() {
    return (
      <li className="translation-row">
        <TranslationMetaBar />
        <TranslationValueList />
      </li>
    );
  }
}
