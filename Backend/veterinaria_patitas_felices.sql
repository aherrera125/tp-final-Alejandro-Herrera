-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 04-02-2026 a las 23:54:00
-- Versión del servidor: 8.0.44
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*EJERCICIO 1 - Crear Base de Datos*/
CREATE DATABASE IF NOT EXISTS veterinaria_patitas_felices;
USE veterinaria_patitas_felices;

-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!40101 SET NAMES utf8mb4 */;

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
  `direccion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `duenos`
--

INSERT INTO `duenos` (`id`, `nombre`, `apellido`, `telefono`, `direccion`) VALUES
(1, 'Juan Carlos', 'Medina', '3815153426', 'Av. Roca 1258'),
(2, 'Miguel', 'Flores', '3814852456', 'Silvano Bores 542'),
(3, 'Marcela Luz', 'Quintero', '3813789123', 'Calle de Barcelona 1041');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_clinico`
--

CREATE TABLE `historial_clinico` (
  `id` int NOT NULL,
  `id_mascota` int NOT NULL,
  `id_veterinario` int NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `historial_clinico`
--

INSERT INTO `historial_clinico` (`id`, `id_mascota`, `id_veterinario`, `fecha_registro`, `descripcion`) VALUES
(1, 3, 2, '2024-02-02 00:00:00', 'Tratamiento completado'),
(2, 3, 1, '2025-08-01 00:00:00', 'Traumatismo de craneo'),
(3, 2, 3, '2023-12-15 00:00:00', 'Hemorragia intestinal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int NOT NULL,
  `id_dueno` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `especie` varchar(30) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `id_dueno`, `nombre`, `especie`, `fecha_nacimiento`) VALUES
(1, 1, 'Rocco Rodolfo', 'perro', '2020-05-14'),
(2, 2, 'Alvin Martin', 'Conejo', '2023-08-03'),
(3, 3, 'Mike Morel', 'gato', '2018-10-25');

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
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'testuser', 'test@example.com', '$2b$10$sVVMzD8RdA2ziTnzI3c86uzB5p91i3L2J4q3KWqCHh1ZFzpoNZ0dW', '2026-02-02 00:07:04', '2026-02-02 00:07:04');

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
(1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinarios`
--

CREATE TABLE `veterinarios` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `matricula` varchar(20) NOT NULL,
  `especialidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `veterinarios`
--

INSERT INTO `veterinarios` (`id`, `nombre`, `apellido`, `matricula`, `especialidad`) VALUES
(1, 'Lucia', 'Padilla', 'vt25468', 'Cirugía Veterinaria'),
(2, 'Ignacio', 'Corbalan', 'vt852456', 'Oncología'),
(3, 'Paula', 'Albarracin', 'vt789651', 'Clínica general');

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
  ADD KEY `id_mascota` (`id_mascota`),
  ADD KEY `id_veterinario` (`id_veterinario`);

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
-- Indices de la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricula` (`matricula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `duenos`
--
ALTER TABLE `duenos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  ADD CONSTRAINT `historial_clinico_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_clinico_ibfk_2` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinarios` (`id`) ON DELETE CASCADE;

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

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
