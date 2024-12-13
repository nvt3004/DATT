package com.cusc.toolbaogia.dto.tuvan.response;

import java.util.List;

import com.cusc.toolbaogia.dto.danhxung.response.DanhXungResponse;
import com.cusc.toolbaogia.dto.tuvanbaohanh.response.TuVanBaoHanhNotTuVan;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class TuVanResponse {
    private Integer id;
    private String ten;
    private String soDienThoai;
    private String email;
    private DanhXungResponse danhXung;
    private List<TuVanBaoHanhNotTuVan> listTuVanBaoHanh;

    // private List<TuVanBaoHanhResponse> listTuVanBaoHanh;
}
