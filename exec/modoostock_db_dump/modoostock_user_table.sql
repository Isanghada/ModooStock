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
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `account` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `current_money` bigint NOT NULL,
  `introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
INSERT INTO `user_table` VALUES (56,'2023-05-15 09:05:34.639000','2023-05-15 10:44:33.027000','안녕',16500,'','N','안녕하세욜','$2a$10$4ddYEaagW7nE1.nzXNrioepdP/rnzZr.2ac6HFIJQb2NuRFWvp4SK','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png','USER'),(57,'2023-05-15 09:07:20.818000','2023-05-15 10:52:43.630000','susu4788',49000,'인생 한방','N','이상해요','$2a$10$Bjcf8wQjlFUydKhK9qru2ekSKsiRbuNgEZutfA6p51gy5BpxH7Eem','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png','USER'),(58,'2023-05-15 09:08:42.464000','2023-05-15 09:08:47.640000','susu1234',13000000,'인생 한방','N','인생은올인','$2a$10$c/ITkmVBcLV4tYDQm42IoufgCajKGXPhq50rDteA6GjKuCujGFE.a','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png','USER'),(59,'2023-05-15 09:14:10.144000','2023-05-15 10:43:16.390000','xhaktm1122',601200,'인생 한방','N','시나모롤','$2a$10$4e9aV9SgKzWZYffHSgt56uwE4.QGsekZo1EH/AH4Bnjp6vDXiSLeC','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f7.png','USER'),(60,'2023-05-15 09:14:15.983000','2023-05-15 09:14:26.985000','imking',0,'인생 한방','N','저축왕','$2a$10$otMjpHWmf1S6tMUKKoWN7OZyZHRkMT5OMjktvpZo7A.AsTY4e1HNe','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f1.png','USER'),(61,'2023-05-15 09:14:31.303000','2023-05-15 10:56:53.286000','xhaktm12',13000000,'인생 한방','N','핑크빈','$2a$10$pUKLftBzzxjPpaJh9Wl5pO67ksCPXL88Rbqn8D4OvSnvUOxjwHMc6','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png','USER'),(62,'2023-05-15 09:17:02.253000','2023-05-15 09:18:47.730000','songb',12000000,'인생 한방','N','김앙주','$2a$10$Z1ny3Vo91PFDjyxZ1OYwweZydWk0LHiwdCpWUPJpV3MIsWH3gqbJ2','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png','USER'),(63,'2023-05-15 09:21:09.165000','2023-05-15 10:41:19.191000','jelly',170000,'인생 한방','N','톰과젤리','$2a$10$5LEZpRmuSMZSTNzq7nZPtOjxHQXGq6LfgpkEoqqGQYDWRYOLCAVM6','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f7.png','USER'),(64,'2023-05-15 09:22:03.959000','2023-05-15 10:56:45.861000','ADMIN',12778000,'','N','ADMIN','$2a$10$xv.Pu5za9lTmYjIRZGI2/uU53FKiF7/Tw4gD7ljut3fpbauEhlV0u','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png','ADMIN'),(65,'2023-05-15 10:03:24.840000','2023-05-15 10:12:19.351000','hello',30000,'인생 한방','N','hihi','$2a$10$cFB0ixxq9OXmMjJBnrHSCO4IDZvwreH.ZUm9kYFf5hmJ6.0D2MjZS','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f7.png','USER'),(66,'2023-05-15 10:08:01.197000','2023-05-15 10:09:34.514000','introduce',180000,'인생 한방','N','설명충','$2a$10$5e0K5lYs4pIcTAlVYS5VC.PruPgQLrugOcqyXGbO0169k1G.nQh1u','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f7.png','USER'),(67,'2023-05-15 10:10:09.297000','2023-05-15 10:10:26.374000','yolo',229000,'인생 한방','N','화성드가자','$2a$10$dA2gxA7hjEhhd5I8iCxNf.CI4BqpmMS4WKHW3OrrWxDME1SzxYEZG','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png','USER'),(68,'2023-05-15 10:13:27.341000','2023-05-15 10:13:27.341000','Consultant',10000000,'인생 한방','N','컨설턴트','$2a$10$RG8IHq0/EI60W63q7v9fG.VKBTDG8IhAv/zpGmmCrMZn7VqQTTiuK','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png','ADMIN'),(69,'2023-05-15 10:13:38.510000','2023-05-15 10:14:51.340000','kkjj7872',13001000,'인생 한방','N','빅팜','$2a$10$pr2JBqYsqM4O5fKbBJMmKOSQCU6RizgtmUshKnR8KfpJUvWJCwmEi','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f1.png','USER'),(70,'2023-05-15 10:13:47.680000','2023-05-15 10:13:47.680000','Coach',10000000,'인생 한방','N','코치','$2a$10$GjXzTT/GqBXjODw7qvuyBeR5KUSylG4yY7omdl4g83qzQRg3l66ky','https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/f6.png','ADMIN');
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-15 11:06:08
