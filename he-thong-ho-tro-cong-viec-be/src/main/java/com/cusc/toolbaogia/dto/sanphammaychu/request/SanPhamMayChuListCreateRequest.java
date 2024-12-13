package com.cusc.toolbaogia.dto.sanphammaychu.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class SanPhamMayChuListCreateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer sanPhamBaoGiaId;
    @NotNull(message = "FIELD_NOT_BLANK")
    @Size(min = 1, message = "FIELD_MIN")
    private List<Integer> mayChuIds;

}
