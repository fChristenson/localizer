import { Translation, TranslationId } from "../models/Translation";
import { TranslationText, TranslationTextId } from "../models/TranslationText";
import { validateValueType } from "./ApiUtils";
import { HttpMethod, Request } from "./Request";

export async function saveTranslation(
  key: string,
  translation: string,
  description: string,
  tags: string[]): Promise<Translation> {
  const body = {
    description,
    key,
    tags,
    translation,
  };
  const response = await fetch("/api/v1/translations", Request(HttpMethod.POST, body));
  const json = await response.json();
  return new Translation(json);
}

export async function updateTranslationText(
  translationId: TranslationId,
  translationText: TranslationText): Promise<Translation> {
  const body = { text: translationText };
  const response = await fetch(
    `/api/v1/translations/${translationId}/text`,
    Request(HttpMethod.PUT, body));
  const json = await response.json();
  return new Translation(json);
}

export async function updateTranslation(
  translationId: TranslationId,
  key: string,
  translation: TranslationText,
  description: string,
  tags: string[]): Promise<Translation> {
  const body = {
    description,
    key,
    tags,
    translation,
  };
  const response = await fetch(`/api/v1/translations/${translationId}`, Request(HttpMethod.PUT, body));
  const json = await response.json();
  return new Translation(json);
}

export async function getAllTranslations(): Promise<Translation[]> {
  const response = await fetch("/api/v1/translations", Request(HttpMethod.GET));
  const json = await response.json();
  const maybeTranslations = validateValueType(json, [], "translations");
  return maybeTranslations.map((val) => new Translation(val));
}

export async function deleteTranslation(translationId: TranslationId): Promise<void> {
  await fetch(`/api/v1/translations/${translationId}`, Request(HttpMethod.DELETE));
  return;
}
