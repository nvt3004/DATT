package com.cusc.toolbaogia.dto.bienbanketluan.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BienBanKetLuanResponse {
    private int id;
    private String mota;
    private LocalDateTime ngayTao;
}