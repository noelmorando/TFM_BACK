-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema teacherapp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema teacherapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `teacherapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `teacherapp` ;

-- -----------------------------------------------------
-- Table `teacherapp`.`especialidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`especialidades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `especialidad` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `teacherapp`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(60) NOT NULL,
  `mail` VARCHAR(50) NOT NULL,
  `pass` TEXT(255) NOT NULL,
  `foto` LONGTEXT NULL,
  `rol` ENUM('admin', 'prof', 'alumn') NOT NULL,
  `tel` VARCHAR(20) NULL,
  `pxh` FLOAT NULL,
  `experiencia` INT NULL,
  `lat` FLOAT NULL DEFAULT NULL,
  `lon` FLOAT NULL DEFAULT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `teacherapp`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`chat` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `profesor_id` INT NOT NULL,
  `alumno_id` INT NOT NULL,
  `fecha` DATE NOT NULL DEFAULT (DATE(CURRENT_TIMESTAMP)),
  `comentarios` LONGTEXT NOT NULL,
  INDEX `fk_usuarios_has_usuarios_usuarios2_idx` (`alumno_id` ASC),
  INDEX `fk_usuarios_has_usuarios_usuarios1_idx` (`profesor_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios1`
    FOREIGN KEY (`profesor_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios2`
    FOREIGN KEY (`alumno_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `teacherapp`.`puntuaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`puntuaciones` (
  `profesor_id` INT NOT NULL,
  `alumno_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL DEFAULT (DATE(CURRENT_TIMESTAMP)),
  `puntuacion` INT NOT NULL,
  `comentarios` LONGTEXT NULL,
  INDEX `fk_usuarios_has_usuarios_usuarios4_idx` (`alumno_id` ASC),
  INDEX `fk_usuarios_has_usuarios_usuarios3_idx` (`profesor_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios3`
    FOREIGN KEY (`profesor_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios4`
    FOREIGN KEY (`alumno_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `teacherapp`.`clases`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`clases` (
  `profesor_id` INT NOT NULL,
  `alumno_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` VARCHAR(10) NOT NULL,
  `especialidades_id` INT NOT NULL,
  INDEX `fk_usuarios_has_usuarios_usuarios6_idx` (`alumno_id` ASC),
  INDEX `fk_usuarios_has_usuarios_usuarios5_idx` (`profesor_id` ASC),
  PRIMARY KEY (`id`),
  INDEX `fk_clases_especialidades1_idx` (`especialidades_id` ASC),
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios5`
    FOREIGN KEY (`profesor_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios6`
    FOREIGN KEY (`alumno_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_clases_especialidades1`
    FOREIGN KEY (`especialidades_id`)
    REFERENCES `teacherapp`.`especialidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `teacherapp`.`conexion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`conexion` (
  `profesor_id` INT NOT NULL,
  `alumno_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `activo` TINYINT NOT NULL DEFAULT 0,
  INDEX `fk_usuarios_has_usuarios_usuarios8_idx` (`alumno_id` ASC),
  INDEX `fk_usuarios_has_usuarios_usuarios7_idx` (`profesor_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios7`
    FOREIGN KEY (`profesor_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_usuarios_usuarios8`
    FOREIGN KEY (`alumno_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `teacherapp`.`usuarios_has_especialidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacherapp`.`usuarios_has_especialidades` (
  `profesor_id` INT NOT NULL,
  `especialidades_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  INDEX `fk_usuarios_has_especialidades_especialidades1_idx` (`especialidades_id` ASC),
  INDEX `fk_usuarios_has_especialidades_usuarios1_idx` (`profesor_id` ASC),
  CONSTRAINT `fk_usuarios_has_especialidades_usuarios1`
    FOREIGN KEY (`profesor_id`)
    REFERENCES `teacherapp`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_especialidades_especialidades1`
    FOREIGN KEY (`especialidades_id`)
    REFERENCES `teacherapp`.`especialidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
