import * as React from "react";
import { Language } from "../../lib/models/TranslationText";

interface ITranslationValueRow {
  value?: string;
  language: Language;
}

export class TranslationValueRow extends React.PureComponent<ITranslationValueRow> {
  public render() {
    const btnClassName = this.props.value ? "translation-value__btn" : "translation-value__btn--empty";
    return (
      <li className="translation-value__row">
        <div className="translation-value__language">{this.props.language}</div>
        <div className="translation-value__value">
          <button className={btnClassName}>{this.props.value || "Empty"}</button>
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
