package com.cusc.toolbaogia.dto.sanphammaychu.response;

import java.time.LocalDateTime;
import com.cusc.toolbaogia.dto.maychu.response.MayChuResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class SanPhamMayChuResponse {
    private int id;
    private MayChuResponse mayChu;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;
}
