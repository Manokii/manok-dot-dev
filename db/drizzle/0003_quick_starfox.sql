CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" text NOT NULL,
	"excerpt" varchar(350),
	"thumbnail" varchar(2048),
	"author_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "link" varchar(2048);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_portfolios_id_fk" FOREIGN KEY ("author_id") REFERENCES "portfolios"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_slug_unique" UNIQUE("slug");