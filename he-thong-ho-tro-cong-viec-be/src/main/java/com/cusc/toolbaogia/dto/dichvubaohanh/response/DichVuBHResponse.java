package com.cusc.toolbaogia.dto.dichvubaohanh.response;

import com.cusc.toolbaogia.dto.baohanh.response.BaoHanhResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DichVuBHResponse {
    private Integer id;
    private BaoHanhResponse baoHanh;
    private String noiDung;
}
