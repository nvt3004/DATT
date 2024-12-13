package com.cusc.toolbaogia.dto.baohanhbaogia.response;

import java.util.List;

import com.cusc.toolbaogia.dto.baohanh.response.BaoHanhResponse;
import com.cusc.toolbaogia.dto.thoigian.response.ThoiGianResponse;
import com.cusc.toolbaogia.dto.tuvanbaohanh.response.TuVanBaoHanhResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class BaoHanhBaoGiaNotBaoGia {
    private int id;
    private int thoiGianBaoHanh;
    private BaoHanhResponse baoHanh;
    // private BaoGiaForNDBGResponse baoGia;
    private ThoiGianResponse thoiGian;
    private List<TuVanBaoHanhResponse> listTuVanBaoHanh;
}
