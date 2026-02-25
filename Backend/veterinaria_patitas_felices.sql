-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 25-02-2026 a las 02:46:12
-- Versión del servidor: 8.0.44
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--# Base de datos: `veterinaria_patitas_felices`
CREATE DATABASE IF NOT EXISTS veterinaria_patitas_felices;
USE veterinaria_patitas_felices;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veterinaria_patitas_felices`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `duenos`
--

CREATE TABLE `duenos` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `duenos`
--

INSERT INTO `duenos` (`id`, `nombre`, `apellido`, `telefono`, `direccion`, `estado`) VALUES
(1, 'Juan Carlos', 'Medina', '3815153426', 'Av. Roca 1258', 1),
(2, 'Miguel', 'Flores', '3814852456', 'Silvano Bores 542', 1),
(3, 'Marcela Luz', 'Quintero', '3813789123', 'Calle de Barcelona 1041', 1),
(8, 'Julio', 'Perez', '123456789', 'Calle Falsa 123', 1),
(9, 'Sandra', 'Herrera', '3815456852', 'Fortunata Garcia 1449', 1),
(10, 'Sandra', 'Herrera', '3815456852', 'Fortunata Garcia 1449', 1),
(11, 'Sandra', 'Herrera', '3815456852', 'Fortunata Garcia 1449', 1),
(12, 'Sandra', 'Herrera', '3815456852', 'Fortunata Garcia 1449', 1),
(13, 'Sandra', 'Herrera', '3815456852', 'Fortunata Garcia 1449', 1),
(14, 'Sandra', 'Herrera', '3815456852', 'Fortunata Garcia 1449', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_clinico`
--

CREATE TABLE `historial_clinico` (
  `id` int NOT NULL,
  `id_mascota` int NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcion` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `id_user` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `historial_clinico`
--

INSERT INTO `historial_clinico` (`id`, `id_mascota`, `fecha_registro`, `descripcion`, `status`, `id_user`) VALUES
(1, 3, '2024-02-02 00:00:00', 'Tratamiento completado', 1, 1),
(2, 3, '2025-08-01 00:00:00', 'Traumatismo de craneo', 1, 2),
(3, 2, '2023-12-15 00:00:00', 'Hemorragia intestinal', 1, 3),
(4, 2, '2026-02-16 00:00:00', 'Infeccion urinaria', 1, 4),
(5, 1, '2026-02-17 16:47:43', 'Consulta por vacunaci�n', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int NOT NULL,
  `id_dueno` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `especie` varchar(30) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `estado` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `id_dueno`, `nombre`, `especie`, `fecha_nacimiento`, `estado`) VALUES
(1, 1, 'Rocco Rodolfo', 'perro', '2020-05-14', 1),
(2, 2, 'Alvin Martin', 'Conejo', '2023-08-03', 1),
(3, 3, 'Mike Morel', 'gato', '2018-10-25', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `especialidad` varchar(50) DEFAULT NULL,
  `matricula` varchar(50) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`, `nombre`, `apellido`, `especialidad`, `matricula`, `status`) VALUES
(1, 'testuser', 'test@example.com', '$2b$10$sVVMzD8RdA2ziTnzI3c86uzB5p91i3L2J4q3KWqCHh1ZFzpoNZ0dW', '2026-02-02 00:07:04', '2026-02-02 00:07:04', 'Alejandro', 'Herrera', 'cardiologo', 'cad123', 1),
(2, 'lrosales', 'lourdes.rosales@patitasfelices.com', '$2b$10$7MvxIZqlR1qFhPi2lqPgpOSdprFFH.0l7FA4nXoDvMsu2S8nPHHj2', '2026-02-15 01:07:30', '2026-02-15 01:07:30', 'Lourdes', 'Rosales', 'oncologia', 'qwe555', 1),
(3, 'jherrera', 'jose.herrera@patitasfelices.com', '$2b$10$m./r6HXBA1Dg.ldJiNTgSeqjQGwYqFFIbjhF98.uWQMMoYm27mK9m', '2026-02-15 01:31:33', '2026-02-15 01:31:33', 'Jose', 'Herrera', 'Cirugia', 'vte123', 1),
(4, 'fzelaya', 'franco.zelaya@patitasfelices.com', '$2b$10$slQBC0UuoQrLriF2SD.wVOlLiWtpawpbxv30M9alpOHKxSfZealWa', '2026-02-15 01:43:01', '2026-02-15 01:43:01', 'Franco', 'Zelaya', 'Instrumentista', 'xyz223', 1),
(5, 'lluna', 'luis.luna@patitasfelices.com', '$2b$10$qJcDMPCpw1afXq7svaDimua9BHnf9C6Sjs.uYqbKL63/AOi6fwonu', '2026-02-15 02:18:59', '2026-02-15 02:18:59', 'Luis', 'Luna', 'Clinico', 'abc23', 1);

--
-- Disparadores `users`
--
DELIMITER $$
CREATE TRIGGER `assign_user_role` AFTER INSERT ON `users` FOR EACH ROW BEGIN
  DECLARE userRoleId INT;

  -- Buscar ID del rol 'user'
  SELECT id INTO userRoleId FROM roles WHERE name = 'user' LIMIT 1;

  -- Si lo encontró, insertamos
  IF userRoleId IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role_id) VALUES (NEW.id, userRoleId);
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `duenos`
--
ALTER TABLE `duenos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mascota` (`id_mascota`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_dueno` (`id_dueno`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `duenos`
--
ALTER TABLE `duenos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  ADD CONSTRAINT `historial_clinico_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`id_dueno`) REFERENCES `duenos` (`id`);

--
-- Filtros para la tabla `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
