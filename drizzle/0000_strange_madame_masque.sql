CREATE TABLE `worker_applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reference` text NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`profession` text NOT NULL,
	`ahpra_status` text NOT NULL,
	`preferred_region` text NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`resume_key` text NOT NULL,
	`resume_name` text NOT NULL,
	`resume_type` text NOT NULL,
	`resume_size` integer NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `worker_applications_reference_unique` ON `worker_applications` (`reference`);