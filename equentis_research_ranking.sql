--
-- Table structure for table `lead_contact_details`
--

DROP TABLE IF EXISTS `lead_contact_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lead_contact_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lead_id` int NOT NULL,
  `lead_contact_methods_id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `lead_contact_methods_id` (`lead_contact_methods_id`),
  KEY `lead_id` (`lead_id`),
  CONSTRAINT `lead_contact_details_ibfk_1` FOREIGN KEY (`lead_contact_methods_id`) REFERENCES `lead_contact_methods` (`id`),
  CONSTRAINT `lead_id` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lead_contact_details`
--

LOCK TABLES `lead_contact_details` WRITE;
/*!40000 ALTER TABLE `lead_contact_details` DISABLE KEYS */;
INSERT INTO `lead_contact_details` VALUES (1,1,1,'john.smith@example.com','2024-05-24 17:55:39','2024-05-24 18:01:06',1),(2,2,2,'1234567890','2024-05-24 18:01:24','2024-05-24 18:01:41',1);
/*!40000 ALTER TABLE `lead_contact_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lead_contact_methods`
--

DROP TABLE IF EXISTS `lead_contact_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lead_contact_methods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `method` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `method` (`method`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lead_contact_methods`
--

LOCK TABLES `lead_contact_methods` WRITE;
/*!40000 ALTER TABLE `lead_contact_methods` DISABLE KEYS */;
INSERT INTO `lead_contact_methods` VALUES (1,'email','2024-05-24 15:33:17','2024-05-24 15:33:17',1),(2,'sms','2024-05-24 15:33:19','2024-05-24 15:33:19',1);
/*!40000 ALTER TABLE `lead_contact_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `relationship_manager_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL,
  `contact_id` int DEFAULT NULL,
  `contact_message` text,
  `additional_info` text,
  `current_status` enum('New','Contacted','Qualified','Disqualified','Converted') DEFAULT 'New',
  `status_reason` text,
  `priority` enum('Low','Medium','High') DEFAULT 'Medium',
  `next_follow_up` datetime DEFAULT NULL,
  `converted_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `relationship_manager_id` (`relationship_manager_id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `leads_ibfk_1` FOREIGN KEY (`relationship_manager_id`) REFERENCES `relationship_managers` (`id`),
  CONSTRAINT `leads_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `lead_contact_details` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leads`
--

LOCK TABLES `leads` WRITE;
/*!40000 ALTER TABLE `leads` DISABLE KEYS */;
INSERT INTO `leads` VALUES (1,1,'John Doe','Website',1,'Initial contact message',NULL,'Contacted',NULL,'Medium',NULL,NULL,'2024-05-24 17:56:02','2024-05-24 18:05:08',1),(2,2,'Jane Smith','Referral',2,'Call Repeat',NULL,'Qualified',NULL,'High',NULL,NULL,'2024-05-24 18:04:27','2024-05-24 18:14:24',1);
/*!40000 ALTER TABLE `leads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship_managers`
--

DROP TABLE IF EXISTS `relationship_managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationship_managers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship_managers`
--

LOCK TABLES `relationship_managers` WRITE;
/*!40000 ALTER TABLE `relationship_managers` DISABLE KEYS */;
INSERT INTO `relationship_managers` VALUES (1,'John Smith','1234567890','john.smith@company.com','2024-05-24 15:31:46','2024-05-24 15:32:33',1),(2,'Jane Doe','9876543210','jane.doe@company.com','2024-05-24 15:31:52','2024-05-24 15:32:33',1);
/*!40000 ALTER TABLE `relationship_managers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;