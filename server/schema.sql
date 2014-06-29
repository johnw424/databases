-- HOW TO CHECK IF DATABASE IS WORKING:
-- Start mysql server: mysql.server start
-- Create database: DESCRIBE /Users/student/Code/JohnWang/2014-06-databases/SQL/schema.sql
-- Enter mysql: mysql;
-- Select database: USE chat;

CREATE DATABASE chat;

USE chat;

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
--
-- ---

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Messages'
--
-- ---

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_room` INTEGER NULL DEFAULT NULL,
  `id_user` INTEGER(30) NULL DEFAULT NULL,
  `message` VARCHAR(140) NULL DEFAULT NULL,
  `timestamp` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Friends'
--
-- ---

DROP TABLE IF EXISTS `Friends`;

CREATE TABLE `Friends` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_follower` INTEGER NULL DEFAULT NULL,
  `id_following` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Rooms'
--
-- ---

DROP TABLE IF EXISTS `Rooms`;

CREATE TABLE `Rooms` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `roomname` VARCHAR(30) NOT NULL DEFAULT 'New Room',
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Messages` ADD FOREIGN KEY (id_room) REFERENCES `Rooms` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (id_user) REFERENCES `Users` (`id`);
ALTER TABLE `Friends` ADD FOREIGN KEY (id_follower) REFERENCES `Users` (`id`);
ALTER TABLE `Friends` ADD FOREIGN KEY (id_following) REFERENCES `Users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`username`) VALUES
-- ('','');
-- INSERT INTO `Messages` (`id`,`id_room`,`id_user`,`message`,`timestamp`) VALUES
-- ('','','','','');
-- INSERT INTO `Friends` (`id`,`id_follower`,`id_following`) VALUES
-- ('','','');
-- INSERT INTO `Rooms` (`id`,`roomname`) VALUES
-- ('','');



