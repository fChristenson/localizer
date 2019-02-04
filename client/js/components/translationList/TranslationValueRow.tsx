import * as React from "react";
import { TranslationId } from "../../lib/models/Translation";
import { Language, TranslationText } from "../../lib/models/TranslationText";
import { TranslationValue } from "./TranslationValue";

interface ITranslationValueRow {
  translationId: TranslationId;
  translationText: TranslationText;
  language: Language;
}

export class TranslationValueRow extends React.PureComponent<ITranslationValueRow> {
  public render() {
    return (
      <li className="translation-value__row">
        <div className="translation-value__language">{this.props.language}</div>
        <div className="translation-value__value">
          <TranslationValue translationId={this.props.translationId} translationText={this.props.translationText} />
          <ul className="translation-value__actions">
            <li>
              <button className="translation-value__history-btn">
                <img className="translation-value__history-img" src="/images/history.svg" />
              </button>
            </li>
          </ul>
        </div>
      </li>
    );
  }
}
