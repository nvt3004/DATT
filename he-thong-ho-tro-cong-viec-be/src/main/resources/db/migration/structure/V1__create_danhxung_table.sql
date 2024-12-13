CREATE TABLE danhxung
(
    danhxung_id   INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    danhxung_ten  VARCHAR(255),
    danhxung_mota VARCHAR(255),
    danhxung_loai INTEGER,
    created_at    TIMESTAMP WITHOUT TIME ZONE,
    modified_at   TIMESTAMP WITHOUT TIME ZONE,
    deleted_at    TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_danhxung PRIMARY KEY (danhxung_id)
);