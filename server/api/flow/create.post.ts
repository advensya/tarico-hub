import { defineEventHandler, readBody } from "h3";
import { eq } from "drizzle-orm";
import { Flow } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const runtime = useRuntimeConfig();
  const body = await readBody<Flow>(event);
  let result: { id: string };

  if (body.id) {
    [result] = await dataSource
      .update(tables.flow)
      .set(body)
      .where(eq(tables.flow.id, body.id))
      .returning({ id: tables.flow.id });
  } else {
    [result] = await dataSource
      .insert(tables.flow)
      .values(body)
      .returning({ id: tables.flow.id });
  }

  const flow = await dataSource
    .select()
    .from(tables.flow)
    .where(eq(tables.flow.id, result.id));

  return flow[0]!;
});
