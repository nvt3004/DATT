CREATE TABLE dichvu_baohanh
(
    dichvu_baohanh_id      INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    dichvu_baohanh_noidung VARCHAR(255),
    created_at             TIMESTAMP WITHOUT TIME ZONE,
    modified_at            TIMESTAMP WITHOUT TIME ZONE,
    deleted_at             TIMESTAMP WITHOUT TIME ZONE,
    baohanh_id             INTEGER,
    CONSTRAINT pk_dichvu_baohanh PRIMARY KEY (dichvu_baohanh_id)
);