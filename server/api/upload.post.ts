import formidable from "formidable";
import { readFileSync } from "node:fs";

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

  const fileField = body["file"];

  const key = `uploads/${Date.now()}-${fileField.filename}`;
  await uploadToR2(
    key,
    Buffer.from(fileField.data),
    fileField.type ?? "application/octet-stream"
  );

  return {
    url: `${runtime.cloudflareEndpoint}/${runtime.cloudflareBucketName}/${key}`,
  };
});
