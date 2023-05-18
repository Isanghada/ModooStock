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
-- Table structure for table `user_deal`
--

DROP TABLE IF EXISTS `user_deal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_deal` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `average` bigint NOT NULL,
  `total_amount` int NOT NULL,
  `total_price` float NOT NULL,
  `stock_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `rate` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKaqk0r101mf30jwi2rl55e3a43` (`stock_id`),
  KEY `FK44vmlhqdunin78tv0wev7yjpd` (`user_id`),
  CONSTRAINT `FK44vmlhqdunin78tv0wev7yjpd` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `FKaqk0r101mf30jwi2rl55e3a43` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_deal`
--

LOCK TABLES `user_deal` WRITE;
/*!40000 ALTER TABLE `user_deal` DISABLE KEYS */;
INSERT INTO `user_deal` VALUES (84,0,0,0,25,59,0),(85,0,0,0,25,66,0),(86,0,0,0,28,67,0),(87,0,0,0,27,57,0),(88,0,0,496,27,59,0),(89,0,0,0,25,63,0),(90,0,0,0,26,56,0),(91,0,0,0,28,64,0),(92,0,0,-10,25,62,0),(93,0,0,-10,27,62,0),(94,0,0,5,28,62,0),(95,0,0,0,28,73,0),(96,0,0,0,28,59,0),(97,0,0,7680,27,75,0),(98,0,0,0,26,73,0),(99,0,0,0,26,59,0),(100,0,0,0,28,57,0),(101,0,0,0,25,57,0),(102,0,0,0,26,75,0),(103,0,0,0,28,69,0),(104,0,0,-320,27,105,0),(105,0,0,0,26,105,0),(106,0,0,256,26,77,0),(107,0,0,0,27,77,0),(108,0,0,0,27,130,0),(109,0,0,0,26,67,0),(110,0,0,0,26,58,0),(111,0,0,0,28,131,0),(112,0,0,0,28,134,0),(113,0,0,0,25,73,0),(114,0,0,0,27,134,0);
/*!40000 ALTER TABLE `user_deal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-17  9:38:02
