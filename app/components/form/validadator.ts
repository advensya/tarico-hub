import * as v from "valibot";
import type { Validator } from "./interface.ts"; // adapte selon ton chemin

export function ruleBuilder(validators: Validator[]) {
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
