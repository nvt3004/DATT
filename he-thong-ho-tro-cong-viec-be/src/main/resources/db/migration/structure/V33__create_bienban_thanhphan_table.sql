CREATE TABLE bienban_thanhphan
(
    bbthanhphan_id    INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    bienbanhop_id     INTEGER,
    bbthanhphan_ten   VARCHAR(255),
    bbthanhphan_donvi VARCHAR(255),
    bbthanhphan_email VARCHAR(255),
    nguoidung_id      INTEGER,
    created_at        TIMESTAMP WITHOUT TIME ZONE,
    modified_at       TIMESTAMP WITHOUT TIME ZONE,
    deleted_at        TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_bienban_thanhphan PRIMARY KEY (bbthanhphan_id)
);