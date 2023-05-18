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
) ENGINE=InnoDB AUTO_INCREMENT=1244 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_asset`
--

LOCK TABLES `user_asset` WRITE;
/*!40000 ALTER TABLE `user_asset` DISABLE KEYS */;
INSERT INTO `user_asset` VALUES (558,'N','N','N',351,56),(559,'Y','N','Y',351,57),(560,'N','N','N',351,58),(561,'N','N','Y',351,59),(562,'N','N','N',351,60),(563,'N','Y','N',351,61),(564,'N','N','Y',164,59),(565,'N','N','Y',351,62),(566,'N','N','N',351,63),(567,'N','N','N',351,64),(568,'N','N','Y',97,59),(569,'N','N','N',351,65),(570,'N','N','N',237,65),(571,'N','N','Y',72,65),(572,'N','N','N',218,65),(573,'N','N','N',351,66),(574,'N','N','N',154,65),(575,'N','N','Y',25,65),(576,'N','N','N',95,65),(577,'N','N','Y',168,65),(578,'N','N','Y',212,65),(579,'N','N','Y',334,65),(580,'N','N','Y',351,67),(581,'N','N','N',351,68),(582,'N','N','Y',351,69),(583,'N','N','N',351,70),(584,'N','N','Y',214,63),(585,'N','N','N',310,63),(586,'N','N','Y',255,63),(587,'N','N','Y',25,63),(588,'N','N','N',351,71),(589,'N','N','N',323,59),(590,'N','N','N',351,72),(591,'N','N','Y',251,69),(592,'N','N','N',350,69),(593,'N','N','Y',290,69),(594,'N','N','Y',49,69),(595,'N','N','Y',320,69),(596,'N','N','Y',338,69),(597,'N','N','N',237,69),(598,'N','N','Y',58,69),(599,'N','N','Y',322,69),(600,'N','N','Y',165,69),(601,'N','N','Y',174,69),(602,'N','N','Y',254,69),(603,'N','N','Y',48,69),(604,'N','N','N',351,73),(605,'N','Y','N',351,74),(606,'N','N','N',351,75),(607,'N','Y','N',351,76),(608,'N','N','N',70,62),(609,'N','N','N',351,77),(610,'N','Y','N',351,78),(611,'N','Y','N',351,79),(612,'N','N','N',351,80),(613,'N','N','N',351,81),(614,'N','Y','N',351,82),(615,'N','Y','N',351,83),(616,'N','Y','N',351,84),(617,'N','Y','N',351,85),(618,'N','Y','N',351,86),(619,'N','Y','N',351,87),(620,'N','Y','N',351,88),(621,'N','Y','N',351,89),(622,'N','Y','N',351,90),(623,'N','Y','N',351,91),(624,'N','Y','N',351,92),(625,'N','Y','N',351,93),(626,'N','Y','N',351,94),(627,'N','Y','N',351,95),(628,'N','Y','N',351,96),(629,'N','Y','N',351,97),(630,'N','N','Y',357,59),(631,'N','N','Y',163,57),(632,'N','N','Y',371,59),(633,'N','Y','N',351,98),(634,'N','Y','Y',18,59),(635,'N','Y','N',351,99),(636,'N','N','Y',257,59),(637,'N','N','Y',338,81),(638,'N','N','Y',197,81),(639,'N','N','Y',242,81),(640,'N','N','Y',72,81),(641,'N','N','Y',396,57),(642,'Y','N','Y',326,57),(643,'Y','N','Y',29,57),(644,'N','N','N',295,57),(645,'N','N','N',395,57),(646,'N','N','Y',330,57),(647,'N','N','Y',60,57),(648,'Y','N','Y',214,57),(649,'N','N','N',10,57),(650,'N','N','N',351,57),(651,'N','Y','N',351,100),(652,'N','Y','N',351,101),(653,'N','Y','N',351,102),(654,'N','Y','N',351,103),(655,'N','Y','N',351,104),(656,'N','N','N',351,105),(657,'N','N','N',351,106),(658,'N','Y','N',351,107),(659,'N','Y','N',351,108),(660,'N','Y','N',351,109),(661,'N','Y','N',351,110),(662,'N','Y','N',351,111),(663,'N','Y','N',351,112),(664,'N','Y','N',351,113),(665,'N','Y','N',351,114),(666,'N','Y','N',351,115),(667,'N','Y','N',351,116),(668,'N','Y','N',351,117),(669,'N','Y','N',351,118),(670,'N','Y','N',351,119),(671,'N','Y','N',351,120),(672,'N','Y','N',351,121),(673,'N','Y','N',351,122),(674,'N','Y','N',351,123),(675,'N','Y','N',351,124),(676,'N','N','N',73,63),(677,'N','N','Y',136,63),(678,'N','N','N',272,63),(679,'N','N','Y',194,63),(680,'N','N','N',116,63),(681,'N','N','Y',174,63),(682,'N','Y','N',351,125),(683,'N','Y','N',351,126),(684,'N','Y','N',351,127),(685,'N','Y','N',351,128),(686,'N','N','N',351,129),(687,'N','N','N',34,65),(688,'N','N','Y',73,65),(689,'N','N','Y',121,65),(690,'N','N','N',166,65),(691,'N','N','Y',315,65),(692,'N','N','Y',194,65),(693,'N','N','Y',294,65),(694,'N','N','Y',66,129),(695,'N','N','Y',367,129),(696,'N','N','N',337,73),(697,'N','N','Y',182,73),(698,'N','Y','Y',421,56),(699,'N','Y','Y',59,56),(700,'N','Y','Y',243,56),(701,'N','Y','Y',345,56),(702,'N','Y','Y',124,56),(703,'N','Y','Y',139,56),(704,'N','Y','Y',154,56),(705,'N','Y','Y',82,56),(706,'N','Y','Y',5,56),(707,'N','Y','Y',59,56),(708,'N','Y','Y',116,56),(709,'N','Y','Y',407,56),(710,'N','Y','Y',153,56),(711,'N','Y','Y',162,56),(712,'N','Y','Y',15,56),(713,'N','Y','Y',419,56),(714,'N','Y','Y',198,56),(715,'Y','N','Y',246,56),(716,'N','Y','Y',320,56),(717,'N','Y','Y',395,56),(718,'N','N','N',181,67),(719,'N','N','Y',48,67),(720,'N','N','Y',107,59),(721,'N','N','N',393,59),(722,'N','N','N',334,67),(723,'N','N','Y',315,67),(724,'N','N','N',156,59),(725,'N','Y','Y',137,56),(726,'N','N','N',353,67),(727,'N','N','Y',283,59),(728,'Y','N','Y',231,56),(729,'N','N','Y',279,67),(730,'N','N','Y',184,59),(731,'N','Y','Y',285,56),(732,'N','N','N',161,67),(733,'N','N','Y',392,59),(734,'N','N','Y',282,67),(735,'N','Y','Y',332,56),(736,'N','N','Y',172,59),(737,'N','N','N',96,67),(738,'N','N','Y',230,59),(739,'N','N','N',184,67),(740,'N','N','Y',366,59),(741,'N','N','N',254,67),(742,'N','N','Y',381,59),(743,'Y','N','Y',143,67),(744,'N','N','Y',258,59),(745,'N','N','Y',210,67),(746,'N','Y','Y',250,56),(747,'N','N','Y',294,59),(748,'N','N','N',274,67),(749,'N','Y','Y',64,56),(750,'N','N','N',418,59),(751,'N','N','N',220,67),(752,'N','Y','Y',321,56),(753,'N','N','Y',254,59),(754,'N','N','Y',181,67),(755,'N','N','N',219,56),(756,'N','N','N',249,59),(757,'Y','N','Y',155,67),(758,'N','N','Y',155,59),(759,'N','N','N',235,56),(760,'N','N','Y',77,67),(761,'N','N','Y',371,59),(762,'N','N','Y',385,63),(763,'N','N','Y',269,59),(764,'Y','N','Y',376,59),(765,'N','Y','N',128,56),(766,'Y','N','Y',390,56),(767,'N','Y','Y',68,56),(768,'N','N','N',197,59),(769,'N','Y','Y',23,56),(770,'N','N','Y',185,59),(771,'N','Y','Y',411,56),(772,'N','N','Y',336,59),(773,'N','N','Y',144,59),(774,'N','N','Y',58,56),(775,'N','N','Y',320,59),(776,'N','N','Y',212,59),(777,'N','N','Y',178,59),(778,'N','N','N',105,59),(779,'N','N','Y',43,59),(780,'N','N','Y',53,59),(781,'N','N','Y',232,59),(782,'N','Y','Y',406,56),(783,'N','Y','Y',340,56),(784,'N','N','N',215,56),(785,'N','Y','Y',229,56),(786,'N','Y','Y',161,56),(787,'N','Y','Y',365,56),(788,'N','N','N',228,56),(789,'N','Y','Y',141,56),(790,'Y','N','Y',65,56),(791,'N','Y','Y',421,56),(792,'N','N','Y',249,56),(793,'N','N','N',157,62),(794,'N','Y','Y',88,56),(795,'N','Y','Y',312,56),(796,'N','Y','Y',157,56),(797,'N','Y','Y',404,56),(798,'N','Y','Y',398,56),(799,'N','Y','Y',307,56),(800,'Y','N','Y',364,56),(801,'N','Y','Y',419,56),(802,'N','Y','Y',17,56),(803,'N','Y','Y',349,56),(804,'N','N','N',227,56),(805,'N','Y','Y',243,56),(806,'N','Y','Y',282,56),(807,'N','Y','Y',134,56),(808,'N','Y','Y',289,56),(809,'Y','N','Y',115,56),(810,'N','N','Y',413,62),(811,'N','Y','Y',372,56),(812,'Y','N','Y',33,56),(813,'N','Y','Y',177,56),(814,'N','Y','Y',242,56),(815,'N','N','N',31,56),(816,'N','N','N',29,56),(817,'N','N','N',100,56),(818,'Y','N','Y',6,56),(819,'N','Y','Y',238,56),(820,'N','Y','Y',134,56),(821,'Y','N','Y',409,56),(822,'N','Y','Y',357,56),(823,'N','Y','Y',407,56),(824,'N','Y','Y',101,56),(825,'N','Y','Y',272,56),(826,'N','Y','Y',8,56),(827,'N','Y','Y',116,56),(828,'N','Y','Y',287,56),(829,'Y','N','Y',417,56),(830,'N','Y','Y',372,56),(831,'Y','N','Y',143,56),(832,'N','Y','Y',317,56),(833,'N','Y','Y',181,56),(834,'N','Y','Y',198,56),(835,'N','Y','Y',341,56),(836,'N','N','N',406,62),(837,'N','N','Y',317,62),(838,'N','Y','Y',182,56),(839,'Y','N','Y',408,56),(840,'N','Y','Y',304,56),(841,'N','N','Y',271,62),(842,'N','N','N',227,56),(843,'N','N','N',225,56),(844,'N','Y','Y',83,56),(845,'N','N','N',72,56),(846,'N','Y','Y',116,56),(847,'N','Y','Y',111,56),(848,'N','N','Y',209,59),(849,'N','N','Y',86,59),(850,'N','N','Y',13,59),(851,'N','N','Y',168,59),(852,'N','N','N',119,59),(853,'N','N','N',130,59),(854,'N','N','Y',15,59),(855,'N','N','Y',121,59),(856,'N','N','Y',148,59),(857,'N','N','Y',287,59),(858,'N','N','Y',202,59),(859,'N','N','Y',293,59),(860,'N','N','Y',74,59),(861,'N','N','Y',189,59),(862,'N','N','Y',96,59),(863,'N','N','Y',358,59),(864,'N','N','Y',297,59),(865,'N','N','Y',220,59),(866,'N','N','Y',26,59),(867,'N','N','Y',133,59),(868,'N','N','Y',255,59),(869,'N','N','Y',278,59),(870,'N','Y','Y',415,56),(871,'N','Y','Y',203,56),(872,'N','Y','Y',137,56),(873,'N','N','N',311,56),(874,'N','Y','Y',29,56),(875,'N','Y','Y',295,56),(876,'N','Y','N',170,56),(877,'N','Y','Y',162,56),(878,'N','Y','Y',221,56),(879,'N','N','Y',181,59),(880,'N','N','N',206,56),(881,'N','Y','Y',322,56),(882,'N','Y','Y',404,56),(883,'N','Y','Y',69,56),(884,'N','Y','Y',316,56),(885,'N','N','N',143,59),(886,'N','Y','Y',140,56),(887,'N','N','Y',134,59),(888,'N','N','N',352,59),(889,'N','N','Y',326,63),(890,'N','N','Y',417,59),(891,'N','N','Y',222,63),(892,'N','N','Y',301,59),(893,'N','N','N',313,63),(894,'N','N','Y',229,59),(895,'N','N','N',62,63),(896,'N','N','Y',246,59),(897,'N','N','Y',170,63),(898,'N','N','Y',308,59),(899,'N','N','Y',57,59),(900,'N','N','N',279,63),(901,'N','N','Y',324,59),(902,'N','N','Y',395,59),(903,'N','N','Y',34,59),(904,'Y','N','Y',53,59),(905,'N','N','N',394,59),(906,'N','N','Y',325,59),(907,'N','N','Y',178,59),(908,'N','N','Y',184,59),(909,'N','N','Y',210,59),(910,'N','N','Y',190,59),(911,'N','Y','Y',28,59),(912,'N','Y','Y',5,59),(913,'N','N','Y',383,59),(914,'N','Y','Y',124,59),(915,'N','Y','Y',4,56),(916,'N','Y','Y',368,56),(917,'Y','N','Y',102,56),(918,'N','Y','Y',411,56),(919,'N','Y','Y',189,56),(920,'N','N','N',17,56),(921,'N','Y','Y',85,56),(922,'N','Y','Y',274,56),(923,'N','Y','Y',204,56),(924,'N','Y','Y',233,56),(925,'N','Y','Y',255,56),(926,'N','Y','Y',271,56),(927,'N','Y','Y',285,56),(928,'N','N','N',394,73),(929,'N','N','N',143,59),(930,'N','Y','Y',351,56),(931,'N','Y','N',310,59),(932,'N','Y','Y',280,59),(933,'N','N','N',102,59),(934,'N','N','Y',272,59),(935,'N','Y','Y',171,59),(936,'N','N','Y',69,59),(937,'N','Y','Y',269,59),(938,'N','N','Y',266,59),(939,'N','Y','Y',128,59),(940,'Y','N','Y',395,59),(941,'N','N','Y',173,59),(942,'N','N','Y',173,59),(943,'N','N','Y',351,59),(944,'N','N','Y',224,59),(945,'N','N','N',104,57),(946,'N','Y','Y',399,56),(947,'N','Y','Y',398,56),(948,'Y','N','Y',171,56),(949,'N','Y','Y',44,56),(950,'N','N','Y',386,59),(951,'N','Y','Y',365,56),(952,'N','Y','Y',221,56),(953,'N','Y','Y',143,56),(954,'N','Y','Y',181,56),(955,'N','Y','Y',173,56),(956,'N','Y','Y',148,56),(957,'N','Y','Y',332,56),(958,'N','Y','Y',300,56),(959,'N','Y','Y',116,56),(960,'N','N','N',14,56),(961,'N','Y','Y',222,56),(962,'N','N','Y',369,59),(963,'N','Y','Y',191,56),(964,'N','Y','Y',36,56),(965,'N','Y','Y',330,56),(966,'Y','N','Y',417,56),(967,'N','Y','Y',47,56),(968,'Y','N','Y',405,56),(969,'N','Y','Y',336,56),(970,'N','Y','Y',143,56),(971,'N','N','Y',34,62),(972,'N','Y','Y',283,56),(973,'N','Y','Y',234,56),(974,'N','N','Y',417,59),(975,'N','N','Y',398,59),(976,'N','N','N',351,130),(977,'N','Y','Y',302,56),(978,'N','N','Y',355,59),(979,'N','N','Y',393,59),(980,'Y','N','Y',359,57),(981,'N','N','Y',398,63),(982,'N','N','N',65,63),(983,'N','N','Y',28,63),(984,'N','N','N',66,63),(985,'N','N','Y',189,63),(986,'N','N','Y',391,63),(987,'N','N','Y',129,59),(988,'N','Y','Y',381,59),(989,'N','N','Y',370,59),(990,'N','N','Y',208,59),(991,'N','N','Y',384,59),(992,'N','Y','Y',44,59),(993,'N','N','Y',36,59),(994,'N','N','Y',173,59),(995,'N','N','Y',221,59),(996,'N','N','Y',218,59),(997,'N','N','Y',335,59),(998,'N','N','Y',396,59),(999,'Y','N','Y',375,59),(1000,'N','N','Y',332,59),(1001,'N','N','Y',414,59),(1002,'N','N','N',227,73),(1003,'N','N','N',197,73),(1004,'N','N','Y',282,73),(1005,'N','N','Y',239,73),(1006,'N','N','Y',350,73),(1007,'N','N','Y',150,73),(1008,'N','N','Y',66,73),(1009,'N','N','Y',77,73),(1010,'N','N','Y',395,73),(1011,'N','N','Y',331,73),(1012,'N','N','Y',61,73),(1013,'N','N','Y',370,73),(1014,'N','N','Y',409,73),(1015,'N','N','Y',254,73),(1016,'N','N','Y',23,73),(1017,'N','N','Y',218,73),(1018,'N','N','Y',199,59),(1019,'N','N','Y',141,59),(1020,'N','N','Y',297,59),(1021,'N','N','Y',12,59),(1022,'N','N','Y',53,59),(1023,'N','N','Y',289,59),(1024,'N','N','Y',330,59),(1025,'N','N','Y',346,59),(1026,'N','N','Y',395,59),(1027,'N','N','Y',120,59),(1028,'N','N','Y',390,59),(1029,'N','N','Y',169,59),(1030,'N','N','Y',158,59),(1031,'N','N','Y',60,59),(1032,'N','N','Y',54,59),(1033,'N','N','Y',179,59),(1034,'N','N','Y',337,59),(1035,'N','N','Y',321,59),(1036,'N','N','Y',304,59),(1037,'N','N','Y',91,59),(1038,'N','N','Y',176,59),(1039,'N','N','Y',76,59),(1040,'N','N','Y',184,59),(1041,'N','Y','Y',13,56),(1042,'N','N','Y',258,75),(1043,'N','N','Y',331,75),(1044,'N','Y','Y',93,56),(1045,'N','Y','Y',62,56),(1046,'N','N','Y',416,62),(1047,'N','N','N',245,62),(1048,'N','Y','Y',351,56),(1049,'N','Y','Y',17,56),(1050,'N','Y','Y',218,56),(1051,'N','N','N',136,56),(1052,'N','Y','Y',324,56),(1053,'N','Y','Y',64,56),(1054,'N','Y','Y',139,56),(1055,'N','N','N',400,62),(1056,'N','Y','Y',407,56),(1057,'N','Y','Y',67,56),(1058,'N','Y','Y',20,56),(1059,'N','Y','Y',98,56),(1060,'N','Y','Y',219,56),(1061,'N','Y','Y',252,56),(1062,'N','Y','Y',312,56),(1063,'N','Y','Y',407,56),(1064,'N','N','Y',412,73),(1065,'N','N','N',218,56),(1066,'N','Y','Y',17,56),(1067,'N','N','Y',381,62),(1068,'N','Y','Y',295,56),(1069,'N','Y','Y',64,56),(1070,'N','Y','Y',141,56),(1071,'N','Y','Y',36,56),(1072,'N','Y','Y',344,56),(1073,'N','N','Y',362,62),(1074,'N','N','Y',377,62),(1075,'N','N','N',22,56),(1076,'N','Y','Y',88,56),(1077,'N','N','N',57,56),(1078,'Y','N','Y',219,56),(1079,'N','Y','Y',9,56),(1080,'N','N','Y',372,62),(1081,'N','Y','Y',116,56),(1082,'N','Y','Y',78,56),(1083,'N','Y','Y',395,56),(1084,'N','Y','Y',55,56),(1085,'Y','N','Y',126,56),(1086,'N','Y','Y',302,56),(1087,'N','Y','Y',74,56),(1088,'N','Y','Y',307,56),(1089,'N','Y','Y',312,56),(1090,'N','Y','Y',245,56),(1091,'N','Y','Y',122,56),(1092,'N','Y','Y',382,56),(1093,'N','Y','Y',351,56),(1094,'N','Y','Y',53,56),(1095,'N','Y','Y',62,56),(1096,'N','Y','Y',283,56),(1097,'N','N','N',351,131),(1098,'N','N','Y',329,62),(1099,'N','Y','Y',267,56),(1100,'N','Y','Y',407,56),(1101,'N','Y','Y',96,56),(1102,'N','Y','Y',150,56),(1103,'N','N','N',208,56),(1104,'N','Y','Y',17,56),(1105,'N','Y','Y',149,56),(1106,'N','N','N',320,56),(1107,'N','N','N',202,62),(1108,'N','Y','Y',274,56),(1109,'N','Y','Y',399,56),(1110,'N','N','N',102,62),(1111,'N','Y','Y',411,56),(1112,'N','Y','Y',303,56),(1113,'N','N','N',337,62),(1114,'N','N','N',354,62),(1115,'N','Y','Y',145,56),(1116,'N','Y','Y',372,56),(1117,'N','Y','Y',357,56),(1118,'Y','N','Y',108,56),(1119,'N','Y','Y',23,56),(1120,'N','Y','Y',11,56),(1121,'Y','N','Y',197,56),(1122,'N','Y','Y',105,56),(1123,'N','Y','Y',168,56),(1124,'N','Y','N',249,56),(1125,'N','Y','N',132,56),(1126,'N','N','Y',360,62),(1127,'N','Y','Y',364,56),(1128,'N','Y','Y',258,56),(1129,'N','Y','Y',190,56),(1130,'N','Y','Y',2,56),(1131,'N','Y','Y',233,56),(1132,'N','N','Y',400,56),(1133,'N','Y','Y',48,56),(1134,'N','Y','Y',417,56),(1135,'Y','N','Y',392,56),(1136,'N','Y','N',384,56),(1137,'N','N','Y',179,131),(1138,'N','N','Y',237,131),(1139,'N','N','N',321,131),(1140,'N','N','Y',399,131),(1141,'N','N','Y',372,131),(1142,'N','N','Y',204,131),(1143,'N','N','N',417,131),(1144,'N','N','N',128,131),(1145,'N','Y','Y',291,56),(1146,'N','Y','Y',114,56),(1147,'N','Y','Y',175,56),(1148,'N','Y','Y',39,56),(1149,'N','Y','Y',285,56),(1150,'N','Y','Y',389,56),(1151,'N','Y','Y',274,56),(1152,'N','Y','Y',138,56),(1153,'N','N','Y',171,56),(1154,'N','Y','Y',333,56),(1155,'N','Y','Y',320,56),(1156,'N','N','Y',222,62),(1157,'N','N','N',226,56),(1158,'Y','N','Y',180,56),(1159,'N','N','N',399,62),(1160,'N','Y','Y',155,56),(1161,'N','Y','Y',317,56),(1162,'N','Y','Y',192,56),(1163,'N','Y','Y',320,56),(1164,'N','N','Y',393,131),(1165,'N','Y','Y',333,56),(1166,'N','N','Y',275,131),(1167,'N','Y','N',351,132),(1168,'N','N','N',339,62),(1169,'N','N','N',312,62),(1170,'N','N','Y',319,62),(1171,'N','N','Y',177,62),(1172,'N','N','Y',73,62),(1173,'N','N','N',56,62),(1174,'N','N','Y',90,62),(1175,'N','N','Y',381,58),(1176,'N','N','Y',129,62),(1177,'N','N','Y',96,58),(1178,'N','N','Y',119,58),(1179,'N','N','Y',241,58),(1180,'N','N','Y',87,58),(1181,'N','N','Y',243,58),(1182,'Y','N','Y',412,58),(1183,'N','N','Y',368,58),(1184,'N','N','Y',370,58),(1185,'N','N','Y',126,58),(1186,'N','N','Y',317,58),(1187,'N','N','Y',214,62),(1188,'N','N','Y',206,58),(1189,'N','N','Y',108,58),(1190,'N','N','Y',399,58),(1191,'N','N','N',101,62),(1192,'N','N','Y',5,58),(1193,'N','N','Y',104,58),(1194,'N','N','Y',416,58),(1195,'N','N','Y',383,58),(1196,'N','N','Y',392,58),(1197,'N','N','Y',370,58),(1198,'Y','N','Y',373,58),(1199,'N','N','Y',123,58),(1200,'N','N','Y',144,58),(1201,'N','N','N',77,62),(1202,'N','N','Y',292,62),(1203,'N','Y','Y',77,77),(1204,'N','N','Y',193,132),(1205,'N','N','Y',375,132),(1206,'N','N','Y',102,132),(1207,'N','N','Y',160,132),(1208,'N','N','Y',205,63),(1209,'N','Y','Y',351,63),(1210,'N','N','Y',241,63),(1211,'Y','N','Y',116,63),(1212,'N','N','Y',46,63),(1213,'N','N','Y',27,63),(1214,'N','N','N',351,133),(1215,'N','N','N',153,133),(1216,'N','N','N',408,133),(1217,'N','N','N',142,56),(1218,'N','N','Y',227,56),(1219,'N','Y','Y',372,56),(1220,'N','Y','Y',93,56),(1221,'N','Y','Y',341,56),(1222,'N','Y','Y',6,56),(1223,'N','Y','Y',334,56),(1224,'N','Y','Y',52,56),(1225,'N','N','N',220,56),(1226,'N','Y','Y',366,56),(1227,'N','Y','Y',235,56),(1228,'N','Y','Y',342,56),(1229,'N','N','Y',88,73),(1230,'N','N','N',351,134),(1231,'N','N','N',232,134),(1232,'N','N','N',351,135),(1233,'N','N','N',351,136),(1234,'N','Y','Y',228,73),(1235,'N','Y','Y',288,73),(1236,'N','Y','Y',281,73),(1237,'N','N','Y',66,73),(1238,'N','N','Y',297,73),(1239,'N','N','Y',415,73),(1240,'N','Y','Y',361,56),(1241,'N','N','N',351,137),(1242,'N','N','Y',385,73),(1243,'N','N','Y',335,63);
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

-- Dump completed on 2023-05-17  9:38:02