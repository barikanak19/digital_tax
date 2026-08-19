-- ============================================================
-- Digital Tax Filing Support for Small Businesses
-- MySQL Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS digital_tax_support
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE digital_tax_support;

SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
-- users
-- ------------------------------------------------------------
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(191) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  status ENUM('active', 'disabled') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP NULL DEFAULT NULL,
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- login_activity
-- ------------------------------------------------------------
DROP TABLE IF EXISTS login_activity;
CREATE TABLE login_activity (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  login_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(64) NULL,
  user_agent VARCHAR(512) NULL,
  CONSTRAINT fk_login_activity_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_login_activity_user (user_id),
  INDEX idx_login_activity_login_at (login_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- services
-- ------------------------------------------------------------
DROP TABLE IF EXISTS services;
CREATE TABLE services (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  short_description VARCHAR(300) NOT NULL,
  introduction TEXT NOT NULL,
  purpose TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  charges TEXT NOT NULL,
  official_portal_name VARCHAR(150) NOT NULL,
  official_portal_url VARCHAR(300) NOT NULL,
  important_information TEXT NOT NULL,
  final_information TEXT NOT NULL,
  intro_image VARCHAR(255) NULL,
  middle_image VARCHAR(255) NULL,
  final_image VARCHAR(255) NULL,
  display_order INT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_services_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- service_documents (documents/information required checklist)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS service_documents;
CREATE TABLE service_documents (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id INT UNSIGNED NOT NULL,
  document_name VARCHAR(255) NOT NULL,
  display_order INT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_service_documents_service
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  INDEX idx_service_documents_service (service_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- service_steps (step-by-step guide)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS service_steps;
CREATE TABLE service_steps (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id INT UNSIGNED NOT NULL,
  step_number INT UNSIGNED NOT NULL,
  step_title VARCHAR(200) NOT NULL,
  step_description TEXT NOT NULL,
  step_image VARCHAR(255) NULL,
  CONSTRAINT fk_service_steps_service
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  INDEX idx_service_steps_service (service_id),
  UNIQUE KEY uq_service_step_number (service_id, step_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- service_faqs
-- ------------------------------------------------------------
DROP TABLE IF EXISTS service_faqs;
CREATE TABLE service_faqs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id INT UNSIGNED NULL,
  category VARCHAR(100) NULL,
  question VARCHAR(300) NOT NULL,
  answer TEXT NOT NULL,
  display_order INT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_service_faqs_service
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  INDEX idx_service_faqs_service (service_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- tax_calendar
-- ------------------------------------------------------------
DROP TABLE IF EXISTS tax_calendar;
CREATE TABLE tax_calendar (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id INT UNSIGNED NULL,
  title VARCHAR(200) NOT NULL,
  due_date DATE NOT NULL,
  description TEXT NULL,
  status ENUM('upcoming', 'due_soon', 'past') NOT NULL DEFAULT 'upcoming',
  CONSTRAINT fk_tax_calendar_service
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL,
  INDEX idx_tax_calendar_due_date (due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- feedback
-- ------------------------------------------------------------
DROP TABLE IF EXISTS feedback;
CREATE TABLE feedback (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  service_id INT UNSIGNED NULL,
  rating TINYINT UNSIGNED NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_feedback_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_feedback_service
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL,
  CONSTRAINT chk_feedback_rating CHECK (rating BETWEEN 1 AND 5),
  INDEX idx_feedback_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- contact_requests
-- ------------------------------------------------------------
DROP TABLE IF EXISTS contact_requests;
CREATE TABLE contact_requests (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NULL,
  mobile_number VARCHAR(20) NULL,
  email VARCHAR(191) NULL,
  description TEXT NOT NULL,
  status ENUM('new', 'in_progress', 'resolved') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_contact_requests_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_contact_requests_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
