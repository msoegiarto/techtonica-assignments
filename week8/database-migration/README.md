# DATABASE MIGRATION

#### made for [this](https://github.com/Techtonica/curriculum/blob/master/databases/database-migrations.md) assignment

## Independent Practice: Activity 1

Create your own table with at least four columns. One of the columns should be type VARCHAR(5). Populate the table with three entries.

    CREATE TABLE IF NOT EXISTS authors(
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(5) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(50),
      created_on DATE DEFAULT CURRENT_DATE,
      updated_on DATE DEFAULT CURRENT_DATE
    );

    INSERT INTO authors (id, first_name, last_name, email, created_on, updated_on)
    VALUES(DEFAULT, 'J.K.', 'Rowling', 'jkrowling@example.com', DEFAULT, DEFAULT);

    INSERT INTO authors (id, first_name, last_name, created_on, updated_on)
    VALUES(DEFAULT, 'F.', 'Kafka', DEFAULT, DEFAULT);

    INSERT INTO authors (id, first_name, last_name, created_on, updated_on)
    VALUES(DEFAULT, 'J.W.', 'von Goethe', DEFAULT, DEFAULT);

## Independent Practice: Activity 2

Think about how you want the table to change. Are there additional columns you'd like to add or ones you want to remove?

Run a migration to add one column and delete one column. Also, change the field with type VARCHAR(5) to VARCHAR(50). (Don't forget to run as part of a transaction!)

    BEGIN;
    ALTER TABLE authors DROP COLUMN email;
    ALTER TABLE authors ADD COLUMN bio VARCHAR(255);
    ALTER TABLE authors ALTER COLUMN first_name TYPE VARCHAR(50);
    COMMIT;