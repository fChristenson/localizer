import * as React from "react";
import { Translation } from "../../lib/models/Translation";
import { TranslationMetaBar } from "./TranslationMetaBar";
import { TranslationValueList } from "./TranslationValueList";

interface ITranslationRowProps {
  translation: Translation;
}
export class TranslationRow extends React.PureComponent<ITranslationRowProps> {
  public render() {
    return (
      <li className="translation-row">
        <TranslationMetaBar
          tags={this.props.translation.tags}
          translationKey={this.props.translation.translationKey}
          description={this.props.translation.description} />
        <TranslationValueList translationTexts={this.props.translation.translations} />
      </li>
    );
  }
}
