package com.cusc.toolbaogia.dto.baogia.response;

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
public class BaoGiaForCNHMResponse {
    private int id;
    private int mocThoiGian;
    private LocalDateTime ngayHieuLuc;
    private String tieuDe;
    private String moTa;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;
    // private NguoiDungResponse nguoiDung;
}
