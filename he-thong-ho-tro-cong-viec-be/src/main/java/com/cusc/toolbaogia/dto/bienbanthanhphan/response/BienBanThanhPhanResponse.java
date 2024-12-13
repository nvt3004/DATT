package com.cusc.toolbaogia.dto.bienbanthanhphan.response;

import com.cusc.toolbaogia.dto.bienbannoidung.response.BienBanNoiDungResponse;
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
public class BienBanThanhPhanResponse {
    private int id;
    private String ten;
    private String donvi;
    private String email;
    private List<BienBanNoiDungResponse> listBienBanNoiDung;
    private LocalDateTime ngayTao;
}