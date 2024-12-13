package com.cusc.toolbaogia.dto.bienbanhop.response;

import com.cusc.toolbaogia.dto.bienbanketluan.response.BienBanKetLuanResponse;
import com.cusc.toolbaogia.dto.bienbanthanhphan.response.BienBanThanhPhanResponse;
import com.cusc.toolbaogia.dto.response.NguoiDungSimpleResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BienBanHopResponse {
    private int id;
    private String ten;
    private String diadiem;
    private LocalDateTime giobatdau;
    private LocalDateTime gioketthuc;
    private String mota;
    private NguoiDungSimpleResponse nguoiDung;
    private List<BienBanThanhPhanResponse> listBienBanThanhPhan;
    private List<BienBanKetLuanResponse> listBienBanKetLuan;
    private LocalDateTime ngayTao;
}
