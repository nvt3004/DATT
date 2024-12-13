package com.cusc.toolbaogia.dto.baohanh.response;

import java.util.List;

import com.cusc.toolbaogia.dto.dichvubaohanh.response.DichVuNotBaoHanhResponse;
import com.cusc.toolbaogia.dto.dieukhoan.response.DieuKhoanNotBaoHanhResponse;
import com.cusc.toolbaogia.dto.phuongthucbaohanh.response.PhuongThucNotBaoHanhResponse;
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
public class BaoHanh_ChiTietResponse {
    int id;
    String moTa;
    List<PhuongThucNotBaoHanhResponse> listPhuongThucBaoHanh;
    List<DichVuNotBaoHanhResponse> listDichVuBaoHanh;
    List<DieuKhoanNotBaoHanhResponse> listDieuKhoanBaoHanh;
}
