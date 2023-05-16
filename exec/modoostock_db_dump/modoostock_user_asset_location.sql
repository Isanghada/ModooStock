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
-- Table structure for table `user_asset_location`
--

DROP TABLE IF EXISTS `user_asset_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_asset_location` (
  `posx` float NOT NULL,
  `posy` float NOT NULL,
  `posz` float NOT NULL,
  `rotx` float NOT NULL,
  `roty` float NOT NULL,
  `rotz` float NOT NULL,
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK8uucgjiqmhuet99ysg2ad3xct` FOREIGN KEY (`id`) REFERENCES `user_asset` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_asset_location`
--

LOCK TABLES `user_asset_location` WRITE;
/*!40000 ALTER TABLE `user_asset_location` DISABLE KEYS */;
INSERT INTO `user_asset_location` VALUES (0,0,0,0,0,0,558),(0,0,0,0,0,0,559),(0,0,0,0,0,0,560),(0,0,0,0,0,0,561),(0,0,0,0,0,0,562),(0,0,0,0,0,0,563),(0,0,-200,0,0,0,564),(0,0,0,0,0,0,565),(0,0,0,0,0,0,566),(0,0,0,0,0,0,567),(0,0,-200,0,0,0,568),(0,0,0,0,0,0,569),(200,145,-13,0,0,0,570),(0,0,-200,0,0,0,571),(0,-200,-328,0,0,0,572),(0,0,0,0,0,0,573),(0,0,-13,0,0,0,574),(0,0,-200,0,0,0,575),(0,0,-16,0,0,0,576),(0,0,-200,0,0,0,577),(0,0,-200,0,0,0,578),(0,0,-200,0,0,0,579),(0,0,0,0,0,0,580),(0,0,0,0,0,0,581),(0,0,0,0,0,0,582),(0,0,0,0,0,0,583),(-200,-200,-207,0,0,0,584),(77,-87,-16,0,0,0,585),(0,0,-200,0,0,0,586),(0,0,-200,0,0,0,587);
/*!40000 ALTER TABLE `user_asset_location` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-15 11:06:01
