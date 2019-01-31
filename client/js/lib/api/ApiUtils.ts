export function validateValueType<T>(value: any, defaultValue: T, keyName: string): T {
  const valueType = typeof value;
  const expectedType = typeof defaultValue;
  if (valueType !== expectedType) {
    /* tslint:disable */
    console.error(`Expected ${keyName} to be of type ${expectedType} but was of type: ${valueType}`);
    return defaultValue;
  }
  return value;
}
