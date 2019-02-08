import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { TranslationId } from "../../lib/models/Translation";
import { Language, TranslationText } from "../../lib/models/TranslationText";
import { TranslationValue } from "./TranslationValue";

interface ITranslationValueRowProps extends IContextProps {
  translationId: TranslationId;
  translationText: TranslationText;
  language: Language;
}

class TranslationValueRowComponent extends React.Component<ITranslationValueRowProps> {
  constructor(props: ITranslationValueRowProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render() {
    return (
      <li className="translation-value__row">
        <div className="translation-value__language">{this.props.language}</div>
        <div className="translation-value__value">
          <TranslationValue translationId={this.props.translationId} translationText={this.props.translationText} />
          <ul className="translation-value__actions">
            <li>
              <button onClick={this.onClick} className="translation-value__history-btn">
                <img className="translation-value__history-img" src="/images/history.svg" />
              </button>
            </li>
          </ul>
        </div>
      </li>
    );
  }

  private onClick() {
    this.props.context.onOpenTranslationHistory(this.props.translationId, this.props.language);
  }
}

export const TranslationValueRow = withAppContext(TranslationValueRowComponent);
