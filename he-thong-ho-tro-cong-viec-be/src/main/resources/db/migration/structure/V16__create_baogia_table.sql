CREATE TABLE baogia
(
    baogia_id          INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    baogia_tieude      VARCHAR(255),
    baogia_mocthoigian INTEGER,
    baogia_ngayhieuluc TIMESTAMP WITHOUT TIME ZONE,
    baogia_tongtien    DECIMAL,
    baogia_mota        VARCHAR(255),
    baogia_ngaytao     TIMESTAMP WITHOUT TIME ZONE,
    modified_at        TIMESTAMP WITHOUT TIME ZONE,
    deleted_at         TIMESTAMP WITHOUT TIME ZONE,
    nguoidung_id       INTEGER,
    thoigian_id        INTEGER,
    goibaogia_id       INTEGER,
    CONSTRAINT pk_baogia PRIMARY KEY (baogia_id)
);