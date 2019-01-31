import { Translation } from "../models/Translation";
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

export async function getAllTranslations(): Promise<Translation[]> {
  const response = await fetch("/api/v1/translations", Request(HttpMethod.GET));
  const json = await response.json();
  const maybeTranslations = validateValueType(json, [], "translations");
  return maybeTranslations.map((val) => new Translation(val));
}
