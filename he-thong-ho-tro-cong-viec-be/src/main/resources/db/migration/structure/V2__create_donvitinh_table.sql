CREATE TABLE donvitinh
(
    donvitinh_id   INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    donvitinh_ten  VARCHAR(255),
    donvitinh_mota VARCHAR(255),
    created_at     TIMESTAMP WITHOUT TIME ZONE,
    modified_at    TIMESTAMP WITHOUT TIME ZONE,
    deleted_at     TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_donvitinh PRIMARY KEY (donvitinh_id)
);