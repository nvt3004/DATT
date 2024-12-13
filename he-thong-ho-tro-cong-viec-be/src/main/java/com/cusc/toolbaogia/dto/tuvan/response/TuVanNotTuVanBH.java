package com.cusc.toolbaogia.dto.tuvan.response;

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
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class TuVanNotTuVanBH {
    private Integer id;
    private String ten;
    private String soDienThoai;
    private String email;
    private DanhXungResponse danhXung;
}
