package com.cusc.toolbaogia.dto.dieukhoan.response;


import com.cusc.toolbaogia.dto.baohanh.response.BaoHanhResponse;
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
public class DieuKhoanResponse {
    private Integer id;
    private String noiDung;
    private String moTa;
    private BaoHanhResponse baoHanh;
}
