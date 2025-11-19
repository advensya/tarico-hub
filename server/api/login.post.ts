import { defineEventHandler, readBody, createError } from "h3";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const runtime = useRuntimeConfig();
  const body = await readBody<{ email: string; password: string }>(event);

  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "login.errors.invalidCredentials",
    });
  }

  const existingUser = await dataSource
    .select()
    .from(tables.user)
    .leftJoin(tables.company, eq(tables.company.id, tables.user.companyId))
    .where(eq(tables.user.email, body.email));

  if (!existingUser || !existingUser.length || !existingUser[0].user.password) {
    throw createError({
      statusCode: 401,
      statusMessage: "login.errors.invalidCredentials",
    });
  }

  const user = existingUser[0].user;
  const company = existingUser[0].company;

  if (!user.password) {
    throw createError({
      statusCode: 401,
      statusMessage: "login.errors.invalidCredentials",
    });
  }

  // Vérification du mot de passe
  const passwordMatch = await bcrypt.compare(
    body.password + runtime.passwordPepper,
    user.password
  );
  if (!passwordMatch) {
    throw createError({
      statusCode: 401,
      statusMessage: "login.errors.invalidCredentials",
    });
  }

  const auth = await dataSource
    .insert(tables.auth)
    .values({ userId: user.id })
    .returning({ id: tables.auth.id });

  return {
    token: auth[0].id,
    user,
    company,
  };
});
