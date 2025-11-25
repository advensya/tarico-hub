import * as v from "valibot";

export type Rule =
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

export type Schema = _Schema & {
  key: string;
  undefinedable?: boolean;
  nullable?: boolean;
  rules?: Rule[];
};

export function buildSchema(schemas: Schema) {
  switch (schemas.schema) {
    case "any":
      return v.any();

    case "string":
      return v.string(schemas.message);

    case "number":
      return v.number(schemas.message);

    case "boolean":
      return v.boolean(schemas.message);

    case "bigint":
      return v.bigint(schemas.message);

    case "date":
      return v.date(schemas.message);

    case "file":
      return v.file(schemas.message);

    case "enum":
      return v.enum(schemas.args as any as v.Enum, schemas.message);

    case "blob":
      return v.blob(schemas.message);

    case "undefined":
      return v.undefined(schemas.message);

    case "null":
      return v.null(schemas.message);

    case "nan":
      return v.null(schemas.message);

    default:
      throw new Error(`Schema not implemented: ${schemas.schema}`);
  }
}

export function ruleBuilder(validators: Rule[]) {
  const pipes: v.AnySchema[] = [];
  //   const pipes: TItems[] = []; //  v.PipeItem<any, unknown, v.BaseIssue<unknown>>[] = []

  for (const validator of validators) {
    const { action, args, messages } = validator;

    // @ts-ignore — accès dynamique
    const fn = v[action] as Function;

    if (typeof fn !== "function") {
      throw new Error(`Action Valibot inconnue : '${action}'`);
    }

    let rule: v.AnySchema;

    if (args !== undefined && messages !== undefined) {
      rule = fn(args, messages);
    } else if (args !== undefined) {
      rule = fn(args);
    } else if (messages !== undefined) {
      rule = fn(messages);
    } else {
      rule = fn();
    }

    pipes.push(rule);
  }

  //   const pipe = v.pipe<TSchema, TItems>(v.string(), ...pipeItems);

  // Construit un pipeline typé
  return pipes;
}

export function build<T extends Schema[]>(schemas: T) {
  type Result = {
    [K in T[number] as K["key"]]: v.AnySchema;
  };

  const entries: Result = {} as Result;

  for (const def of schemas) {
    let schema = buildSchema(def) as v.AnySchema;

    if (def.undefinedable) schema = v.undefinedable(schema);
    // if (def.nullable) schema = v.nullable(schema);

    const rules = ruleBuilder(def.rules || []);
    const r = v.pipe(schema, ...rules);

    entries[def.key] = r;
  }

  return v.object(entries);
}
