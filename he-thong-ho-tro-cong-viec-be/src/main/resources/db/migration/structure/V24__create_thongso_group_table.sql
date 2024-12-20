CREATE TABLE thongso_group
(
    thongso_group_id  INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    thongso_group_ma  VARCHAR(255),
    thongso_group_ten VARCHAR(255),
    thongso_group_mota VARCHAR(255),
    created_at        TIMESTAMP WITHOUT TIME ZONE,
    modified_at       TIMESTAMP WITHOUT TIME ZONE,
    deleted_at        TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_thongso_group PRIMARY KEY (thongso_group_id)
);
