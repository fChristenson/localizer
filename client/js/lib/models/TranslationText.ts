import { validateValueType } from "../api/ApiUtils";

export enum Language {
  UNKNOWN = "Unknown",
  ENGLISH = "English",
  SWEDISH = "Swedish",
}

export type TranslationTextId = number;

export class TranslationText {
  public id: TranslationTextId;
  public text: string;
  public language: Language;

  constructor(incomingTranslationText: any) {
    this.id = validateValueType(incomingTranslationText.id, -1, "id");
    this.text = validateValueType(incomingTranslationText.text, "", "text");
    const maybeLanguage = validateValueType(incomingTranslationText.language, Language.UNKNOWN, "language");
    this.language = this.getLanguage(maybeLanguage);
  }

  private getLanguage(language: string): Language {
    switch (language) {
      case "SWEDISH":
        return Language.SWEDISH;

      case "ENGLISH":
        return Language.ENGLISH;

      default:
        return Language.UNKNOWN;
    }
  }
}
