package com.cusc.toolbaogia.dto.baogia.request;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class BaoGiaUpdateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private int id;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer mocThoiGian;
    @NotNull(message = "FIELD_NOT_BLANK")
    @Future(message = "FIELD_FUTURE")
    private LocalDateTime ngayHieuLuc;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String tieuDe;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String moTa;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer nguoiDungId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer goiSanPhamId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer thoiGianId;

}
