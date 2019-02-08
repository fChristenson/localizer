import { TranslationId } from "../../lib/models/Translation";
import { TranslationText } from "../../lib/models/TranslationText";

export interface ITranslationHistory {
  translationId: TranslationId;
  translations: TranslationText[];
}
