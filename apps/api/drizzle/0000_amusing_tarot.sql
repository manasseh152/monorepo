CREATE TYPE "public"."sync_direction" AS ENUM('inbound', 'outbound');--> statement-breakpoint
CREATE TYPE "public"."sync_link_type" AS ENUM('item', 'note', 'task', 'tag', 'item_note', 'item_task', 'item_tag', 'note_tag', 'task_tag');--> statement-breakpoint
CREATE TYPE "public"."sync_method" AS ENUM('push', 'pull');--> statement-breakpoint
CREATE TYPE "public"."sync_state" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."sync_status" AS ENUM('pending', 'synced', 'failed');--> statement-breakpoint
CREATE TYPE "public"."sync_type" AS ENUM('full', 'incremental');--> statement-breakpoint
CREATE TYPE "public"."task_priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('open', 'closed');--> statement-breakpoint
CREATE TABLE "item" (
	"item_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"created_at" timestamp,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "note" (
	"note_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"content" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "note_tag" (
	"note_tag_id" serial PRIMARY KEY NOT NULL,
	"note_id" serial NOT NULL,
	"tag_id" serial NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"tag_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"created_at" timestamp,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "task" (
	"task_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"content" text NOT NULL,
	"status" "task_status" DEFAULT 'open' NOT NULL,
	"priority" "task_priority" DEFAULT 'medium' NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "task_tag" (
	"task_tag_id" serial PRIMARY KEY NOT NULL,
	"task_id" serial NOT NULL,
	"tag_id" serial NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "note_tag" ADD CONSTRAINT "note_tag_note_id_note_note_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."note"("note_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "note_tag" ADD CONSTRAINT "note_tag_tag_id_tag_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("tag_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_tag" ADD CONSTRAINT "task_tag_task_id_task_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("task_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_tag" ADD CONSTRAINT "task_tag_tag_id_tag_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("tag_id") ON DELETE no action ON UPDATE no action;