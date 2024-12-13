CREATE TABLE sanpham_maychu_chitiet
(
    sanpham_maychu_chitiet_id     INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    sanpham_maychu_chitiet_giatri VARCHAR(255),
    created_at                    TIMESTAMP WITHOUT TIME ZONE,
    modified_at                   TIMESTAMP WITHOUT TIME ZONE,
    deleted_at                    TIMESTAMP WITHOUT TIME ZONE,
    maychu_id             INTEGER,
    thongso_group_id              INTEGER,
    thongso_id                    INTEGER,
    CONSTRAINT pk_sanpham_maychu_chitiet PRIMARY KEY (sanpham_maychu_chitiet_id)
);

