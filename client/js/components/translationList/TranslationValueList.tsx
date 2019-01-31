import * as React from "react";
import { TranslationText } from "../../lib/models/TranslationText";
import { TranslationValueRow } from "./TranslationValueRow";

interface ITranslationValueListProps {
  translationTexts: TranslationText[];
}
export class TranslationValueList extends React.PureComponent<ITranslationValueListProps> {
  public render() {
    return (
      <div className="translation-value">
        <ul className="translation-value__values">
          {
            this.props.translationTexts
              .map((text) => <TranslationValueRow key={text.id} value={text.text} language={text.language} />)
          }
        </ul>
      </div>
    );
  }
}
