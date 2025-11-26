import { defineEventHandler, readBody } from "h3";
import { eq } from "drizzle-orm";
import { Flow } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const runtime = useRuntimeConfig();
  let result: { id: string };

  const flows = await dataSource.select().from(tables.flow);
  // .where(eq(tables.flow.id, result.id));

  return flows;
});
