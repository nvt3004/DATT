CREATE TABLE chucnang
(
    chucnang_id     INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    chucnang_ten    VARCHAR(255),
    chucnang_mota   VARCHAR(255),
    chucnang_gia    DECIMAL,
    created_at      TIMESTAMP WITHOUT TIME ZONE,
    modified_at     TIMESTAMP WITHOUT TIME ZONE,
    deleted_at      TIMESTAMP WITHOUT TIME ZONE,
    nhomchucnang_id INTEGER,
    CONSTRAINT pk_chucnang PRIMARY KEY (chucnang_id)
);