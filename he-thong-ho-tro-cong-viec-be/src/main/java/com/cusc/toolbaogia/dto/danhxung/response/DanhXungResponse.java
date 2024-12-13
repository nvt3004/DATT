package com.cusc.toolbaogia.dto.danhxung.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class DanhXungResponse {
    private int id;
    private String ten;
    private String moTa;
    private int loai;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;
}
