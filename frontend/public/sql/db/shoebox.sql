-- Teyro practice database: Walt's shoebox of index cards, typed in as one table
-- (SQL and Databases for Beginners, Chapter 1). Written by hand.
-- NEVER CHANGE THIS FILE: lessons quote its rows.
-- Loaded fresh before every run (frontend/public/sql/runner.worker.js, backend originals-sql-verify.ts).

CREATE TABLE cards (
  id INTEGER PRIMARY KEY,
  name TEXT,
  film TEXT,
  night TEXT,
  seat TEXT,
  paid TEXT
);

INSERT INTO cards (id, name, film, night, seat, paid) VALUES
  (1, 'Rosa Marin', 'Casablanca', 'Fri 2 Oct', 'G2', '$14'),
  (2, 'Jack Murphy', 'Casablanca', 'Fri 2 Oct', 'G7', '$14'),
  (3, 'Rosa Marin', 'Casablanca', 'Fri 2 Oct', 'G7', '14.00'),
  (4, 'Tom Becker', 'Cassablanca', 'Fri 2 Oct', 'D3', '$14'),
  (5, 'Aiko Tanaka', 'The Princess Bride', 'Sat 3 Oct', 'B1', '$9'),
  (6, 'Marcus Hill', 'The Princess Bride', 'Sat 3 Oct', 'B2', 'comp'),
  (7, 'Priya Raman', 'Vertigo', 'Sat 3 Oct', 'F9', '$14'),
  (8, 'Ellen Novak', 'Vertigo', 'Sat 3 Oct', NULL, '$14'),
  (9, 'Sam Okoro', 'The Wizard of Oz', 'Sun 4 Oct', 'C5', '9'),
  (10, 'Lena Fischer', 'The Wizard of Oz', 'Sun 4 Oct', 'C6', 'paid');
