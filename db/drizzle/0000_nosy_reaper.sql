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
	PRIMARY KEY(`provider`,`providerAccountId`)
);

CREATE TABLE `sessions` (
	`sessionToken` varchar(255) PRIMARY KEY NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL);

CREATE TABLE `users` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp,
	`image` varchar(255));

CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	PRIMARY KEY(`identifier`,`token`)
);

CREATE TABLE `experiences` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`company_name` varchar(255) NOT NULL,
	`date` date,
	`tags_csv` text,
	`profile_id` int NOT NULL);

CREATE TABLE `profiles` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`short_description` text NOT NULL,
	`long_description` text NOT NULL);
