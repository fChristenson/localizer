import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { Translation } from "../../lib/models/Translation";
import { TranslationRow } from "./TranslationRow";

class TranslationListComponent extends React.Component<IContextProps> {
  constructor(props: IContextProps) {
    super(props);
    this.filterTranslations = this.filterTranslations.bind(this);
  }

  public render() {
    return (
      <ul className="translation-list">
        {
          this.props.context.translations
            .filter(this.filterTranslations)
            .map((translation) => <TranslationRow key={translation.id} translation={translation} />)
        }
      </ul>
    );
  }

  private filterTranslations(translation: Translation): boolean {
    if (!this.props.context.filter) {
      return true;
    }
    const regexp = new RegExp(this.props.context.filter);
    return translation.translations.some((translationText) => regexp.test(translationText.text));
  }
}

export const TranslationList = withAppContext(TranslationListComponent);
