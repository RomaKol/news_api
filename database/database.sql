create TABLE user_t(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

create TABLE tokens_t(
    id SERIAL PRIMARY KEY,
    user_id INT,
    token VARCHAR(255),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES user_t(id)
	  ON DELETE CASCADE
);

create TABLE articles_t(
    id SERIAL PRIMARY KEY,
    user_id INT,
    date timestamptz NOT NULL DEFAULT NOW(),
    title VARCHAR(255) NOT NULL,
    content JSON,
    image BYTEA,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES user_t(id)
	  ON DELETE CASCADE
);
