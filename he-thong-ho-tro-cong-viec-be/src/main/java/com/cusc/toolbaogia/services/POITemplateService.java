package com.cusc.toolbaogia.services;

import com.cusc.toolbaogia.dto.bienbanhop.response.BienBanHopResponse;
import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.data.*;
import com.deepoove.poi.data.style.TableStyle;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class POITemplateService {

    BienBanHopService bienBanHopService;
    public XWPFTemplate generateBienBanHopWordXWPFTemplate(int bienBanHopId) throws IOException {
        BienBanHopResponse bienBanHop = bienBanHopService.getBienBanHopById(bienBanHopId);
        Map<String, Object> content = buildContent(bienBanHop);

        try (InputStream templateInputStream = new ClassPathResource("assets/bienbanhop.docx").getInputStream()) {
            return XWPFTemplate.compile(templateInputStream).render(content);
        }
    }

    private Map<String, Object> buildContent(BienBanHopResponse bienBanHop) {
        Map<String, Object> content = new HashMap<>();
        content.put("ten", bienBanHop.getTen());
        content.put("diadiem", bienBanHop.getDiadiem());
        content.put("thoigian", formatThoiGian(bienBanHop));
        content.put("ngaydaydu", formatNgay(bienBanHop.getGiobatdau(), true));
        content.put("ngayngangon", formatNgay(bienBanHop.getGiobatdau(), false));
        content.put("thanhPhanTable", createThanhPhanTable(bienBanHop));
        content.put("nguoidung", bienBanHop.getNguoiDung().getTen());
        content.put("mota", bienBanHop.getMota());
        content.put("noiDungTable", createNoiDungTable(bienBanHop));
        content.put("ketLuanContent", buildKetLuanContent(bienBanHop));

        return content;
    }

    private String formatThoiGian(BienBanHopResponse bienBanHop) {
        String startTime = formatGio(bienBanHop.getGiobatdau());
        String endTime = formatGio(bienBanHop.getGioketthuc());
        return startTime + " - " + endTime;
    }

    private TableRenderData createThanhPhanTable(BienBanHopResponse bienBanHop) {
        RowRenderData headerRow = Rows.of("STT", "HỌ TÊN", "ĐƠN VỊ").textBold().textColor("FFFFFF").bgColor("4472C4").center().create();
        TableRenderData table = Tables.create(headerRow);
        TableStyle style = new TableStyle();
        style.setWidth("100%");
        style.setColWidths(new int[]{10, 45, 45});
        table.setTableStyle(style);

        var listThanhPhan = bienBanHop.getListBienBanThanhPhan();
        for (int i = 0; i < listThanhPhan.size(); i++) {
            var thanhPhan = listThanhPhan.get(i);
            table.addRow(Rows.create(
                    Cells.of(String.valueOf(i + 1)).center().create(),
                    Cells.of(thanhPhan.getTen()).create(),
                    Cells.of(thanhPhan.getDonvi()).create())
            );
        }
        return table;
    }

    private TableRenderData createNoiDungTable(BienBanHopResponse bienBanHop) {
        RowRenderData speechHeaderRow = Rows.of("HỌ TÊN", "NỘI DUNG").textColor("FFFFFF").textBold().bgColor("4472C4").center().create();
        TableRenderData table = Tables.create(speechHeaderRow);
        TableStyle style = new TableStyle();
        style.setWidth("100%");
        style.setColWidths(new int[]{30, 70});
        table.setTableStyle(style);

        for (var thanhPhan : bienBanHop.getListBienBanThanhPhan()) {
            // Kiểm tra xem có nội dung phát biểu hay không
            var noiDungList = thanhPhan.getListBienBanNoiDung();
            if (noiDungList != null && !noiDungList.isEmpty()) {
                String noiDung = noiDungList.stream()
                        .map(n -> "- " + n.getMota())
                        .collect(Collectors.joining("\n"));

                RowRenderData row = Rows.of(
                        Cells.of(Texts.of(thanhPhan.getTen()).bold().create()).verticalCenter().create(),
                        Cells.of(noiDung).create()
                ).create();

                table.addRow(row);
            }
        }
        return table;
    }


    private String buildKetLuanContent(BienBanHopResponse bienBanHop) {
        return bienBanHop.getListBienBanKetLuan().stream().map(k -> "- " + k.getMota()).collect(Collectors.joining("\n"));
    }

    private String formatGio(LocalDateTime dateTime) {
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        return dateTime.format(timeFormatter);
    }

    private String formatNgay(LocalDateTime dateTime, boolean isFullFormat) {
        DateTimeFormatter formatter = isFullFormat ? DateTimeFormatter.ofPattern("'Ngày' dd 'tháng' MM 'năm' yyyy") : DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return dateTime.format(formatter);
    }
}
