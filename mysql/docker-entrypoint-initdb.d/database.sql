-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Jan 23, 2018 at 06:08 PM
-- Server version: 5.7.18
-- PHP Version: 7.0.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matchadb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `orientation` varchar(1) DEFAULT NULL,
  `dob` date NOT NULL,
  `registered` date NOT NULL,
  `lastseen` date NULL,
  `isconnected` tinyint(1) NULL,
  `confirmed` tinyint(1) NULL,
   `firstLogin` boolean not null default 1,
  `text1` text,
  `text2` text,
  `text3` text,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `nat` varchar(255) NOT NULL,
  `size` int(3) DEFAULT NULL,
  `ethnicity` varchar(255) DEFAULT NULL,  
  `religion` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `smoke` varchar(255) DEFAULT NULL,
  `drink` varchar(255) DEFAULT NULL,
  `drugs` varchar(255) DEFAULT NULL,
  `sign` varchar(255) DEFAULT NULL,
  `diet` varchar(255) DEFAULT NULL,
  `kids` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `user_interests`
--

CREATE TABLE tags (
`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
`tag` VARCHAR(20) NOT NULL,
`in_or_out` VARCHAR(3) NOT NULL
);

INSERT INTO tags (tag, in_or_out) VALUES ('Music', 'in'), ('Foot', 'in'), ('Computer', 'in'), ('Science', 'in'), ('Gaming', 'in'), ('Movies', 'in'), ('Acting', 'in'), ('Cooking', 'in'), ('Crocheting', 'in'), ('Crossword puzzles', 'in'),
                ('Dance', 'in'), ('DIY', 'in'), ('Fashion', 'in'), ('Homebrewing', 'in'), ('CTG', 'in'), ('Sculpting', 'in'), ('Reading', 'in'), ('WoodWorking', 'in'), ('Painting', 'in'), ('Playing music', 'in'),
                ('Singing', 'in'), ('Watching TV', 'in'), ('drawing', 'in'), ('Yoga', 'in');

INSERT INTO tags (tag, in_or_out) VALUES ('Archery', 'out'), ('Astronomy', 'out'), ('Basketball', 'out'), ('Camping', 'out'), ('Canyoning', 'out'), ('Driving', 'out'), ('Fishing', 'out'), ('Geocaching', 'out'), ('Hiking', 'out'),
                ('Horseback Riding', 'out'), ('Hunting', 'out'), ('Jogging', 'out'), ('Martial Art', 'out'), ('Motor sports', 'out'), ('Paintball', 'out'), ('Parkour', 'out'), ('Photography', 'out'), ('Rock climbing', 'out'),
                ('Roller skating', 'out'), ('Skateboarding', 'out'), ('Rugby', 'out'), ('Skiing', 'out'), ('Snowboarding', 'out'), ('Walking', 'out');
--
-- Table structure for table `user_interests`
--

CREATE TABLE users_tags (
`user_id` INT NOT NULL,
`tag_id` INT NOT NULL,
PRIMARY KEY(`user_id`, `tag_id`),
CONSTRAINT `tagUpdate` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(255) NOT NULL,
  `idUser` int(11) NOT NULL,
  `created` varchar(255) DEFAULT NULL,
  `isProfil` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `photosUpdate` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
