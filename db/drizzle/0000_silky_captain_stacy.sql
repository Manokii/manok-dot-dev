CREATE TABLE `accomplishment_technologies` (
	`accomplishment_id` int NOT NULL,
	`technology_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	PRIMARY KEY(`accomplishment_id`,`technology_id`)
);

CREATE TABLE `accomplishments` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`company_name` varchar(255) NOT NULL,
	`company_website` varchar(255),
	`job_title` varchar(255) NOT NULL,
	`job_description` text NOT NULL,
	`start_date` date NOT NULL,
	`end_date` date,
	`portfolio_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE `accounts` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	`refresh_token_expires_in` int,
	PRIMARY KEY(`provider`,`providerAccountId`)
);

CREATE TABLE `portfolios` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL,
	`headline` text NOT NULL,
	`subheading` text NOT NULL,
	`about` text NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`public_email` varchar(255),
	`social_links` json NOT NULL);

CREATE TABLE `projects` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL,
	`body` text NOT NULL,
	`slug` varchar(255) NOT NULL,
	`icon` varchar(2048),
	`portfolio_id` varchar(255) NOT NULL);

CREATE TABLE `sessions` (
	`sessionToken` varchar(255) PRIMARY KEY NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL);

CREATE TABLE `users` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`email_verified` timestamp,
	`image` varchar(255),
	`role` enum('admin','default') NOT NULL DEFAULT 'default',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`portfolio_id` varchar(255));

CREATE TABLE `verificationTokens` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	PRIMARY KEY(`identifier`,`token`)
);

CREATE TABLE `project_technologies` (
	`project_id` int NOT NULL,
	`technology_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	PRIMARY KEY(`project_id`,`technology_id`)
);

CREATE TABLE `technologies` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL,
	`icon` varchar(2048),
	`description` varchar(2048),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
