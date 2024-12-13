package com.cusc.toolbaogia.dto.khachhang.response;

import com.cusc.toolbaogia.dto.danhxung.response.DanhXungResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class KhachHangResponse {
    private Integer id;
    private String ten;
    private String moTa;
    private DanhXungResponse danhXung;
}
