ALTER TABLE "employers" ALTER COLUMN "started_at" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "employers" ALTER COLUMN "ended_at" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "employers" ADD COLUMN "display_order" integer;