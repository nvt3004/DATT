package com.cusc.toolbaogia.dto.danhxung.request;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.Min;
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
public class DanhXungUpdateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private int id;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String ten;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String moTa;
    @NotNull(message = "FIELD_NOT_BLANK")
    @Min(value = 1, message = "LOAI_MUST_BE_GREATER_THAN_ZERO")
    private Integer loai;
}
