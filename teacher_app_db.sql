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
  `foto` LONGTEXT NOT NULL,
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
  `especialidades_id` INT NOT NULL,
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

INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Paula', 'Fortuna', 'paulafortuna@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://canalsalud.imq.es/hubfs/crisis%20identidad%20adolescentes.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Laura', 'Canal', 'lauracanal@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://blog.up.edu.mx/hs-fs/hubfs/young-beautiful-brunette-businesswoman-smiling-pointing-finger-side.jpg?width=1199&height=709&name=young-beautiful-brunette-businesswoman-smiling-pointing-finger-side.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Juan', 'Gonzalez', 'juangonzalez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://raisingchildren.net.au/__data/assets/image/0016/48040/brain-development-teenagers.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Agustina', 'Fernandez', 'agustinafernandez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://www.gaesjunior.com/uploads/imgen/117_940x540-imgen-117-adolescente-oido.webp', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Vanesa', 'Lores', 'vanesalores@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://mejorconsalud.as.com/wp-content/uploads/2021/07/adolescente-mira-celular.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Jorge', 'Vanegas', 'jorgevanegas@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://s2.abcstatics.com/media/familia/2019/06/12/ADOLESCENTES-kT0B--620x349@abc.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Santiago', 'Escolano', 'santiagoescolano@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://as2.ftcdn.net/v2/jpg/02/59/50/85/1000_F_259508500_pCY5LxlMhoSO9QFDAiJOGiWeym9p5oql.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Alberto', 'Martin', 'albertomartin@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://www.etapainfantil.com/wp-content/uploads/2022/06/adolescente-sin-amistades.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Alejandro', 'Márquez', 'alejandromarquez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://familyon.es/wp-content/uploads/2020/05/adolescente-ted.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('José', 'Pérez', 'joseperez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://pymstatic.com/57972/conversions/ser-adolescente-hoy-realmente-ha-cambiado-tanto-social.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Agustin', 'Gonzalez', 'agustingonzalez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/adolescente_rebeldeok.jpg.webp?itok=qP4JJIpa', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Liliana', 'Lillo', 'lilianalillo@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://uvn-brightspot.s3.amazonaws.com/assets/vixes/btg/curiosidades.batanga.com/files/Hasta-que-edad-se-es-adolescente-1.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Manuel', 'Martin', 'manuelmartin@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://www.conmishijos.com/uploads/educacion/autoestimapositiva.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Maria', 'Núñez', 'marianunez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://s1.abcstatics.com/media/familia/2020/07/21/adolescentedesganada-koUE--1248x698@abc.jpg', 'alumn', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Alejandro', 'Gómez', 'alejandrogomez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://mensalus.es/wp-content/uploads/2016/06/dialogar-con-adolescente.jpg', 'alumn', '645982647', '1');

INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Julieta', 'Hernandez', 'julietahernandez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://www.teacheracademy.eu/wp-content/uploads/2021/10/successful-teacher-1.jpg', 'prof', '645982647', '1',40,20,40.452921,-3.673397);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Laura', 'Vázquez', 'lauravazquez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://resilienteducator.com/wp-content/uploads/2014/11/math-teacher.jpg', 'prof', '645982647', '1',25,10,40.409671,-3.792186);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Juan', 'Martin', 'juanmartin@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://gsep.pepperdine.edu/blog/images/how-much-could-a-masters-degree-increase-your-teaching-salary.png', 'prof', '645982647', '1',30,15,40.435807, -3.649536);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Agostina', 'Lillo', 'agostinalillo@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://wpvip.edutopia.org/wp-content/uploads/2022/10/alber-169hero-thelook-shutterstock_0.jpg?w=2880&quality=85', 'prof', '645982647', '1',40,20,40.441556, -3.714767);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Leonor', 'Gonzalez', 'leonorgonzalez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://www.schoolnetindia.com/blog/wp-content/uploads/2022/05/What-are-the-Different-Types-of-Teacher-Training-Programs.jpg', 'prof', '645982647', '1',15,5,40.477878, -3.697967);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Leopoldo', 'Vanegas', 'leopoldovanegas@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://www.purdueglobal.edu/blog/education/elementary-school-teacher.jpeg', 'prof', '645982647', '1',45,25,40.421163, -3.676361);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Ariel', 'Gómez', 'arielgomez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://www.thoughtco.com/thmb/DxY6FajGtwIuqZSYi6w_awZ2Wy8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/dv1940073-56a9397e3df78cf772a4ec5c.jpg', 'prof', '645982647', '1',40,20,40.404822, -3.708500);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Javier', 'Fernandez', 'javierfernandez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://www.allisonacademy.com/wp-content/uploads/2021/12/Teacher-in-the-classroom.jpg', 'prof', '645982647', '1',30,10,40.376319, -3.707813);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Martin', 'Reimundo', 'martinreimundo@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://www.marjon.ac.uk/media/2020-website-media/guides/20190116-0C9A7554.jpg', 'prof', '645982647', '0',20,15,40.388611, -3.738712);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('José María', 'Gonzalez Lebrón', 'josemgonzalezl@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://iowacapitaldispatch.com/wp-content/uploads/2023/03/math-teacher-at-blackboard-1024x680.jpg', 'prof', '645982647', '0',34.50,20,40.439061, -3.720173);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Leonardo', 'Esquivel Gómez', 'leonardoesquivelg@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://www.talkspace.com/blog/wp-content/uploads/2022/09/pexels-yan-krukov-8617742-1-1-800x500.jpg', 'prof', '645982647', '0',35.50,24,40.403776, -3.675197);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('María Rosa', 'Fernandez de Paniagua', 'mrosafernandez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://cdn.aarp.net/content/dam/aarp/about_aarp/nrta/2016/1140-nrta-overall-banner-teacher-portrait.imgcache.rev.web.1100.633.jpg', 'prof', '645982647', '0',23.50,13,40.412403, -3.656315);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Maria Luisa', 'Serafin', 'mluisaserafil@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://opuspeoplesolutions.co.uk/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMG1jSFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--ff76dc3e37c2b0a25095c3d0622f0ed47e55ed7c/Blog%20Pic%20(1).png', 'prof', '645982647', '0',15.40,26,40.434357, -3.701118);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Montaña', 'Núñez de Balboa', 'montananunezdebalboa@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://www.workitdaily.com/media-library/a-young-teacher-grades-an-assignment-from-one-of-her-students.jpg?id=22146397&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C1', 'prof', '645982647', '0',27.80,28,40.394494, -3.667816);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`,`pxh`,`experiencia`,`lat`,`lon`) VALUES ('Francisco', 'Ruiz Jimenez', 'franciscoruizjimenez@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://i.cbc.ca/1.6724242.1674694774!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/thirugnanasambanthar-thirukkumaran.jpg', 'prof', '645982647', '0',43,29,40.413056, -3.712276);
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `foto`, `rol`, `tel`, `activo`) VALUES ('Maria Noel', 'Morando Maffeis', 'maria@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'https://pxb.cdn.diariohuarpe.com/huarpe/062020/1593557169978.webp?extw=jpg', 'admin', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `rol`, `tel`, `activo`) VALUES ('Adrián', 'Vicaria Canton', 'adrian@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'admin', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `rol`, `tel`, `activo`) VALUES ('Alejandro', 'Picó Sala', 'alejandro@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'admin', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `rol`, `tel`, `activo`) VALUES ('Mar', 'Altaba Rosas', 'mar@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'admin', '645982647', '1');
INSERT INTO `teacherapp`.`usuarios` (`nombre`, `apellidos`, `mail`, `pass`, `rol`, `tel`, `activo`) VALUES ('Jorge', 'Muñiz Tarrio', 'jorge@gmail.com', '$2a$08$GWbc7/feDJ7UKW4H6zP8jOvELZokFLrC.a9EQ2y5z.8XVwAOV17Gu', 'admin', '645982647', '1');

INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Historia', 'https://www.kcl.ac.uk/ImportedImages/Schools/SSPP/Warstudies/WarStudies/cgsIMAGES/adventure-ancient-antique-697662.x88fbe810.jpg?w=780&h=519&crop=780,440,0,40');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Análisis de datos', 'https://www.dqsconsulting.com/wp-content/uploads/2021/09/como-hacer-un-analisis-de-datos.jpg');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Biología', 'https://www.bolton.ac.uk/assets/What-is-Medical-Biology-Bolton-Uni__ResizedImageWzYwMCwzMzhd.jpg');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Geología', 'https://concepto.de/wp-content/uploads/2019/08/geologia-ciencia-suelo-tierra-e1566779853953.jpg');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Física', 'https://okdiario.com/img/2017/02/01/fisica-fuerzas-fundamentales-655x368.jpeg');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Química', 'https://api.new.buscatuprofesor.es/news_image/Ql/RE/QlREvqSO7VMBp9RXFYNpkeyebgA7D40L1VqORGqB.jpg');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Tecnología', 'https://www.eltiempo.com/files/image_1200_680/uploads/2019/12/07/5dec47012d257.jpeg');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Latín', 'https://fundacioncomillas.es/wp-content/uploads/2023/06/tablilla-en-latin.jpg');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Álgebra', 'https://dropinblog.net/34249715/files/featured/algebra_que_es.jpg');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Lengua', 'https://sanjuanbosco.es/wp-content/uploads/2021/04/lengua3.jpg');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Inglés', 'https://www.britishcouncil.org.mx/sites/default/files/banderas_ingles_britanico_y_americano_.png');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Arte', 'https://media.admagazine.com/photos/618a6acacc7069ed5077ca7c/16:9/w_2560%2Cc_limit/69052.jpg');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Informática', 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2019/07/origen-nombres-informatica-nunca-hubieras-imaginado_2.jpg?tf=3840x');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Cálculo', 'https://media.tutellus.com/libraries/45/01/lib/1370151995235.jpg?size=854x493s&ext=jpg');
INSERT INTO `teacherapp`.`especialidades` (`especialidad`, `foto`) VALUES ('Música', 'https://concepto.de/wp-content/uploads/2020/03/musica-e1584123209397.jpg');

INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('16', '15', '0', '1');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('16', '14', '0', '2');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('17', '14', '0', '2');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('17', '13', '0', '3');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('18', '13', '0', '3');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('18', '12', '0', '4');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('19', '12', '0', '4');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('19', '11', '0', '5');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('20', '11', '0', '5');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('20', '10', '0', '6');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('21', '10', '0', '6');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('21', '9', '0', '7');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('22', '9', '0', '7');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('22', '8', '0', '8');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('23', '8', '0', '8');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('23', '7', '0', '9');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('24', '7', '0', '9');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('24', '6', '0', '10');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('25', '6', '0', '10');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('25', '5', '0', '11');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('26', '5', '0', '11');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('26', '4', '0', '12');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('27', '4', '0', '12');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('27', '3', '0', '13');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('28', '3', '0', '13');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('28', '2', '0', '14');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('29', '2', '0', '14');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('29', '1', '0', '1');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('30', '1', '0', '15');
INSERT INTO `teacherapp`.`conexion` (`profesor_id`, `alumno_id`, `activo`, `especialidades_id`) VALUES ('30', '15', '0', '2');

INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('16', '1');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('16', '2');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('16', '3');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('17', '2');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('17', '3');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('17', '4');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('18', '3');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('18', '4');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('18', '5');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('19', '4');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('19', '5');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('19', '6');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('20', '5');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('20', '6');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('20', '7');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('21', '6');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('21', '7');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('21', '8');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('22', '7');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('22', '8');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('22', '9');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('23', '8');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('23', '9');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('23', '10');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('24', '9');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('24', '10');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('24', '11');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('25', '10');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('25', '11');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('25', '12');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('26', '11');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('26', '12');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('26', '13');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('27', '12');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('27', '13');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('27', '14');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('28', '13');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('28', '14');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('28', '15');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('29', '14');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('29', '1');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('29', '2');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('30', '15');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('30', '1');
INSERT INTO `teacherapp`.`usuarios_has_especialidades` (`profesor_id`, `especialidades_id`) VALUES ('30', '2');







