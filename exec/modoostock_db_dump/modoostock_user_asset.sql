-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: k8e206.p.ssafy.io    Database: modoostock
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_asset`
--

DROP TABLE IF EXISTS `user_asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_asset` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_auctioned` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_in_repository` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrudsyhk4ajavsb3p8mkr3mg6i` (`asset_id`),
  KEY `FK4pcr2algrk5gbc63rp5qoq7an` (`user_id`),
  CONSTRAINT `FK4pcr2algrk5gbc63rp5qoq7an` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `FKrudsyhk4ajavsb3p8mkr3mg6i` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=588 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_asset`
--

LOCK TABLES `user_asset` WRITE;
/*!40000 ALTER TABLE `user_asset` DISABLE KEYS */;
INSERT INTO `user_asset` VALUES (558,'N','N','N',351,56),(559,'N','N','N',351,57),(560,'N','N','N',351,58),(561,'N','N','N',351,59),(562,'N','N','N',351,60),(563,'N','N','N',351,61),(564,'N','N','Y',164,59),(565,'N','N','N',351,62),(566,'N','N','N',351,63),(567,'N','N','N',351,64),(568,'N','N','Y',97,59),(569,'N','N','N',351,65),(570,'N','N','N',237,65),(571,'N','N','Y',72,65),(572,'N','N','N',218,65),(573,'N','N','N',351,66),(574,'N','N','N',154,65),(575,'N','N','Y',25,65),(576,'N','N','N',95,65),(577,'N','N','Y',168,65),(578,'N','N','Y',212,65),(579,'N','N','Y',334,65),(580,'N','N','N',351,67),(581,'N','N','N',351,68),(582,'N','N','N',351,69),(583,'N','N','N',351,70),(584,'N','N','N',214,63),(585,'N','N','N',310,63),(586,'N','N','Y',255,63),(587,'N','N','Y',25,63);
/*!40000 ALTER TABLE `user_asset` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-15 11:06:07
