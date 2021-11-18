CREATE TABLE IF NOT EXISTS todos (
    id SERIAL NOT NULL PRIMARY KEY,
    text TEXT NOT NULL,
    done BOOLEAN NOT NULL
);

INSERT INTO todos (text, done)
VALUES
    ('Apprendre mon cours de JS', FALSE),
    ('Commander une pizza', FALSE),
    ('Payer l''électricité', FALSE)
;
