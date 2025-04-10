CREATE TABLE "employers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"title" varchar NOT NULL,
	"location" varchar,
	"is_active" boolean DEFAULT false NOT NULL,
	"duties" text,
	"notes" text,
	"started_at" timestamp,
	"ended_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
