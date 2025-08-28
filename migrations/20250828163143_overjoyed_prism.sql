CREATE TYPE "public"."label" AS ENUM('MALWARE', 'PHISHING', 'ILLEGAL_CONTENT', 'ADULT_CONTENT', 'SPAM', 'HARASSMENT', 'HATE_SPEECH', 'SCAM', 'COPYRIGHT', 'MISLEADING', 'BROKEN_LINK', 'OTHER');--> statement-breakpoint
CREATE TABLE "keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" varchar(36) NOT NULL,
	"alias" text NOT NULL,
	"url" text NOT NULL,
	"is_secure" boolean DEFAULT false NOT NULL,
	"redirect_url" text,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "keys_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "keys_alias_unique" UNIQUE("alias"),
	CONSTRAINT "keys_url_unique" UNIQUE("url"),
	CONSTRAINT "keys_redirect_url_unique" UNIQUE("redirect_url")
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" varchar(36) NOT NULL,
	"key_id" integer NOT NULL,
	"label" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "reports_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_key_id_keys_id_fk" FOREIGN KEY ("key_id") REFERENCES "public"."keys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "alias_idx" ON "keys" USING btree ("alias");