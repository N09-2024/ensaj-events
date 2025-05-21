-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 21 mai 2025 à 19:40
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `events`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `location` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `start_date`, `end_date`, `location`, `image`, `capacity`, `created_at`, `updated_at`) VALUES
(17, 'Fête de fin d’année ENSAJ', 'Spectacle, musique, remise de prix, ambiance conviviale.', '2025-06-01 18:20:00', '2025-06-05 18:20:00', 'ENSAJ', 'events/LifI6n5JwvsVDV1aTu1CA6rw2ADMgecsJNUZIClB.jpg', 299, '2025-05-21 16:21:41', '2025-05-21 16:21:41'),
(16, 'Ensaj Tour', 'Découvrez avec nous ENSAJ', '2025-05-26 10:00:00', '2025-05-26 15:00:00', 'ENSAJ', 'events/mxNwS1vcaphoh2MWFEx7rfNifXtDqgoWs9QBlkvS.jpg', 100, '2025-05-21 13:06:55', '2025-05-21 13:06:55'),
(12, 'hgf', 'QSDFG', '2025-05-20 16:40:00', '2025-05-20 16:41:00', 'casa', 'events/oo7QkciS6pXtrZcDbiLMlo4rnp1zy6TROOKc4dQt.jpg', 234, '2025-05-20 14:41:04', '2025-05-20 14:41:04');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_05_12_222201_create_personal_access_tokens_table', 1),
(5, '2025_05_12_222436_add_role_to_users_table', 2),
(6, '2025_05_14_174637_create_events_table', 3);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'API Token', '6435cb3272b66fe0b69646b09eb347e0c24e992411d0303387db52e72c8ee8f5', '[\"*\"]', NULL, NULL, '2025-05-12 21:48:40', '2025-05-12 21:48:40'),
(2, 'App\\Models\\User', 1, 'API Token', '272fb63d55a37d5e509abafd46330ebc7595acd54e5a4c5df26340e995d857e3', '[\"*\"]', NULL, NULL, '2025-05-12 21:53:29', '2025-05-12 21:53:29'),
(3, 'App\\Models\\User', 1, 'API Token', '9ad95b503f5ac3324327069cb41813b51dba8260d4d3419a35f798b00ea94d6b', '[\"*\"]', NULL, NULL, '2025-05-12 21:54:08', '2025-05-12 21:54:08'),
(4, 'App\\Models\\User', 1, 'API Token', '0db257431b51da96634d59272a9797fd665371c3263d1a522b4d1c344c40b847', '[\"*\"]', NULL, NULL, '2025-05-12 21:55:42', '2025-05-12 21:55:42'),
(5, 'App\\Models\\User', 1, 'API Token', 'f6d3a02cadda3c60760778a03d32292eac5aab755744c451851c166876d5ca1e', '[\"*\"]', NULL, NULL, '2025-05-12 22:26:52', '2025-05-12 22:26:52'),
(6, 'App\\Models\\User', 1, 'API Token', '6a203a676fdb3fee3f82ebaf199620077d32992e58dc5a7a0006f062558cb318', '[\"*\"]', NULL, NULL, '2025-05-12 22:37:33', '2025-05-12 22:37:33'),
(7, 'App\\Models\\User', 1, 'API Token', 'fa5df75812dcbe588887daaebc04d392feabe64085b5dcc914099bcee637ba36', '[\"*\"]', NULL, NULL, '2025-05-12 22:40:05', '2025-05-12 22:40:05'),
(8, 'App\\Models\\User', 1, 'API Token', '616163333c52846b128724c2b3ff0336e39d4abcdc35b03dca0e8d3dd58eb5bb', '[\"*\"]', NULL, NULL, '2025-05-12 22:42:59', '2025-05-12 22:42:59'),
(15, 'App\\Models\\User', 2, 'API Token', 'b9068dc1d11273e1a42cdec6f32b9fd239ead53cf04f5f4ac76e8052459423c7', '[\"*\"]', NULL, NULL, '2025-05-13 19:50:29', '2025-05-13 19:50:29'),
(10, 'App\\Models\\User', 1, 'API Token', 'fa6cd12bfb70ae41565006f0e50b7dd542e375d515e7faf6c8cfefd0bb556a15', '[\"*\"]', NULL, NULL, '2025-05-13 18:22:11', '2025-05-13 18:22:11'),
(16, 'App\\Models\\User', 2, 'API Token', 'aaa59d5dbed9fe733bfcdb8234ae6d8e05e7c712d9ac6a45f77dc4534b4cb57a', '[\"*\"]', '2025-05-13 19:53:00', NULL, '2025-05-13 19:51:25', '2025-05-13 19:53:00'),
(17, 'App\\Models\\User', 2, 'API Token', '95bc530dfa38205da393b416423fc45c9a1d4b643a20d4856278a03b2c64404b', '[\"*\"]', NULL, NULL, '2025-05-13 19:57:02', '2025-05-13 19:57:02'),
(23, 'App\\Models\\User', 1, 'API Token', 'e0d9d26dbaa0574ae5d036e334698801108962dd2b921bc92189aee3a8b1ea7b', '[\"*\"]', NULL, NULL, '2025-05-13 21:12:10', '2025-05-13 21:12:10'),
(32, 'App\\Models\\User', 1, 'API Token', '86d2302290deed0a445998ec10cc85aedc8074c0b8d8731305350aad3ca81585', '[\"*\"]', '2025-05-13 23:23:45', NULL, '2025-05-13 23:11:36', '2025-05-13 23:23:45'),
(27, 'App\\Models\\User', 1, 'API Token', 'bf1ad1f8628683b786fa0b35032f80dc6860e0e07067e8bd1c0389d155db523b', '[\"*\"]', '2025-05-13 22:38:37', NULL, '2025-05-13 22:35:59', '2025-05-13 22:38:37'),
(28, 'App\\Models\\User', 1, 'API Token', 'c52ca59c373d28b4ff3cc4d6de9d11f2c1ff099fdec70bea9e53e5878656122a', '[\"*\"]', NULL, NULL, '2025-05-13 22:48:25', '2025-05-13 22:48:25'),
(31, 'App\\Models\\User', 1, 'API Token', 'c67193d478fac8b8837dae72e0f87848aef6a74f55b0ddd1a17925a66af740c0', '[\"*\"]', NULL, NULL, '2025-05-13 23:08:16', '2025-05-13 23:08:16'),
(33, 'App\\Models\\User', 1, 'API Token', 'fec51411fe99cb0cc96d1f7498cdcd980488aa7b3e1ab50f6f406abc09825411', '[\"*\"]', NULL, NULL, '2025-05-14 08:29:34', '2025-05-14 08:29:34'),
(34, 'App\\Models\\User', 1, 'API Token', 'f4cbb11c884b404bee0138487c635fbaed7edc612c5069a2d77fc5759ae4bf55', '[\"*\"]', '2025-05-14 08:33:17', NULL, '2025-05-14 08:33:15', '2025-05-14 08:33:17'),
(35, 'App\\Models\\User', 2, 'API Token', '2760f3558639e7bdb33460a0da49530bdf15340e5ad87ca2ea613270aec6d080', '[\"*\"]', NULL, NULL, '2025-05-14 09:36:23', '2025-05-14 09:36:23'),
(36, 'App\\Models\\User', 1, 'API Token', '51b6ad202a0e47bca2bb22b0540e3a4e2a148662833631dbc8f5b55bc612748a', '[\"*\"]', '2025-05-14 16:56:53', NULL, '2025-05-14 15:06:01', '2025-05-14 16:56:53'),
(37, 'App\\Models\\User', 1, 'API Token', 'b086292d9461a71bfb121f7d7e9fcee79a229cd1f6ae476eba4cd447769efca2', '[\"*\"]', '2025-05-14 19:26:52', NULL, '2025-05-14 17:55:40', '2025-05-14 19:26:52'),
(38, 'App\\Models\\User', 1, 'API Token', '273775b47051abb3c8f1836fbe0d0aa34d056e53a40278fb632aaaef81021b5b', '[\"*\"]', '2025-05-14 19:29:12', NULL, '2025-05-14 19:28:24', '2025-05-14 19:29:12'),
(39, 'App\\Models\\User', 1, 'API Token', '0179084a254a0df7fd8e1cd04d3d21b95a58ce04c716721c1d31a5f7c3fc5621', '[\"*\"]', '2025-05-15 07:00:12', NULL, '2025-05-15 06:42:01', '2025-05-15 07:00:12'),
(41, 'App\\Models\\User', 1, 'API Token', 'd277dc4aae6f455dde2f4f10839db7b6a820e790b14ecb4858ca12ae5c58a4db', '[\"*\"]', '2025-05-15 07:49:31', NULL, '2025-05-15 07:38:35', '2025-05-15 07:49:31'),
(44, 'App\\Models\\User', 1, 'API Token', 'ef205e31600902ee4d8c44f5bcbe74895815122fe681afd15e3aebcff2c45741', '[\"*\"]', '2025-05-17 09:57:57', NULL, '2025-05-17 09:41:55', '2025-05-17 09:57:57'),
(46, 'App\\Models\\User', 2, 'API Token', '3fe901ff1a2bf4deed6be2d4e7542163cb819bd55ffba50388596b9bb14f56de', '[\"*\"]', '2025-05-17 10:11:48', NULL, '2025-05-17 10:10:43', '2025-05-17 10:11:48'),
(47, 'App\\Models\\User', 2, 'API Token', '4d84a3c51a83abb22913fc777547f20aa0248b7f4bc09ec7d9ce2c095125aab8', '[\"*\"]', '2025-05-17 10:12:00', NULL, '2025-05-17 10:11:58', '2025-05-17 10:12:00'),
(48, 'App\\Models\\User', 2, 'API Token', 'e7c1c82ddc90d73e7d89f02a37147a6eec2b89d498f42c82b1ccd8703e85f5a2', '[\"*\"]', '2025-05-17 10:12:16', NULL, '2025-05-17 10:12:14', '2025-05-17 10:12:16'),
(49, 'App\\Models\\User', 2, 'API Token', '9155f95ec63bdd661e1f7d53017caea4e9d8457f768e41ca35a66d546ff5053a', '[\"*\"]', '2025-05-17 10:12:33', NULL, '2025-05-17 10:12:31', '2025-05-17 10:12:33'),
(50, 'App\\Models\\User', 2, 'API Token', 'ca547e0973844a19e1d0a8d0a52f23c154e5403f0f2253225b7328a5a263a786', '[\"*\"]', '2025-05-17 10:12:42', NULL, '2025-05-17 10:12:40', '2025-05-17 10:12:42'),
(51, 'App\\Models\\User', 2, 'API Token', '29a645038286ed0b1959c71ba3627137f21550c2d37a9bae4609044d3496322a', '[\"*\"]', '2025-05-17 10:12:46', NULL, '2025-05-17 10:12:44', '2025-05-17 10:12:46'),
(52, 'App\\Models\\User', 2, 'API Token', '2d56fbe7af1276125d2f016e95fb2239178fb732efa6dda81c4c37ce01e296cc', '[\"*\"]', '2025-05-17 10:15:00', NULL, '2025-05-17 10:14:50', '2025-05-17 10:15:00'),
(53, 'App\\Models\\User', 2, 'API Token', '32ef4f7e53273ceaecc9b9479644a79a0b177494a399abfbd63f6dd1e44e7bb0', '[\"*\"]', '2025-05-17 10:15:12', NULL, '2025-05-17 10:15:11', '2025-05-17 10:15:12'),
(54, 'App\\Models\\User', 2, 'API Token', 'e26d66b66e5388b20b7fb4a00df26c3eaff152cc52b975d956e6f7e8de99f050', '[\"*\"]', '2025-05-17 10:15:23', NULL, '2025-05-17 10:15:22', '2025-05-17 10:15:23'),
(55, 'App\\Models\\User', 2, 'API Token', '4d24ad73d094fa6b3847750f030f310df578352edfb88a2760ba3ce42f679c6a', '[\"*\"]', '2025-05-17 10:15:42', NULL, '2025-05-17 10:15:40', '2025-05-17 10:15:42'),
(57, 'App\\Models\\User', 1, 'API Token', 'ca533150c04df2068ef7af13867712ab8817479040450791a731cdc2e5e246f3', '[\"*\"]', '2025-05-17 10:16:27', NULL, '2025-05-17 10:16:10', '2025-05-17 10:16:27'),
(58, 'App\\Models\\User', 2, 'API Token', 'a1523292aaf96dfc8516bd642bb04672b072c82f273f1ed4b6e22d0f90570019', '[\"*\"]', '2025-05-17 14:18:05', NULL, '2025-05-17 14:18:02', '2025-05-17 14:18:05'),
(59, 'App\\Models\\User', 1, 'API Token', '1dd08a1ca1f0746d8b9198e3e84f6d1fbd2471125a82fc33be4e927881d201f4', '[\"*\"]', '2025-05-17 14:20:35', NULL, '2025-05-17 14:18:25', '2025-05-17 14:20:35'),
(61, 'App\\Models\\User', 1, 'API Token', '1083823ba3ef20d9e1b4756d46ba2f6e4047d4fb3eba6611f73e82fc5a67ee04', '[\"*\"]', '2025-05-17 14:39:03', NULL, '2025-05-17 14:38:38', '2025-05-17 14:39:03'),
(65, 'App\\Models\\User', 2, 'API Token', '2ec2915d82e516d138e35a3498954ee6379a6deb7587c919267e7836244e2a68', '[\"*\"]', '2025-05-17 15:14:29', NULL, '2025-05-17 15:14:28', '2025-05-17 15:14:29'),
(67, 'App\\Models\\User', 1, 'API Token', 'ec5f12554507063b01c223d205f91cd4e972c5b6fafb7252eea71bc6535fb890', '[\"*\"]', '2025-05-17 15:38:33', NULL, '2025-05-17 15:18:09', '2025-05-17 15:38:33'),
(69, 'App\\Models\\User', 2, 'API Token', 'cead58275bcb9dce54f7db45b8460ce366863665645a28a1117720d138f1d06a', '[\"*\"]', '2025-05-17 15:45:38', NULL, '2025-05-17 15:45:37', '2025-05-17 15:45:38'),
(70, 'App\\Models\\User', 1, 'API Token', '9b80ee793d623829902273c93c3242bf7e246f6d8d7204f190a738d595cc5181', '[\"*\"]', '2025-05-17 15:48:40', NULL, '2025-05-17 15:46:10', '2025-05-17 15:48:40'),
(71, 'App\\Models\\User', 1, 'API Token', 'e2ecf3df16ef483409477f4603f7d7325d268850d706708e5d4248000df38049', '[\"*\"]', '2025-05-17 16:43:59', NULL, '2025-05-17 16:33:24', '2025-05-17 16:43:59'),
(72, 'App\\Models\\User', 2, 'API Token', '58596e4833048dd8f6e3fd12755543deb6e919319414034e1457d7343f82b17b', '[\"*\"]', NULL, NULL, '2025-05-17 16:53:11', '2025-05-17 16:53:11'),
(73, 'App\\Models\\User', 2, 'API Token', 'eef6bd8fa2fd71c92821a244f1d893bb0757efb3a93a0bbf831a0961b5e04415', '[\"*\"]', NULL, NULL, '2025-05-17 17:00:08', '2025-05-17 17:00:08'),
(74, 'App\\Models\\User', 1, 'API Token', '6d61bf2db18d6f3e4af092d5635c1dcd2b87b48c022cbbecf40e8ac371743ca3', '[\"*\"]', '2025-05-17 19:51:23', NULL, '2025-05-17 18:07:40', '2025-05-17 19:51:23'),
(76, 'App\\Models\\User', 2, 'API Token', 'e7d7900973efefa13821a4b346a3a79e5ae95f788fcc3b4b20644a3f30468f9d', '[\"*\"]', NULL, NULL, '2025-05-19 15:05:01', '2025-05-19 15:05:01'),
(77, 'App\\Models\\User', 2, 'API Token', '4a576d7c028fa048aea84e65715cf1f41c451f23b5ed634998f543855db1bf3d', '[\"*\"]', '2025-05-19 23:01:11', NULL, '2025-05-19 22:52:37', '2025-05-19 23:01:11'),
(78, 'App\\Models\\User', 2, 'API Token', 'ab888e9fda32bf34c4737e8cd6993b8c8574ddff1611ad4ed1aade9a2a16d897', '[\"*\"]', '2025-05-19 23:01:14', NULL, '2025-05-19 23:01:13', '2025-05-19 23:01:14'),
(79, 'App\\Models\\User', 2, 'API Token', '239e618269d6b80960842b47b349222e3000fbc76c1ae46543d90780d3aa9e71', '[\"*\"]', '2025-05-19 23:01:17', NULL, '2025-05-19 23:01:16', '2025-05-19 23:01:17'),
(80, 'App\\Models\\User', 2, 'API Token', '39f192de5f2b7bf83631c26d23a26e70a6e303da92305b96b2407891d3f06eea', '[\"*\"]', '2025-05-19 23:01:20', NULL, '2025-05-19 23:01:20', '2025-05-19 23:01:20'),
(81, 'App\\Models\\User', 2, 'API Token', 'c2a6195aadf74e6821e4f7eb5242d8bd64a9ecfffe0fc5a20a6fcc45991ce516', '[\"*\"]', '2025-05-19 23:01:26', NULL, '2025-05-19 23:01:25', '2025-05-19 23:01:26'),
(82, 'App\\Models\\User', 2, 'API Token', '44830fb77755b5e3e2e50071602e963d83f49720151f7a5dadc4c15c3444cd0b', '[\"*\"]', '2025-05-19 23:01:45', NULL, '2025-05-19 23:01:44', '2025-05-19 23:01:45'),
(83, 'App\\Models\\User', 2, 'API Token', 'd815437227905cc9c02d1a7466fed024097015e6e6a2d8704c20f7f687f3c497', '[\"*\"]', '2025-05-19 23:02:42', NULL, '2025-05-19 23:02:42', '2025-05-19 23:02:42'),
(85, 'App\\Models\\User', 2, 'API Token', '0a7cfc6500347985043220d2b80a34b50927d1f6e4dcd5dc731fe5ac70d7aa76', '[\"*\"]', '2025-05-19 23:04:17', NULL, '2025-05-19 23:04:16', '2025-05-19 23:04:17'),
(86, 'App\\Models\\User', 2, 'API Token', 'a886296c19e0c973236ad2490b5fd0e439874924e509eded56b108fb6cfba24a', '[\"*\"]', '2025-05-19 23:04:32', NULL, '2025-05-19 23:04:31', '2025-05-19 23:04:32'),
(87, 'App\\Models\\User', 2, 'API Token', '207990b053237db4ff791e47d741e62498e1f406e958873c5af6bcf9876bca89', '[\"*\"]', '2025-05-19 23:04:48', NULL, '2025-05-19 23:04:47', '2025-05-19 23:04:48'),
(88, 'App\\Models\\User', 2, 'API Token', '6f1e2ab39e8c1994dcf8532373d9f60f3bc8241cd9c265243af199d63b794dd5', '[\"*\"]', '2025-05-19 23:05:02', NULL, '2025-05-19 23:05:02', '2025-05-19 23:05:02'),
(89, 'App\\Models\\User', 2, 'API Token', '8ecaa60ebc57d0fdf8b1ee196073abbb0dd87c5b9ca127d85680ee2e3b8d28f5', '[\"*\"]', '2025-05-19 23:05:40', NULL, '2025-05-19 23:05:40', '2025-05-19 23:05:40'),
(94, 'App\\Models\\User', 1, 'API Token', '4bea0b3e0522a3f4b9386b0c7f35a339762ea19f7a1ed323783f36a7773ab994', '[\"*\"]', '2025-05-19 23:39:37', NULL, '2025-05-19 23:38:32', '2025-05-19 23:39:37'),
(95, 'App\\Models\\User', 1, 'API Token', '20d24361fa95425ec0d43529400cd4ca1cd77c34ef28e0e090ee8078058617d8', '[\"*\"]', '2025-05-19 23:47:19', NULL, '2025-05-19 23:44:46', '2025-05-19 23:47:19'),
(98, 'App\\Models\\User', 2, 'API Token', '50c730b40a2898f16baf92e90872bb00b499241ebc8723e72eac8a61d34ac6b7', '[\"*\"]', '2025-05-20 11:10:02', NULL, '2025-05-20 10:58:54', '2025-05-20 11:10:02'),
(99, 'App\\Models\\User', 2, 'API Token', '7c5c826b97525754a9c23a6cbd63fdbc4d40848b5025a6be8fd62a252ab7cc1f', '[\"*\"]', '2025-05-20 11:14:31', NULL, '2025-05-20 11:12:04', '2025-05-20 11:14:31'),
(101, 'App\\Models\\User', 2, 'API Token', '17007aaf2e90abb068d797c5f05b089876a8847cc59856b93a80c967ae28ce0b', '[\"*\"]', '2025-05-20 12:13:03', NULL, '2025-05-20 11:16:21', '2025-05-20 12:13:03'),
(102, 'App\\Models\\User', 2, 'API Token', '716abbf9c2a1f3b401b649155dfba421525e52a1c17dc78ab613af1cfcdc5317', '[\"*\"]', '2025-05-20 12:23:35', NULL, '2025-05-20 12:13:07', '2025-05-20 12:23:35'),
(106, 'App\\Models\\User', 2, 'API Token', '13390b49e8bddcd4f42acc3a18c89c6a8ec73a5951f33edbe295026a2690514f', '[\"*\"]', '2025-05-20 12:27:26', NULL, '2025-05-20 12:27:25', '2025-05-20 12:27:26'),
(107, 'App\\Models\\User', 1, 'API Token', 'd8cb8b54cf79fdc3e0fe2f37b40aa8c254e9ef828fc52395f45d0dbb73d1c545', '[\"*\"]', '2025-05-20 12:28:50', NULL, '2025-05-20 12:27:45', '2025-05-20 12:28:50'),
(110, 'App\\Models\\User', 2, 'API Token', '301d8f90f8e7e41d41ca0e818a4756c7563172a654331a5de5919fd86f653d81', '[\"*\"]', '2025-05-20 14:12:27', NULL, '2025-05-20 14:05:38', '2025-05-20 14:12:27'),
(111, 'App\\Models\\User', 2, 'API Token', '504c17222fbc6150f0e217865bd4c6c45a962064448f740e65f75a3bfd1df2fd', '[\"*\"]', '2025-05-20 14:12:39', NULL, '2025-05-20 14:12:38', '2025-05-20 14:12:39'),
(112, 'App\\Models\\User', 2, 'API Token', '5f4b3ccfc0ea7c687081df3c11150a025268847400a150c543b1c8cbb1de0f92', '[\"*\"]', '2025-05-20 14:19:26', NULL, '2025-05-20 14:19:25', '2025-05-20 14:19:26'),
(114, 'App\\Models\\User', 2, 'API Token', '17d7d0163aea318de22146dc46bf9f8f48056f04a872731747e11df38a4e03e6', '[\"*\"]', '2025-05-20 14:39:44', NULL, '2025-05-20 14:39:43', '2025-05-20 14:39:44'),
(116, 'App\\Models\\User', 2, 'API Token', '0441e621991a06af4a2aa3b762a378a37083dff4aafcd9cc574620afe6552c27', '[\"*\"]', '2025-05-20 18:53:15', NULL, '2025-05-20 14:41:29', '2025-05-20 18:53:15'),
(117, 'App\\Models\\User', 2, 'API Token', '3ef766f1944c8f8464461e7e2d4fee77b2bfd2e5656f5e686f4b3c235747068e', '[\"*\"]', '2025-05-20 18:53:33', NULL, '2025-05-20 18:53:32', '2025-05-20 18:53:33'),
(119, 'App\\Models\\User', 2, 'API Token', '4a4f1f4f5da5b272e67a588d4f75d426bdf98045f328008356c2c02dfbab4a2c', '[\"*\"]', '2025-05-20 19:14:33', NULL, '2025-05-20 18:57:18', '2025-05-20 19:14:33'),
(124, 'App\\Models\\User', 2, 'API Token', '437140d330c00b76e9ecca4aa3cde54c31cba0dc57e4d2e34acfb72f3435da60', '[\"*\"]', '2025-05-20 22:44:04', NULL, '2025-05-20 22:41:15', '2025-05-20 22:44:04'),
(125, 'App\\Models\\User', 2, 'API Token', '66a639776a77a8e04ab12132a1527d956474527df8fb881f49a7f5c11fd42f4b', '[\"*\"]', '2025-05-20 22:47:43', NULL, '2025-05-20 22:45:39', '2025-05-20 22:47:43'),
(127, 'App\\Models\\User', 2, 'API Token', 'a7bfdd7b79c15c020122d99234a1eaa814c1cad0742983068b570fc898d3ad64', '[\"*\"]', '2025-05-21 09:10:47', NULL, '2025-05-21 00:09:43', '2025-05-21 09:10:47'),
(155, 'App\\Models\\User', 1, 'API Token', '4f3b7a2baefe6966360daf318e5ea3b69d83077e9c69f3a4a02efd3ff1c5f006', '[\"*\"]', '2025-05-21 17:55:52', NULL, '2025-05-21 17:55:52', '2025-05-21 17:55:52');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('TerA1eUNK1Y1RfvbZO6Bjd1w6VCbYES3Y63AyfdV', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZkk3bTJNMUQxQVFxUFFxMGlpVUx4eFlIY1JiclVDMERVNG1kUWpNaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvYWRtaW4vc3RhdHMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1747853752);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'participant',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Admin User', 'admin@ensaj.com', NULL, '$2y$12$rpK7g83q7AU3FQdr7Q3nwukOi4tUjyxCx0rKRRHhvzoEtj3I5Yu2q', NULL, '2025-05-12 21:48:39', '2025-05-12 21:48:39', 'admin'),
(2, 'Participant User', 'participant@ensaj.com', NULL, '$2y$12$15RWz4jWsMYeg.AwUK4pN.Vwke6VPSMd5hoJhMog8zEC.FatOS0v6', NULL, '2025-05-13 19:50:29', '2025-05-13 19:50:29', 'participant'),
(3, 'Nouha', 'nouha@ensaj.com', NULL, '$2y$12$G3/QCJvNL/UYKRJOh5sWLuw4OYJReYKmeeS0EUxDtX1Gdf9Fpg5IO', NULL, '2025-05-21 13:42:36', '2025-05-21 13:42:36', 'participant'),
(4, 'Safae', 'safae@ensaj.com', NULL, '$2y$12$xESQNjM239JJruDx6T8PBuvms1OmVOW6FUCtX4mEMl3BCM53n235e', NULL, '2025-05-21 16:56:25', '2025-05-21 16:56:25', 'participant');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
