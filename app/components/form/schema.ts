import * as v from "valibot";
import type { Schema } from "./interface.ts";

export function buildSchema(definition: Schema): v.BaseSchema<any, any, any> {
  switch (definition.schema) {
    case "any":
      return v.any();

    case "string":
      return v.string(definition.message);

    case "number":
      return v.number(definition.message);

    case "boolean":
      return v.boolean(definition.message);

    case "bigint":
      return v.bigint(definition.message);

    case "date":
      return v.date(definition.message);

    case "file":
      return v.file(definition.message);

    case "enum":
      return v.enum(definition.args as any as v.Enum, definition.message);

    case "blob":
      return v.blob(definition.message);

    case "undefined":
      return v.undefined(definition.message);

    case "null":
      return v.null(definition.message);

    case "nan":
      return v.null(definition.message);

    // -------------------------
    // Schémas contenant un autre schéma
    // -------------------------

    // case "optional":
    //   return v.optional(buildSchema(definition.args));

    // case "nullable":
    //   return v.nullable(buildSchema(definition.args));

    // case "nonNullable":
    //   return v.nonNullable(buildSchema(definition.args));

    // case "nonOptional":
    //   return v.nonOptional(buildSchema(definition.args));

    // case "exactOptional":
    //   return v.exactOptional(buildSchema(definition.args));

    // case "array":
    //   return v.array(buildSchema(definition.args));

    default:
      throw new Error(`Schema not implemented: ${definition.schema}`);
  }
}
