import { validateValueType } from "../api/ApiUtils";
import { TranslationText } from "./TranslationText";

export type TranslationId = number;
export type TranslationTag = string;
export type TranslationDescription = string;
export type TranslationKey = string;

export class Translation {
  public id: TranslationId;
  public translationKey: TranslationKey;
  public translations: TranslationText[];
  public description: TranslationDescription;
  public tags: TranslationTag[];

  constructor(incomingTranslation: any) {
    this.id = validateValueType(incomingTranslation.id, -1, "id");
    this.translationKey = validateValueType(incomingTranslation.translationKey, "", "translationKey");
    const maybeTranslations = validateValueType(incomingTranslation.translations, [], "translations");
    this.translations = maybeTranslations.map(this.mapTranslationText);
    this.description = validateValueType(incomingTranslation.description, "", "description");
    this.tags = validateValueType(incomingTranslation.tags, [], "tags");
  }

  private mapTranslationText(incomingTranslationText: any): TranslationText {
    return new TranslationText(incomingTranslationText);
  }
}
