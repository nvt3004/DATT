CREATE TABLE maychu
(
    maychu_id   INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    maychu_ten  VARCHAR(255),
    maychu_mota VARCHAR(255),
    created_at  TIMESTAMP WITHOUT TIME ZONE,
    modified_at TIMESTAMP WITHOUT TIME ZONE,
    deleted_at  TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_maychu PRIMARY KEY (maychu_id)
);