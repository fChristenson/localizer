import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { Translation } from "../../lib/models/Translation";
import { TranslationRow } from "./TranslationRow";

class TranslationListComponent extends React.Component<IContextProps> {
  constructor(props: IContextProps) {
    super(props);
    this.filterTranslations = this.filterTranslations.bind(this);
    this.filterOnTags = this.filterOnTags.bind(this);
  }

  public render() {
    return (
      <ul className="translation-list">
        {
          this.props.context.translations
            .filter(this.filterTranslations)
            .filter(this.filterOnTags)
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

  private filterOnTags(translation: Translation): boolean {
    if (!this.props.context.selectedTag) {
      return true;
    }
    return translation.tags.some((tag) => tag === this.props.context.selectedTag);
  }
}

export const TranslationList = withAppContext(TranslationListComponent);
