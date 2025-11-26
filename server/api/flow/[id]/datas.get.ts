import { defineEventHandler, readBody } from "h3";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const flowID = getRouterParam(event, "id") as string;

  const datas = await dataSource
    .select()
    .from(tables.data)
    .where(eq(tables.data.flowID, flowID));

  return datas;
});
