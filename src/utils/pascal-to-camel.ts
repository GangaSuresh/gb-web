type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject {
  [key: string]: JsonValue;
}
type JsonArray = JsonValue[];

const pascalToCamel = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const convertPascalToCamel = (data: JsonValue): JsonValue => {
  if (Array.isArray(data)) {
    return data.map(item => convertPascalToCamel(item));
  }

  if (data !== null && typeof data === "object") {
    const result: JsonObject = {};
    Object.keys(data).forEach(key => {
      const camelKey = pascalToCamel(key);
      result[camelKey] = convertPascalToCamel((data as JsonObject)[key]);
    });
    return result;
  }

  return data;
};