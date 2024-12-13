package com.cusc.toolbaogia.dto.nhomchucnangtacnhan.request;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class NhomChucNangTacNhanUpdateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer id;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer nhomChucNangId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer tacNhanId;

}
