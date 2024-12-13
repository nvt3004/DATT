package com.cusc.toolbaogia.dto.baogia.request;

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
public class BaoGiaDeleteRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    @Size(min = 1, message = "FIELD_MIN")
    private List<Integer> ids;
}
