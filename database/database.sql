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
    date_creation timestamptz NOT NULL DEFAULT NOW(),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    description VARCHAR(255),
    image_id INT,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES user_t(id)
	  ON DELETE CASCADE,
    CONSTRAINT fk_image
      FOREIGN KEY(image_id)
	  REFERENCES images_t(id)
	  ON DELETE SET NULL
);

create TABLE images_t(
    id SERIAL PRIMARY KEY,
    user_id INT,
    date_creation timestamptz NOT NULL DEFAULT NOW(),
    title VARCHAR(255) NOT NULL DEFAULT 'image',
    image BYTEA,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES user_t(id)
	  ON DELETE SET NULL
);
