-- Run as MySQL admin/root user.
-- Update strong passwords before executing in production.

DROP DATABASE IF EXISTS fund_tracker;
DROP USER IF EXISTS 'fund_app'@'localhost';
DROP USER IF EXISTS 'fund_app'@'%';

CREATE DATABASE fund_tracker
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER 'fund_app'@'localhost' IDENTIFIED BY 'FundApp@2024!';
CREATE USER 'fund_app'@'%' IDENTIFIED BY 'FundApp@2024!';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, DROP, REFERENCES
  ON fund_tracker.* TO 'fund_app'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, DROP, REFERENCES
  ON fund_tracker.* TO 'fund_app'@'%';

FLUSH PRIVILEGES;
