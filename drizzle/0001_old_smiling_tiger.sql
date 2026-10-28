CREATE TABLE IF NOT EXISTS `hpi_crm_outbox` (
	`id` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`state` text NOT NULL,
	`created_at` text NOT NULL,
	`delivered_at` text,
	`retry_at` text,
	`attempts` integer DEFAULT 0 NOT NULL,
	`last_status` text DEFAULT 'pending' NOT NULL
);
