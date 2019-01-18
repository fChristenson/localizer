import * as React from "react";
import { TranslationValueRow } from "./TranslationValueRow";

export class TranslationValueList extends React.PureComponent {
  public render() {
    return (
      <div className="translation-value">
        <ul className="translation-value__values">
          <TranslationValueRow value="This is a value" />
          <TranslationValueRow />
        </ul>
      </div>
    );
  }
}
