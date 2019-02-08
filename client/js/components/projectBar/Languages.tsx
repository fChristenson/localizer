import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { Translation } from "../../lib/models/Translation";
import { hasText, Language, sortByCreatedAt, uniqTranslationTexts } from "../../lib/models/TranslationText";

const getNumberOfTranslations = (language: Language) => (acc: number, item: Translation) => {
  return acc + item.translations
    .filter((val) => val.language === language)
    .sort(sortByCreatedAt)
    .filter(uniqTranslationTexts)
    .filter(hasText).length;
};
const getNumberOfEnglishTranslations = getNumberOfTranslations(Language.ENGLISH);
const getNumberOfSwedishTranslations = getNumberOfTranslations(Language.SWEDISH);

class LanguagesComponent extends React.PureComponent<IContextProps> {
  public render() {
    return (
      <ul className="project-bar__languages">
        <li className="project-bar__language">
          <img src="/images/us.svg" />
          <span className="project-bar__count">
            {
              this.props.context.translations.reduce(getNumberOfEnglishTranslations, 0)
            }
          </span>
        </li>
        <li className="project-bar__language">
          <img src="/images/se.svg" />
          <span className="project-bar__count">
            {
              this.props.context.translations.reduce(getNumberOfSwedishTranslations, 0)
            }
          </span>
        </li>
      </ul>
    );
  }
}

export const Languages = withAppContext(LanguagesComponent);
