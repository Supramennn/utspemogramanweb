-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2026 at 05:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpustakaan`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `title`, `author`, `image`, `description`) VALUES
(1, 'Madilog', 'Tan Malaka', 'https://mabhak.sch.id/wp-content/uploads/2023/12/9789791683319_Madilog-Tan-Malaka-Materialisme-Dialektika-Logika.jpg', 'Madilog ditulis di Rajawali dekat pabrik sepatu Kalibata di Cililitan, Jakarta. Proses penulisan itu memakan waktu sekitar 8 bulan antara 15 Juli 1942 dan 30 Maret 1943. Tan Malaka menulis buku ini pada saat pemerintah Jepang mengalahkan semua musuhnya dengan pedang, seringkali kehilangan kesabaran bahkan terhadap para pekerja Indonesia. Premis dasar penulisan Madilog adalah keyakinan Tan Malaka akan kekuatan proletariat Indonesia untuk menaklukkan dan membentuk Indonesia untuk menaklukkan dan membentuk Indonesia merdeka.\r\n\r\n        Namun kekuatan ini tidak maksimal karena pikiran mereka masih terbelenggu oleh berbagai takhayul. Mereka adalah pandangan dunia dan filosofi yang berwibawa dan masih diselimuti pengetahuan tentang akhirat dan berbagai takhayul. Pola pikir seperti inilah yang berusaha dikoreksi dan dimurnikan oleh Tan Malaka dengan madilognya.\r\n\r\n        Bagi Tan Malaka, Madilog merupakan gabungan awal suku kata: Materi, dialektika dan logika diterjemahkan oleh objek, dialektika dan logika. Namun, Madilog adalah cara berpikir, yang kami duga lebih merupakan filosofi.\r\n\r\n        Sinopsis\r\n        Pada perang Jepang-Tiongkok, tepatnya di Shanghai penghabisan tahun 1931, tiga hari lamanya saya terkepung di belakang jalan bernama North Sichuan Road, tempat peperangan pertama kali meletus. Dari North Sichuan Road tadi, Jepang menembak ke arah Po Shan Road dan tentara Tiongkok dari arah sebaliknya. Di antaranya, persisnya di kampung Wang Pan Cho, saya dengan pustaka saya terpaku. Sesudah dua atau tiga hari berselang, tentara Jepang baru memberi izin kepada kampung tempat saya tinggal untuk berpindah rumah, pergi ke tempat yang lebih aman dalam tempo lima menit saja. Saya turut pindah tergopoh-gopoh. Tentulah sehabis perang, yakni sesudah sebulan lamanya, maka sehelai kertas pun tiada tersisa. Begitulah rapinya “Laliong” alias tukang copet bekerja. Tapi hal ini tidak membuat saya putus asa. Selama toko buku masih ada, selama itu pula pustaka bisa dibentuk kembali. Kalau perlu dan memang perlu, pakaian dan makanan pun rela dikurangi!\r\n\r\n        —Tan Malaka'),
(3, 'Timun Jelita', 'Raditya Dika', 'https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/products/3jun2vt22e.jpg', 'Setelah ayahnya meninggal dan mewariskan sebuah gitar tua, seorang akuntan berusia 40 tahun menemukan hasrat untuk kembali bermusik.\r\n\r\n        Berdua saudaranya, seorang mahasiswi yang susah percaya dengan orang baru, mereka\r\n        membuat sebuah grup.\r\n\r\n        Timun Jelita, sebuah cerita panjang dan duo musik.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
