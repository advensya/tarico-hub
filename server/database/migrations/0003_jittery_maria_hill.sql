CREATE TABLE "data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"flowID" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "flow" ALTER COLUMN "name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "data" ADD CONSTRAINT "data_flowID_flow_id_fk" FOREIGN KEY ("flowID") REFERENCES "public"."flow"("id") ON DELETE no action ON UPDATE no action;