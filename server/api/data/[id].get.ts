import { defineEventHandler, readBody } from "h3";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;

  const datas = await dataSource
    .select()
    .from(tables.data)
    .where(eq(tables.data.id, id));

  return datas[0];
});
