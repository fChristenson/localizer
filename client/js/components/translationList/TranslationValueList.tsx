import * as React from "react";
import { Language, TranslationText } from "../../lib/models/TranslationText";
import { TranslationValueRow } from "./TranslationValueRow";

interface ITranslationValueListProps {
  translationTexts: TranslationText[];
}

function sort(a: TranslationText, b: TranslationText): number {
  if (a.language === Language.ENGLISH && b.language !== Language.ENGLISH) {
    return -1;
  } else if (a.language !== Language.ENGLISH && b.language === Language.ENGLISH) {
    return 1;
  } else {
    return 0;
  }
}

export class TranslationValueList extends React.PureComponent<ITranslationValueListProps> {
  public render() {
    return (
      <div className="translation-value">
        <ul className="translation-value__values">
          {
            this.props.translationTexts
              .sort(sort)
              .map((text) => <TranslationValueRow key={text.id} value={text.text} language={text.language} />)
          }
        </ul>
      </div>
    );
  }
}
