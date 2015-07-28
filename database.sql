CREATE TABLE `adt_alerts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `dateCreated` varchar(64) DEFAULT NULL,
  `alert` varchar(32) DEFAULT NULL,
  `zone` varchar(32) DEFAULT NULL,
  `location` varchar(64) DEFAULT NULL,
  `zone_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;