package com.cusc.toolbaogia.dto.nhomchucnangtacnhan.response;

import java.time.LocalDateTime;

import com.cusc.toolbaogia.dto.nhomchucnang.response.NhomChucNangResponse;
import com.cusc.toolbaogia.dto.tacnhan.response.TacNhanResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class NhomChucNangTacNhanResponse {
    private int id;
    private NhomChucNangResponse nhomChucNang;
    private TacNhanResponse tacNhan;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;

}
