import { defineEventHandler, readBody } from "h3";
import { eq } from "drizzle-orm";
import { Data } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody<Data>(event);
  let result: { id: string };

  const flow = await dataSource
    .select()
    .from(tables.flow)
    .where(eq(tables.flow.id, body.flowID));

  if (!flow?.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "Workflow introuvable",
    });
  }

  if (body.id) {
    [result] = await dataSource
      .update(tables.data)
      .set(body)
      .where(eq(tables.data.id, body.id))
      .returning({ id: tables.data.id });
  } else {
    [result] = await dataSource
      .insert(tables.data)
      .values(body)
      .returning({ id: tables.data.id });
  }

  const data = await dataSource
    .select()
    .from(tables.data)
    .where(eq(tables.data.id, result.id));

  return data[0]!;
});
