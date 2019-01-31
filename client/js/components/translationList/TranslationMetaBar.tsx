import * as React from "react";
import { TranslationDescription, TranslationKey, TranslationTag } from "../../lib/models/Translation";

function getRandomBrightColor() {
  const random1 = Math.floor(Math.random() * 360);
  const random2 = Math.floor(Math.random() * 10) + 65;
  const random3 = Math.floor(Math.random() * 10) + 65;

  return `hsl(${random1},${random2}%,${random3}%)`;
}

interface ITranslationMetaBarProps {
  translationKey: TranslationKey;
  tags: TranslationTag[];
  description: TranslationDescription;
}

export class TranslationMetaBar extends React.PureComponent<ITranslationMetaBarProps> {
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
            <button className="meta-bar__trash-btn">
              <img className="meta-bar__trash-img" src="/images/trash.svg" />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
