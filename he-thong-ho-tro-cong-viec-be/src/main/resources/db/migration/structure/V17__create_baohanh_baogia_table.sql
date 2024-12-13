CREATE TABLE baohanh_baogia
(
    baohanh_baogia_id       INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    baohanh_baogia_thoigian INTEGER,
    created_at              TIMESTAMP WITHOUT TIME ZONE,
    modified_at             TIMESTAMP WITHOUT TIME ZONE,
    deleted_at              TIMESTAMP WITHOUT TIME ZONE,
    baohanh_id              INTEGER,
    baogia_id               INTEGER,
    thoigian_id             INTEGER,
    CONSTRAINT pk_baohanh_baogia PRIMARY KEY (baohanh_baogia_id)
);