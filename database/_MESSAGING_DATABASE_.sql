-- phpMyAdmin SQL Dump
-- version 5.1.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 09, 2021 at 06:03 PM
-- Server version: 10.4.21-MariaDB-log
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_fitzpaca`
--

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`category_id`, `category_name`) VALUES
(1, 'Leadership'),
(2, 'Team A'),
(3, 'Team B'),
(4, 'Team C'),
(5, 'Professional Development'),
(6, 'For Fun');

-- --------------------------------------------------------

--
-- Table structure for table `Channels`
--

DROP TABLE IF EXISTS `Channels`;
CREATE TABLE `Channels` (
  `channel_id` int(11) NOT NULL,
  `channel_name` varchar(50) NOT NULL,
  `workspace_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Channels`
--

INSERT INTO `Channels` (`channel_id`, `channel_name`, `workspace_id`, `category_id`) VALUES
(1, 'General', 1, 2),
(2, 'Big Pumps Install Project', 1, 2),
(3, 'Off-Topic', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

DROP TABLE IF EXISTS `Messages`;
CREATE TABLE `Messages` (
  `message_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `channel` int(11) NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL,
  `content` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Messages`
--

INSERT INTO `Messages` (`message_id`, `user`, `channel`, `time`, `date`, `content`) VALUES
(1, 1, 1, '12:18:50', '2021-11-09', 'This is the first message ever created! :)'),
(2, 1, 2, '12:22:11', '2021-11-09', 'How big should the pumps be?'),
(3, 1, 3, '12:23:31', '2021-11-09', 'Anyone going out this weekend?');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `username`, `email`, `first_name`, `last_name`) VALUES
(1, 'ShaunaLawson58', 'ShaunaLawson58@email.com', 'Shauna', 'Lawson'),
(2, 'JessicaHamilton39', 'JessicaHamilton39@email.com', 'Jessica', 'Hamilton'),
(3, 'TonyaHutter26', 'TonyaHutter26@email.com', 'Tonya', 'Hutter');

-- --------------------------------------------------------

--
-- Table structure for table `Users_Workspaces`
--

DROP TABLE IF EXISTS `Users_Workspaces`;
CREATE TABLE `Users_Workspaces` (
  `user_id` int(11) NOT NULL,
  `workspace_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users_Workspaces`
--

INSERT INTO `Users_Workspaces` (`user_id`, `workspace_id`) VALUES
(1, 1),
(2, 1),
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Workspaces`
--

DROP TABLE IF EXISTS `Workspaces`;
CREATE TABLE `Workspaces` (
  `workspace_id` int(11) NOT NULL,
  `workspace_name` varchar(50) NOT NULL,
  `administrator` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Workspaces`
--

INSERT INTO `Workspaces` (`workspace_id`, `workspace_name`, `administrator`) VALUES
(1, 'Power Generation', 1),
(2, 'Sales', 1),
(3, 'Marketing', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `Channels`
--
ALTER TABLE `Channels`
  ADD PRIMARY KEY (`channel_id`),
  ADD KEY `workspace_id` (`workspace_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `user` (`user`),
  ADD KEY `channel` (`channel`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `Users_Workspaces`
--
ALTER TABLE `Users_Workspaces`
  ADD PRIMARY KEY (`user_id`,`workspace_id`),
  ADD KEY `workspace_id` (`workspace_id`);

--
-- Indexes for table `Workspaces`
--
ALTER TABLE `Workspaces`
  ADD PRIMARY KEY (`workspace_id`),
  ADD KEY `administrator` (`administrator`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Channels`
--
ALTER TABLE `Channels`
  MODIFY `channel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Messages`
--
ALTER TABLE `Messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Workspaces`
--
ALTER TABLE `Workspaces`
  MODIFY `workspace_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Channels`
--
ALTER TABLE `Channels`
  ADD CONSTRAINT `Channels_ibfk_1` FOREIGN KEY (`workspace_id`) REFERENCES `Workspaces` (`workspace_id`),
  ADD CONSTRAINT `Channels_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`category_id`);

--
-- Constraints for table `Messages`
--
ALTER TABLE `Messages`
  ADD CONSTRAINT `Messages_ibfk_1` FOREIGN KEY (`user`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `Messages_ibfk_2` FOREIGN KEY (`channel`) REFERENCES `Channels` (`channel_id`);

--
-- Constraints for table `Users_Workspaces`
--
ALTER TABLE `Users_Workspaces`
  ADD CONSTRAINT `Users_Workspaces_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `Users_Workspaces_ibfk_2` FOREIGN KEY (`workspace_id`) REFERENCES `Workspaces` (`workspace_id`);

--
-- Constraints for table `Workspaces`
--
ALTER TABLE `Workspaces`
  ADD CONSTRAINT `Workspaces_ibfk_1` FOREIGN KEY (`administrator`) REFERENCES `Users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
