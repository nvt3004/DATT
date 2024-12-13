package com.cusc.toolbaogia.dto.nhomchucnang.request;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class NhomChucNangUpdateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer id;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String ten;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String moTa;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer hangMucId;
}
