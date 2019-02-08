import { validateValueType } from "../api/ApiUtils";

export enum Language {
  UNKNOWN = "UNKNOWN",
  ENGLISH = "ENGLISH",
  SWEDISH = "SWEDISH",
}

export type TranslationTextId = number;

export class TranslationText {
  public id: TranslationTextId;
  public text: string;
  public language: Language;
  public createdAt: Date;

  constructor(incomingTranslationText: any) {
    this.id = validateValueType(incomingTranslationText.id, -1, "id");
    this.text = validateValueType(incomingTranslationText.text, "", "text");
    const maybeLanguage = validateValueType(incomingTranslationText.language, Language.UNKNOWN, "language");
    this.language = this.getLanguage(maybeLanguage);
    this.createdAt = this.getCreatedAt(incomingTranslationText.createdAt);
  }

  public clone(): TranslationText {
    return new TranslationText(this);
  }

  private getCreatedAt(date: any): Date {
    try {
      return new Date(date);
    } catch (error) {
      /* tslint:disable */
      console.error(`Failed to create date from ${date}`);
      return new Date();
    }
  }

  private getLanguage(language: string): Language {
    switch (language) {
      case "SWEDISH":
        return Language.SWEDISH;

      case "ENGLISH":
        return Language.ENGLISH;

      default:
        /* tslint:disable */
        console.error(`${language} is not a valid language`);
        return Language.UNKNOWN;
    }
  }
}

export function uniqTranslationTexts(text: TranslationText, index: number, self: TranslationText[]): boolean {
  return self.map((t) => t.language).indexOf(text.language) === index;
}

export function sortByCreatedAt(a: TranslationText, b: TranslationText): number {
  if (a.createdAt > b.createdAt) {
    return -1;
  } else if (a.createdAt < b.createdAt) {
    return 1;
  } else {
    return 0;
  }
}

export function hasText(translationText: TranslationText): boolean {
  return !!translationText.text;
}
