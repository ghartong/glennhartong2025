CREATE TABLE "credentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization" varchar NOT NULL,
	"name" varchar NOT NULL,
	"notes" text,
	"acquired_at" varchar,
	"display_order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leaderships" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization" varchar NOT NULL,
	"title" varchar NOT NULL,
	"notes" text,
	"display_order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
