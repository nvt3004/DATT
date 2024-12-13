CREATE TABLE dieukhoan_baohanh
(
    dieukhoan_baohanh_id      INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    dieukhoan_baohanh_noidung VARCHAR(255),
    dieukhoan_baohanh_mota    VARCHAR(255),
    created_at                TIMESTAMP WITHOUT TIME ZONE,
    modified_at               TIMESTAMP WITHOUT TIME ZONE,
    deleted_at                TIMESTAMP WITHOUT TIME ZONE,
    baohanh_id                INTEGER,
    CONSTRAINT pk_dieukhoan_baohanh PRIMARY KEY (dieukhoan_baohanh_id)
);
