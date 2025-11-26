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

  const urls = [];

  for (const key of Object.keys(body)) {
    const fileField = body[key];

    const token = `uploads/${Date.now()}-${fileField.filename}`;
    await uploadToR2(
      token,
      Buffer.from(fileField.data),
      fileField.type ?? "application/octet-stream"
    );

    urls.push(
      `${runtime.cloudflareEndpoint}/${runtime.cloudflareBucketName}/${key}`
    );
  }

  return urls;
});
