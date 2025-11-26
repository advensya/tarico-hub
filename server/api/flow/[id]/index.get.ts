import { defineEventHandler, readBody } from "h3";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;
  console.log(id, "+++++++++++++++++++++++++++++++++");

  const flows = await dataSource
    .select()
    .from(tables.flow)
    .where(eq(tables.flow.id, id));

  return flows[0];
});
