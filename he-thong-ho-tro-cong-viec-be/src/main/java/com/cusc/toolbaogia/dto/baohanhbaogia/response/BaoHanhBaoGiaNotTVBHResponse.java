package com.cusc.toolbaogia.dto.baohanhbaogia.response;

import com.cusc.toolbaogia.dto.baohanh.response.BaoHanhResponse;
import com.cusc.toolbaogia.dto.thoigian.response.ThoiGianResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class BaoHanhBaoGiaNotTVBHResponse {
    private int id;
    private String thoiGianBaoHanh;
    private BaoHanhResponse baoHanh;
    private ThoiGianResponse thoiGian;
}
