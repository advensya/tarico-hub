import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const runtime = useRuntimeConfig();
  const form = await readMultipartFormData(event);
  if (!form) throw createError({ statusCode: 400 });

  const body = form.reduce((acc, field) => {
    if (field.filename) {
      acc[field.name!] = {
        filename: field.filename,
        data: field.data,
      };
    } else {
      acc[field.name!] = field.data.toString();
    }
    return acc;
  }, {} as Record<string, any>);

  const [existingUser] = await dataSource
    .select()
    .from(tables.user)
    .where(eq(tables.user.email, body.email));

  if (existingUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "register.errors.userWithEmailAlreadyExists",
    });
  }

  if (body.avatar) {
    const avatar = body.avatar;
    const key = `uploads/${Date.now()}-${avatar.filename}`;
    await uploadToR2(
      key,
      Buffer.from(avatar.data),
      avatar.type ?? "application/octet-stream"
    );
    body.avatar = `${runtime.cloudflareEndpoint}/${runtime.cloudflareBucketName}/${key}`;
  }

  if (body.logo) {
    const logo = body.logo;
    const key = `uploads/${Date.now()}-${logo.filename}`;
    await uploadToR2(
      key,
      Buffer.from(logo.data),
      logo.type ?? "application/octet-stream"
    );
    body.logo = `${runtime.cloudflareEndpoint}/${runtime.cloudflareBucketName}/${key}`;
  }

  const company = await dataSource
    .insert(tables.company)
    .values(body as any)
    .returning({ id: tables.company.id });

  const password = await bcrypt.hash(
    body.password + runtime.passwordPepper,
    10
  );

  const user = await dataSource
    .insert(tables.user)
    .values({ companyId: company[0].id, ...body, password } as any);

  return user;
});
