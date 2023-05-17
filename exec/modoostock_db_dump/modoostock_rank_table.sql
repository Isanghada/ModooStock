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
) ENGINE=InnoDB AUTO_INCREMENT=107507 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rank_table`
--

LOCK TABLES `rank_table` WRITE;
/*!40000 ALTER TABLE `rank_table` DISABLE KEYS */;
INSERT INTO `rank_table` VALUES (107476,'오리','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png',373880000),(107477,'이상해요','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',51889667),(107478,'인생은올인','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',40240000),(107479,'시나모롤','https://raw.githubusercontent.com/hyeonaseome/trycatchAnswer/main/sinamonroll.png',759411073),(107480,'저축왕','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f1.png',68423913),(107481,'김앙주','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',103483000),(107482,'톰과젤리','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f7.png',55640000),(107483,'ADMIN','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png',54603500),(107484,'hihi','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f7.png',62030000),(107485,'설명충','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f7.png',60808000),(107486,'화성드가자','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',39395500),(107487,'컨설턴트','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',61500000),(107488,'빅팜','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f1.png',61856000),(107489,'코치','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',64500000),(107490,'룰루랄라','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png',59500000),(107491,'google','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f1.png',64500000),(107492,'키위쥬스','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png',51300700),(107493,'워렌 버핏','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png',3710394620),(107494,'빌 애크먼','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m3.png',1748812900),(107495,'지나가는행인','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',93410000),(107496,'핑크빈','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f1.png',62000000),(107497,'레이 달리오','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png',1502590400),(107498,'응우옌','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f1.png',48980000),(107499,'APPL','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png',321492200),(107500,'주황버섯','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png',47213759),(107501,'모두의주식','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png',26900000),(107502,'이이김김','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png',26750000),(107503,'jyk','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f1.png',25000000),(107504,'얼음저금통','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png',24419060),(107505,'jayl2','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f1.png',24500000),(107506,'뽀개미','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m3.png',24500000);
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

-- Dump completed on 2023-05-17  9:37:53
