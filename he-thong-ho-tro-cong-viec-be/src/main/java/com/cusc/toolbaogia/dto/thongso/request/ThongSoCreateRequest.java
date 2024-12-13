package com.cusc.toolbaogia.dto.thongso.request;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ThongSoCreateRequest {
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String ma;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String ten;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String moTa;

}
