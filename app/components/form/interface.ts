import * as v from "valibot";

export const ValibotActionKeys = [
  "args",
  "base64",
  "bic",
  "brand",
  "bytes",
  "check",
  "checkItems",
  "creditCard",
  "cuid2",
  "decimal",
  "description",
  "digits",
  "email",
  "emoji",
  "empty",
  "endsWith",
  "entries",
  "everyItem",
  "examples",
  "excludes",
  "filterItems",
  "findItem",
  "finite",
  "flavor",
  "graphemes",
  "gtValue",
  "hash",
  "hexadecimal",
  "hexColor",
  "imei",
  "includes",
  "integer",
  "ip",
  "ipv4",
  "ipv6",
  "isbn",
  "isoDate",
  "isoDateTime",
  "isoTime",
  "isoTimeSecond",
  "isoTimestamp",
  "isoWeek",
  "length",
  "ltValue",
  "mac",
  "mac48",
  "mac64",
  "mapItems",
  "maxBytes",
  "maxEntries",
  "maxGraphemes",
  "maxLength",
  "maxSize",
  "maxValue",
  "maxWords",
  "metadata",
  "mimeType",
  "minBytes",
  "minEntries",
  "minGraphemes",
  "minLength",
  "minSize",
  "minValue",
  "minWords",
  "multipleOf",
  "nanoid",
  "nonEmpty",
  "normalize",
  "notBytes",
  "notEntries",
  "notGraphemes",
  "notLength",
  "notSize",
  "notValue",
  "notValues",
  "notWords",
  "octal",
  "parseJson",
  "partialCheck",
  "rawCheck",
  "rawTransform",
  "readonly",
  "reduceItems",
  "regex",
  "returns",
  "rfcEmail",
  "safeInteger",
  "size",
  "slug",
  "someItem",
  "sortItems",
  "startsWith",
  "stringifyJson",
  "title",
  "toBigint",
  "toBoolean",
  "toDate",
  "toLowerCase",
  "toMaxValue",
  "toMinValue",
  "toNumber",
  "toString",
  "toUpperCase",
  "transform",
  "trim",
  "trimEnd",
  "trimStart",
  "ulid",
  "url",
  "uuid",
  "value",
  "values",
  "words",
] as const;

export type ValibotActionKey = (typeof ValibotActionKeys)[number];

export interface ValibotValidator {
  action: ValibotActionKey;
  messages?: string;
}

type _Schema =
  | { schema: "any" }
  | { schema: "bigint"; message?: string }
  | { schema: "blob"; message?: string }
  | { schema: "boolean"; message?: string }
  | { schema: "date"; message?: string }
  | { schema: "enum"; args: readonly string[]; message?: string }
  | { schema: "exactOptional"; args: Schema }
  | { schema: "file"; message?: string }
  | { schema: "nan"; message?: string }
  | { schema: "number"; message?: string }
  | { schema: "string"; message?: string }
  | { schema: "undefined"; message?: string }
  | { schema: "null"; message?: string };

//   | { schema: "map"; args: { key: Schema; value: Schema; rules?: Validator[] } }
//   | { schema: "array"; args: Schema; rules?: Validator[] }
//   | { schema: "custom"; args: (value: unknown) => boolean; rules?: Validator[] }

//   | { schema: "nonNullable"; args: Schema }
//   | { schema: "nonOptional"; args: Schema }
//   | { schema: "nullable"; args: Schema }
//   | { schema: "optional"; args: Schema }
//   | { schema: "undefinedable"; args: Schema };

/**
 * Discriminated union `Validator`.
 * - chaque membre a `action: "<key>"`, `messages?: string`
 * - `args` contient le type d'argument associé (si applicable)
 *
 * Note : certains types proviennent directement de `valibot.d.ts` et
 * peuvent contenir ici des `any` à la place des génériques T* pour garantir
 * la validité TypeScript immédiate. Je peux affiner au besoin.
 */

// export type Schema extends _Schema{
//   key: string;
//   rules?: Validator[];
// }

export type Validator =
  | { action: "args"; messages?: string; args: any }
  | { action: "base64"; messages?: string }
  | { action: "bic"; messages?: string }
  | { action: "brand"; messages?: string; args: any }
  | { action: "bytes"; messages?: string; args: any }
  | { action: "check"; messages?: string; args: any }
  | { action: "checkItems"; messages?: string; args: any }
  | { action: "creditCard"; messages?: string }
  | { action: "cuid2"; messages?: string }
  | { action: "decimal"; messages?: string }
  | { action: "description"; messages?: string; args: any }
  | { action: "digits"; messages?: string }
  | { action: "email"; messages?: string; args: RegExp }
  | { action: "emoji"; messages?: string }
  | { action: "empty"; messages?: string; args: any }
  | { action: "endsWith"; messages?: string; args: any }
  | { action: "entries"; messages?: string; args: any }
  | { action: "everyItem"; messages?: string; args: any }
  | { action: "excludes"; messages?: string; args: any }
  | { action: "filterItems"; messages?: string; args: any }
  | { action: "findItem"; messages?: string; args: any }
  | { action: "finite"; messages?: string }
  | { action: "flavor"; messages?: string; args: any }
  | { action: "graphemes"; messages?: string; args: any }
  | { action: "gtValue"; messages?: string; args: any }
  | { action: "hash"; messages?: string; args: any }
  | { action: "hexadecimal"; messages?: string }
  | { action: "hexColor"; messages?: string }
  | { action: "imei"; messages?: string }
  | { action: "includes"; messages?: string; args: any }
  | { action: "integer"; messages?: string }
  | { action: "ip"; messages?: string; args: any }
  | { action: "ipv4"; messages?: string }
  | { action: "ipv6"; messages?: string }
  | { action: "isbn"; messages?: string }
  | { action: "isoDate"; messages?: string }
  | { action: "isoDateTime"; messages?: string }
  | { action: "isoTime"; messages?: string }
  | { action: "isoTimeSecond"; messages?: string }
  | { action: "isoTimestamp"; messages?: string }
  | { action: "isoWeek"; messages?: string }
  | { action: "length"; messages?: string; args: any }
  | { action: "ltValue"; messages?: string; args: any }
  | { action: "mac"; messages?: string }
  | { action: "mac48"; messages?: string }
  | { action: "mac64"; messages?: string }
  | { action: "mapItems"; messages?: string; args: any }
  | { action: "maxBytes"; messages?: string; args: any }
  | { action: "maxEntries"; messages?: string; args: any }
  | { action: "maxGraphemes"; messages?: string; args: any }
  | { action: "maxLength"; messages?: string; args: number }
  | { action: "maxSize"; messages?: string; args: any }
  | { action: "maxValue"; messages?: string; args: any }
  | { action: "maxWords"; messages?: string; args: any }
  | { action: "metadata"; messages?: string; args: any }
  | { action: "mimeType"; messages?: string; args: any }
  | { action: "minBytes"; messages?: string; args: any }
  | { action: "minEntries"; messages?: string; args: any }
  | { action: "minGraphemes"; messages?: string; args: any }
  | { action: "minLength"; messages?: string; args: number }
  | { action: "minSize"; messages?: string; args: any }
  | { action: "minValue"; messages?: string; args: any }
  | { action: "minWords"; messages?: string; args: any }
  | { action: "multipleOf"; messages?: string; args: any }
  | { action: "nanoid"; messages?: string; args?: any }
  | { action: "nonEmpty"; messages?: string }
  | { action: "normalize"; messages?: string; args: any }
  | { action: "notBytes"; messages?: string; args: any }
  | { action: "notEntries"; messages?: string; args: any }
  | { action: "notGraphemes"; messages?: string; args: any }
  | { action: "notLength"; messages?: string; args: any }
  | { action: "notSize"; messages?: string; args: any }
  | { action: "notValue"; messages?: string; args: any }
  | { action: "notValues"; messages?: string; args: any }
  | { action: "notWords"; messages?: string; args: any }
  | { action: "octal"; messages?: string }
  | { action: "parseJson"; messages?: string; args: any }
  | { action: "partialCheck"; messages?: string; args: any }
  | { action: "rawCheck"; messages?: string; args: any }
  | { action: "rawTransform"; messages?: string; args: any }
  | { action: "readonly"; messages?: string }
  | { action: "reduceItems"; messages?: string; args: any }
  | { action: "regex"; messages?: string; args: RegExp }
  | { action: "returns"; messages?: string; args: any }
  | { action: "rfcEmail"; messages?: string }
  | { action: "safeInteger"; messages?: string }
  | { action: "size"; messages?: string; args: any }
  | { action: "slug"; messages?: string }
  | { action: "someItem"; messages?: string; args: any }
  | { action: "sortItems"; messages?: string; args: any }
  | { action: "startsWith"; messages?: string; args: any }
  | { action: "stringifyJson"; messages?: string }
  | { action: "title"; messages?: string; args?: string }
  | { action: "toLowerCase"; messages?: string }
  | { action: "toMaxValue"; messages?: string; args: any }
  | { action: "toMinValue"; messages?: string; args: any }
  | { action: "toUpperCase"; messages?: string }
  | { action: "transform"; messages?: string; args: any }
  | { action: "trim"; messages?: string }
  | { action: "trimEnd"; messages?: string }
  | { action: "trimStart"; messages?: string }
  | { action: "ulid"; messages?: string }
  | { action: "url"; messages?: string; args?: RegExp }
  | { action: "uuid"; messages?: string }
  | { action: "value"; messages?: string; args?: any }
  | { action: "values"; messages?: string; args?: any }
  | { action: "words"; messages?: string; args: any };

export type Schema = _Schema & {
  key: string;
  undefinedable?: boolean;
  nullable?: boolean;
  rules?: Validator[];
};
