-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2019 at 12:27 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  `idUser` int(11) NOT NULL,
  `created` varchar(255) DEFAULT NULL,
  `isProfil` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `tag` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tag`) VALUES
(1, 'piscine'),
(2, 'foot'),
(3, 'ordinateur'),
(4, 'velo'),
(5, 'course'),
(6, 'running'),
(7, 'dessiner'),
(8, 'peindre'),
(9, 'musique'),
(10, 'spotify'),
(11, 'cafe'),
(12, 'badminton'),
(13, 'more'),
(14, 'bar'),
(15, 'facebook'),
(16, 'jeux videos'),
(17, 'consoles'),
(18, 'twitter'),
(19, 'metal'),
(20, 'rap'),
(21, 'rock'),
(22, 'techno'),
(23, 'sculpture'),
(24, 'tennis'),
(25, 'squash'),
(26, 'sail'),
(27, 'nothing');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `registered` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `connected` tinyint(4) NOT NULL DEFAULT '0',
  `confirmed` tinyint(4) NOT NULL DEFAULT '0',
  `lastSeen` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_infos`
--

CREATE TABLE `users_infos` (
  `UserID` int(11) NOT NULL,
  `login` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1=male, 2=female, 3=other',
  `dob` date NOT NULL,
  `text1` text,
  `text2` text,
  `text3` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_relations`
--

CREATE TABLE `users_relations` (
  `RelationID` bigint(20) NOT NULL,
  `UserID` int(11) NOT NULL,
  `TargetID` int(11) NOT NULL,
  `Type` smallint(6) DEFAULT NULL COMMENT '1 = liked, 2 = blocked',
  `LikeViewed` tinyint(2) NOT NULL DEFAULT '0',
  `Date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_reports`
--

CREATE TABLE `users_reports` (
  `reportID` bigint(20) NOT NULL,
  `UserID` bigint(10) NOT NULL,
  `TargetID` bigint(10) NOT NULL,
  `raison` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_tags`
--

CREATE TABLE `users_tags` (
  `user_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_traits`
--

CREATE TABLE `users_traits` (
  `UserID` int(11) NOT NULL,
  `size` smallint(6) NOT NULL DEFAULT '0',
  `orientation` tinyint(4) DEFAULT '0' COMMENT '1=straight, 2=gay, 3=bi',
  `kids` tinyint(4) DEFAULT '0' COMMENT '1=yes, 2=none',
  `status` tinyint(4) DEFAULT '0' COMMENT '1=single, 2=seeing someone, 3=Married, 4=open',
  `ethnicity` tinyint(4) DEFAULT '0' COMMENT '1=Asian, 2=Indian, 3=Caucasian, 4=Black, 5=Hispanic, 6=Other',
  `religion` tinyint(4) DEFAULT '0' COMMENT '1=Atheism, 2=Christian, 3=Judaism, 4=Islam, 5=other',
  `smoke` tinyint(4) DEFAULT '0' COMMENT '1=yes, 2=no, 3=sometimes',
  `drink` tinyint(4) DEFAULT '0' COMMENT '1=yes, 2=no, 3=sometimes',
  `drugs` tinyint(4) DEFAULT '0' COMMENT '1=yes, 2=no, 3=sometimes',
  `diet` tinyint(4) DEFAULT '0' COMMENT '1=Omnivore, 2=Vegetarian, 3=Vegan',
  `sign` tinyint(4) DEFAULT '0' COMMENT 'Aquarius, Pisces, Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `photosUpdate` (`idUser`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `users_infos`
--
ALTER TABLE `users_infos`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `id` (`UserID`);

--
-- Indexes for table `users_relations`
--
ALTER TABLE `users_relations`
  ADD PRIMARY KEY (`RelationID`),
  ADD UNIQUE KEY `U_T_ndx` (`UserID`,`TargetID`) USING BTREE,
  ADD KEY `TargetID` (`TargetID`),
  ADD KEY `UserID` (`UserID`) USING BTREE;

--
-- Indexes for table `users_reports`
--
ALTER TABLE `users_reports`
  ADD PRIMARY KEY (`reportID`);

--
-- Indexes for table `users_tags`
--
ALTER TABLE `users_tags`
  ADD UNIQUE KEY `user_id` (`user_id`,`tag_id`) USING BTREE,
  ADD KEY `tag_id` (`tag_id`),
  ADD KEY `user_id_2` (`user_id`) USING BTREE;

--
-- Indexes for table `users_traits`
--
ALTER TABLE `users_traits`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `UserID` (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `users_relations`
--
ALTER TABLE `users_relations`
  MODIFY `RelationID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=613;
--
-- AUTO_INCREMENT for table `users_reports`
--
ALTER TABLE `users_reports`
  MODIFY `reportID` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photosUpdate` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_infos`
--
ALTER TABLE `users_infos`
  ADD CONSTRAINT `users_infos_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_relations`
--
ALTER TABLE `users_relations`
  ADD CONSTRAINT `UR_TARGET` FOREIGN KEY (`TargetID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UR_USER` FOREIGN KEY (`UserID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_tags`
--
ALTER TABLE `users_tags`
  ADD CONSTRAINT `users_tags_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_tags_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_traits`
--
ALTER TABLE `users_traits`
  ADD CONSTRAINT `UserID` FOREIGN KEY (`UserID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
