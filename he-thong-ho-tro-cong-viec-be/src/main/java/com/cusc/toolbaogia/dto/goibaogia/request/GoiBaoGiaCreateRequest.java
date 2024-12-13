package com.cusc.toolbaogia.dto.goibaogia.request;

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
public class GoiBaoGiaCreateRequest {
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String ten;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String moTa;

}
