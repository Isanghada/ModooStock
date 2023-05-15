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
-- Table structure for table `rank_table`
--

DROP TABLE IF EXISTS `rank_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rank_table` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_money` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96608 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rank_table`
--

LOCK TABLES `rank_table` WRITE;
/*!40000 ALTER TABLE `rank_table` DISABLE KEYS */;
INSERT INTO `rank_table` VALUES (96593,'안녕하세욜','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png',9971000),(96594,'이상해요','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',13107999),(96595,'인생은올인','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',13500000),(96596,'시나모롤','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f7.png',48937400),(96597,'저축왕','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f1.png',13500000),(96598,'핑크빈','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png',13500000),(96599,'김앙주','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',13500000),(96600,'톰과젤리','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f7.png',11940000),(96601,'ADMIN','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png',13502500),(96602,'hihi','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f7.png',9530000),(96603,'설명충','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f7.png',9458000),(96604,'화성드가자','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',12851999),(96605,'컨설턴트','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',10500000),(96606,'빅팜','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f1.png',13501000),(96607,'코치','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',10500000);
/*!40000 ALTER TABLE `rank_table` ENABLE KEYS */;
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
