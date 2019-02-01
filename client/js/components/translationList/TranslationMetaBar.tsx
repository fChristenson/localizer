import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { deleteTranslation, getAllTranslations } from "../../lib/api/translationApi";
import { TranslationDescription, TranslationId, TranslationKey, TranslationTag } from "../../lib/models/Translation";

function getRandomBrightColor() {
  const random1 = Math.floor(Math.random() * 360);
  const random2 = Math.floor(Math.random() * 10) + 65;
  const random3 = Math.floor(Math.random() * 10) + 65;

  return `hsl(${random1},${random2}%,${random3}%)`;
}

interface ITranslationMetaBarProps extends IContextProps {
  translationId: TranslationId;
  translationKey: TranslationKey;
  tags: TranslationTag[];
  description: TranslationDescription;
}

class TranslationMetaBarComponent extends React.Component<ITranslationMetaBarProps> {
  constructor(props: ITranslationMetaBarProps) {
    super(props);
    this.removeTranslation = this.removeTranslation.bind(this);
  }

  public render() {
    return (
      <div className="meta-bar">
        <button className="meta-bar__key">{this.props.translationKey}</button>
        <ul className="meta-bar__tags">
          {
            this.props.tags
              .map((tag, index) => <li
                key={index}
                style={{ background: getRandomBrightColor() }}
                className="meta-bar__tag">{tag}</li>)
          }
        </ul>
        <div className="meta-bar__description">{this.props.description}</div>
        <ul className="meta-bar__action-list">
          <li>
            <button onClick={this.removeTranslation} className="meta-bar__trash-btn">
              <img className="meta-bar__trash-img" src="/images/trash.svg" />
            </button>
          </li>
        </ul>
      </div>
    );
  }

  private async removeTranslation() {
    await deleteTranslation(this.props.translationId);
    const translations = await getAllTranslations();
    this.props.context.setTranslations(translations);
  }
}

export const TranslationMetaBar = withAppContext(TranslationMetaBarComponent);
