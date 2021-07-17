CREATE TABLE `Users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `display_name` TEXT NOT NULL,
    `login` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `global_role` INT NOT NULL,
    `compagny_id` INT NOT NULL,
    `compagny_role` INT NOT NULL,
    `total_salary` INT NOT NULL,
    `phone` TEXT NOT NULL,
    `bank_acc` TEXT NOT NULL,
    `arrival_date` TEXT NOT NULL,
    `discord_id` BIGINT NOT NULL
);
CREATE TABLE `Global_roles`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `display_name` TEXT NOT NULL
);
CREATE TABLE `Compagny_roles`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `display_name` TEXT NOT NULL,
    `salary` INT NOT NULL
);
CREATE TABLE `Compagny`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `display_name` TEXT NOT NULL,
    `owner_id` INT NOT NULL,
    `turnover` INT NOT NULL,
    `capital` INT NOT NULL,
    `guild_id` BIGINT NOT NULL
);
CREATE TABLE `Vehicles`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `plate` TEXT NOT NULL,
    `type` INT NOT NULL
);
CREATE TABLE `Vehicles_types`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `display_name` TEXT NOT NULL
);
CREATE TABLE `Runs`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `driver` INT NOT NULL,
    `date` TEXT NOT NULL,
    `vehicle` INT NOT NULL,
    `amount` INT NOT NULL,
    `proof` TEXT NOT NULL,
    `state` INT NOT NULL,
    `comment` TEXT NULL
);
CREATE TABLE `Run_state`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `display_name` TEXT NOT NULL
);
CREATE TABLE `Transaction`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `destination` INT NOT NULL,
    `amount` INT NOT NULL,
    `label` TEXT NOT NULL,
    `type` INT NOT NULL
);
CREATE TABLE `Transaction_types`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `display_name` TEXT NOT NULL
);
CREATE TABLE `Recurrent_bill`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` INT NOT NULL,
    `amount` INT NOT NULL,
    `registering_date` TEXT NOT NULL,
    `comment` TEXT NOT NULL
);
CREATE TABLE `Recurrent_types`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `display_name` TEXT NOT NULL
);

/* -- VEHICLES TYPES -- */
INSERT INTO `vehicles_types` (`display_name`) VALUES ("Speedo");
INSERT INTO `vehicles_types` (`display_name`) VALUES ("Pounder");

/*-- GLOBAL ROLES -- */
INSERT INTO `global_roles` (`display_name`) VALUES ("Administrateur");
INSERT INTO `global_roles` (`display_name`) VALUES ("Inspecteur");
INSERT INTO `global_roles` (`display_name`) VALUES ("Utilisateur");

/* -- COMPAGNY ROLES -- */
INSERT INTO `compagny_roles` (`display_name`, `salary`) VALUES ("PDG", 0);
INSERT INTO `compagny_roles` (`display_name`, `salary`) VALUES ("DRH", 0);
INSERT INTO `compagny_roles` (`display_name`, `salary`) VALUES ("Employé CDI", 0);
INSERT INTO `compagny_roles` (`display_name`, `salary`) VALUES ("Employé CDD", 0);

/* -- TRANSACTION TYPES -- */
INSERT INTO `transaction_types` (`display_name`) VALUES ("Débit");
INSERT INTO `transaction_types` (`display_name`) VALUES ("Crédit");

/* -- RUN STATES -- */
INSERT INTO `run_state` (`display_name`) VALUES ("Validé");
INSERT INTO `run_state` (`display_name`) VALUES ("Refusé");
INSERT INTO `run_state` (`display_name`) VALUES ("En vérification");
