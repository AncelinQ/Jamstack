CREATE TABLE IF NOT EXISTS todos (
  id SERIAL NOT NULL PRIMARY KEY,
  text TEXT NOT NULL,
  done BOOLEAN NOT NULL
);


INSERT INTO todos (text, done)
VALUES
  ('Commander une pizza', FALSE),
  ('Faire le ménage', FALSE),
  ('Aller voir Dune', TRUE)
  ;
