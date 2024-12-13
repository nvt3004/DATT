package com.cusc.toolbaogia.dto.thoigian.response;

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
public class ThoiGianResponse {
    private int id;
    private String loai;
    private String moTa;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;

}
