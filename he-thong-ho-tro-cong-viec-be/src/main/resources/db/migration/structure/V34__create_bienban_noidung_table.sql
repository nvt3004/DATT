CREATE TABLE bienban_noidung
(
    bbnoidung_id     INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    bbthanhphan_id   INTEGER,
    bbthanhphan_mota VARCHAR(255),
    created_at       TIMESTAMP WITHOUT TIME ZONE,
    modified_at      TIMESTAMP WITHOUT TIME ZONE,
    deleted_at       TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_bienban_noidung PRIMARY KEY (bbnoidung_id)
);
