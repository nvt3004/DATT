package com.cusc.toolbaogia.dto.tuvanbaohanh.response;

import com.cusc.toolbaogia.dto.baohanhbaogia.response.BaoHanhBaoGiaNotTVBHResponse;
import com.cusc.toolbaogia.dto.tuvan.response.TuVanNotTuVanBH;
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
public class TuVanBaoHanhResponse {
    Integer id;
    TuVanNotTuVanBH tuVan;
    BaoHanhBaoGiaNotTVBHResponse baoHanhBaoGia;
}
