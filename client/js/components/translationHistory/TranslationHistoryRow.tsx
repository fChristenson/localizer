import * as React from "react";
import { TranslationText } from "../../lib/models/TranslationText";
import { BadgeButton, BadgeButtonVariant } from "../badgeButton/BadgeButton";

interface ITranslationHistoryRowProps {
  translationText: TranslationText;
  showRevert: boolean;
  tabIndex: number;
  onRevert: (translationText: TranslationText) => void;
}

export class TranslationHistoryRow extends React.Component<ITranslationHistoryRowProps> {
  constructor(props: ITranslationHistoryRowProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render() {
    return (
      <li className="translation-history__value">
        <div className="translation-history__text">{this.props.translationText.text}</div>
        <div className="translation-history__date-container">
          <span className="translation-history__date">{this.props.translationText.createdAt.toISOString()}</span>
          {this.props.showRevert && <BadgeButton
            onClick={this.onClick}
            tabIndex={this.props.tabIndex}
            variant={BadgeButtonVariant.ACTIVE}>Revert</BadgeButton>}
        </div>
      </li>
    );
  }

  private onClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onRevert(this.props.translationText);
  }
}
