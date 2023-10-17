CREATE TABLE `guardians` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`phone` varchar(256),
	`email` varchar(256),
	`notes` varchar(256),
	CONSTRAINT `guardians_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `playerGuardians` (
	`playerId` bigint NOT NULL,
	`guardianId` bigint NOT NULL,
	CONSTRAINT `playerGuardians_guardianId_playerId` PRIMARY KEY(`guardianId`,`playerId`)
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`birthday` datetime,
	CONSTRAINT `players_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `guardians` (`name`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `players` (`name`);