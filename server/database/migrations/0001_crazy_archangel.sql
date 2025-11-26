CREATE TABLE "flow" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"data" jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
