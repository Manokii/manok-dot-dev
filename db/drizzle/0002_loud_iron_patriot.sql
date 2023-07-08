ALTER TABLE "projects" ADD COLUMN "short_description" varchar(255);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;