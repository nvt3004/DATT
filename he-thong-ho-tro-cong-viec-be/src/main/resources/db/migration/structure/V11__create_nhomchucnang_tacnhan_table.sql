CREATE TABLE nhomchucnang_tacnhan
(
    nhomchucnang_tacnhan_id INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    created_at          TIMESTAMP WITHOUT TIME ZONE,
    modified_at         TIMESTAMP WITHOUT TIME ZONE,
    deleted_at          TIMESTAMP WITHOUT TIME ZONE,
    nhomchucnang_id         INTEGER,
    tacnhan_id          INTEGER,
    CONSTRAINT pk_chucnang_tacnhan PRIMARY KEY (nhomchucnang_tacnhan_id)
);