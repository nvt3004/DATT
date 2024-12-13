package com.cusc.toolbaogia.services;

import com.cusc.toolbaogia.dto.baogia.response.BaoGiaResponse;
import com.cusc.toolbaogia.dto.kythuatcongnghe.response.KyThuatCongNgheResponse;
import com.cusc.toolbaogia.models.BaoHanhBaoGia;
import com.cusc.toolbaogia.models.ChucNangHangMuc;
import com.cusc.toolbaogia.models.DichVuBaoHanh;
import com.cusc.toolbaogia.models.DieuKhoanBaoHanh;
import com.cusc.toolbaogia.models.NguoiDung;
import com.cusc.toolbaogia.models.PhuongThucBaoHanh;
import com.cusc.toolbaogia.models.SanPhamBaoGia;
import com.cusc.toolbaogia.models.SanPhamMayChu;
import com.cusc.toolbaogia.models.SanPhamMayChuChiTiet;
import com.cusc.toolbaogia.models.TuVanBaoHanh;
import com.cusc.toolbaogia.repositories.BaoHanhBaoGiaJPA;
import com.cusc.toolbaogia.repositories.ChucNangHangMucJPA;
import com.cusc.toolbaogia.repositories.DichVuBaoHanhJPA;
import com.cusc.toolbaogia.repositories.DieuKhoanBaoHanhJPA;
import com.cusc.toolbaogia.repositories.NguoiDungJPA;
import com.cusc.toolbaogia.repositories.NhomChucNangTacNhanJPA;
import com.cusc.toolbaogia.repositories.PhuongThucBaoHanhJPA;
import com.cusc.toolbaogia.repositories.SanPhamBaoGiaJPA;
import com.cusc.toolbaogia.repositories.SanPhamMayChuChiTietJPA;
import com.cusc.toolbaogia.repositories.SanPhamMayChuJPA;
import com.cusc.toolbaogia.repositories.TuVanBaoHanhJPA;
import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.data.*;
import com.deepoove.poi.data.style.Style;
import com.deepoove.poi.data.style.TableStyle;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BaoGiaTemplateService {

    BaoGiaService baoGiaService;

    NhomChucNangTacNhanJPA nhomChucNangTacNhanJPA;

    ChucNangHangMucJPA chucNangHangMucJPA;

    BaoHanhBaoGiaJPA baohHanhBaoGiaJPA;

    DichVuBaoHanhJPA dichVuBaoHanhJPA;

    DieuKhoanBaoHanhJPA dieuKhoanBaoHanhJPA;

    PhuongThucBaoHanhJPA phuongThucBaoHanhJPA;

    NguoiDungJPA nguoiDungJPA;

    TuVanBaoHanhJPA tuVanBaoHanhJPA;

    SanPhamBaoGiaJPA sanPhamBaoGiaJPA;

    SanPhamMayChuJPA sanPhamMayChuJPA;

    SanPhamMayChuChiTietJPA sanPhamMayChuChiTietJPA;

    public XWPFTemplate generateBaoGiaWordXWPFTemplate(int bangBaoGiaId) throws IOException {
        BaoGiaResponse baoGia = baoGiaService.getBaoGiaById(bangBaoGiaId);
        Map<String, Object> content = buildContent(baoGia);

        try (InputStream templateInputStream = new ClassPathResource("assets/bangbaogia.docx").getInputStream()) {
            return XWPFTemplate.compile(templateInputStream).render(content);
        }
    }

    private Map<String, Object> buildContent(BaoGiaResponse baoGia) {
        Map<String, Object> content = new HashMap<>();
        content.put("tieude", baoGia.getTieuDe());

        LocalDateTime ngayTao = baoGia.getNgayTao();

        content.put("ngay", ngayTao.getDayOfMonth());
        content.put("thang", ngayTao.getMonthValue());
        content.put("nam", ngayTao.getYear());

        content.put("ngaytao", formatNgay(baoGia.getNgayTao(), true));

        content.put("danhxung", baoGia.getListBaoGiaKhachHang().get(0).getKhachHang().getDanhXung().getTen());
        System.out
                .println("Danh xung: " + baoGia.getListBaoGiaKhachHang().get(0).getKhachHang().getDanhXung().getTen());

        String danhSachTenKhachHang = baoGia.getListBaoGiaKhachHang().stream()
                .map(khachHangItem -> khachHangItem.getKhachHang().getTen())
                .collect(Collectors.joining(", "));
        content.put("khachhang", danhSachTenKhachHang);

        content.put("chiphi", createChiPhiTable(baoGia));

        content.put("phanmem", baoGia.getListChucNangHangMuc().get(0).getSanPham().getTen());

        int mocThoiGian = baoGia.getMocThoiGian();
        String mocThoiGianBangChu = convertNumberToWordsWithoutCurrency(mocThoiGian);
        content.put("mocthoigian",
                mocThoiGian + " (" + mocThoiGianBangChu + ")" + " " + baoGia.getThoiGian().getLoai().toLowerCase());

        BaoHanhBaoGia baoHanhBaoGia = baohHanhBaoGiaJPA.findByBaoGia_Id(baoGia.getId()).get();

        int baoHanhId = baoHanhBaoGia.getBaoHanh().getId();

        int mocBaoHanh = baoHanhBaoGia.getThoiGianBaoHanh();
        String mocThoiGianBaoHanhBangChu = convertNumberToWordsWithoutCurrency(mocBaoHanh);
        content.put("mocthoigianbaohanh",
                mocBaoHanh + " (" + mocThoiGianBaoHanhBangChu + ")" + " "
                        + baoHanhBaoGia.getThoiGian().getLoai().toLowerCase());
        System.out.println("moc bao hanh: " + mocBaoHanh + " - loai: " + baoHanhBaoGia.getThoiGian().getLoai());

        content.put("phuluc", createPhuLucTable(baoGia));

        String kythuatCongNgheText = baoGia.getListKyThuatCongNghe().stream()
                .map(kyThuat -> String.format("\t\t+ %s: %s.", kyThuat.getNoiDung(), kyThuat.getGiaTri()))
                .collect(Collectors.joining("\n"));
        content.put("kythuatcongnghe", kythuatCongNgheText);

        List<DichVuBaoHanh> listDichVuBaoHanh = dichVuBaoHanhJPA.findByBaoHanh_Id(baoHanhId);
        String dichvubaohanh = listDichVuBaoHanh.stream()
                .map(dvbh -> String.format("\t\t+ %s", dvbh.getNoiDung()))
                .collect(Collectors.joining("\n"));
        content.put("dichvubaohanh", dichvubaohanh);

        List<DieuKhoanBaoHanh> listDieuKhoanBaoHanh = dieuKhoanBaoHanhJPA.findByBaoHanh_Id(baoHanhId);
        String dieukhoanbaohanh = listDieuKhoanBaoHanh.stream()
                .map(dkbh -> String.format("\t\t+ %s", dkbh.getNoiDung()))
                .collect(Collectors.joining("\n"));
        content.put("dieukhoanbaohanh", dieukhoanbaohanh);

        List<PhuongThucBaoHanh> listPhuongThucBaoHanh = phuongThucBaoHanhJPA.findByBaoHanh_Id(baoHanhId);
        String phuongthucbaohanh = listPhuongThucBaoHanh.stream()
                .map(ptbh -> String.format("\t\t+ %s", ptbh.getNoiDung()))
                .collect(Collectors.joining("\n"));
        content.put("phuongthucbaohanh", phuongthucbaohanh);

        NguoiDung nguoiDung = nguoiDungJPA.findById(1).orElse(null);
        content.put("ten", nguoiDung.getTen());
        content.put("diachi", nguoiDung.getDiaChi());
        content.put("dienthoai", nguoiDung.getSdt());
        content.put("fax", nguoiDung.getSoFax());

        TuVanBaoHanh tuVanBaoHanh = tuVanBaoHanhJPA.findByBaoHanhBaoGia_Id(baoHanhBaoGia.getId()).get(0);
        content.put("tenchuyenvien", tuVanBaoHanh.getTuVan().getTen());
        content.put("danhxungchuyenvien", tuVanBaoHanh.getTuVan().getDanhXung().getTen());
        content.put("dienthoaichuyenvien", tuVanBaoHanh.getTuVan().getSoDienThoai());
        content.put("emailchuyenvien", tuVanBaoHanh.getTuVan().getEmail());

        content.put("thongsokythuat", createThongSoKyThuatTable(baoGia));

        content.put("kythuatcongnghetable", createKyThuatCongNgheTable(baoGia));

        content.put("tenmientruycap", createTenMienTruyCapTable(baoGia));

        return content;
    }

    private Style createStyle(Boolean bold, Boolean italic, String color, Integer fontSize) {
        Style style = new Style();
        if (bold != null && bold)
            style.setBold(true);
        if (italic != null && italic)
            style.setItalic(true);
        if (color != null)
            style.setColor(color);
        if (fontSize != null)
            style.setFontSize(fontSize);
        return style;
    }

    private TableRenderData createChiPhiTable(BaoGiaResponse baoGia) {

        RowRenderData headerRow = Rows
                .of("TT", "Hạng mục công việc", "ĐVT", "Số lượng", "Tổng giá trị thực hiện (đồng)")
                .textBold().textColor("FFFFFF").bgColor("4472C4").center().create();

        TableRenderData table = Tables.create(headerRow);

        TableStyle style = new TableStyle();
        style.setWidth("100%");
        style.setColWidths(new int[] { 10, 50, 10, 10, 20 });
        table.setTableStyle(style);

        var listChiPhi = baoGia.getListChucNangHangMuc();
        Set<String> uniqueHangMucNames = new HashSet<>();

        int hangMucCount = 1;
        int baoGiaId = baoGia.getId();
        double tongTienTatCaHangMuc = 0.0;

        for (int i = 0; i < listChiPhi.size(); i++) {
            var hangMuc = listChiPhi.get(i);
            String hangMucName = hangMuc.getHangMuc().getTen();
            int hangMucId = hangMuc.getHangMuc().getId();

            List<ChucNangHangMuc> listChucNangHangMuc = chucNangHangMucJPA
                    .findByHangMuc_IdAndNgayXoaIsNullAndBaoGia_Id(hangMucId, baoGiaId);

            if (!uniqueHangMucNames.contains(hangMucName)) {
                uniqueHangMucNames.add(hangMucName);

                double tongChiPhi = 0.0;
                for (ChucNangHangMuc chucNangHangMuc : listChucNangHangMuc) {
                    BigDecimal giaChucNangBigDecimal = chucNangHangMuc.getGia();
                    double giaChucNang = giaChucNangBigDecimal.doubleValue();
                    tongChiPhi += giaChucNang;
                }

                tongTienTatCaHangMuc += tongChiPhi;

                RowRenderData row = Rows.create(
                        Cells.of(String.valueOf(hangMucCount)).center().create(),
                        Cells.of(hangMucName).create(),
                        Cells.of(hangMuc.getHangMuc().getDonViTinh().getTen()).center().create(),
                        Cells.of(String.valueOf(hangMuc.getHangMuc().getSoLuong())).center().create(),
                        Cells.of(String.format("%,.0f", tongChiPhi)).create());
                table.addRow(row);

                hangMucCount++;
            }
        }

        RowRenderData rowTongCong = Rows.create(
                Cells.of().center().create(),
                Cells.of(new TextRenderData("Tổng cộng", createStyle(true, false, null, null))).center().create(),
                Cells.of().center().create(),
                Cells.of().center().create(),
                Cells.of(new TextRenderData(String.format("%,.0f", tongTienTatCaHangMuc),
                        createStyle(true, false, "FF0000", 14))).create());

        table.addRow(rowTongCong);

        String tongTienBangChu = convertNumberToWords((long) tongTienTatCaHangMuc);

        RowRenderData rowBangChu = Rows.create(
                Cells.of().center().center().create(),
                Cells.of(new TextRenderData("Bằng chữ", createStyle(false, true, null, null))).center().create(),
                Cells.of().center().center().create(),
                Cells.of().center().center().create(),
                Cells.of(new TextRenderData(tongTienBangChu, createStyle(false, true, null, null))).create());

        table.addRow(rowBangChu);

        MergeCellRule mergeRule1 = MergeCellRule.builder()
                .map(
                        MergeCellRule.Grid.of(table.getRows().size() - 1, 1),
                        MergeCellRule.Grid.of(table.getRows().size() - 1, 3))
                .build();
        table.setMergeRule(mergeRule1);

        return table;
    }

    private TableRenderData createThongSoKyThuatTable(BaoGiaResponse baoGia) {

        SanPhamBaoGia sanPhamBaoGia = sanPhamBaoGiaJPA.findByBaoGia_Id(baoGia.getId()).get();

        List<SanPhamMayChu> sanPhamMayChuList = sanPhamMayChuJPA.findBySanPhamBaoGia_Id(sanPhamBaoGia.getId());

        RowRenderData headerRow = Rows
                .of("TT", "Server", "Cấu hình", "Ghi chú dịch vụ")
                .textBold().textColor("FFFFFF").bgColor("4472C4").center().create();

        TableRenderData table = Tables.create(headerRow);

        TableStyle style = new TableStyle();
        style.setWidth("100%");
        style.setColWidths(new int[] { 10, 20, 40, 30 });
        table.setTableStyle(style);

        int tt = 1;

        Map<String, StringBuilder> serverConfigurations = new LinkedHashMap<>();
        Map<String, String> serverNotes = new HashMap<>();

        for (SanPhamMayChu sanPhamMayChu : sanPhamMayChuList) {

            List<SanPhamMayChuChiTiet> chiTietList = sanPhamMayChuChiTietJPA
                    .findByMayChu_Id(sanPhamMayChu.getMayChu().getId());

            String mayChuTen = sanPhamMayChu.getMayChu().getTen();
            String ghiChuDichVu = sanPhamMayChu.getMayChu().getMoTa();

            if (!serverConfigurations.containsKey(mayChuTen)) {
                serverConfigurations.put(mayChuTen, new StringBuilder());
                serverNotes.put(mayChuTen, ghiChuDichVu);
            }

            StringBuilder configBuilder = serverConfigurations.get(mayChuTen);
            for (SanPhamMayChuChiTiet chiTiet : chiTietList) {
                String thongSoTen = chiTiet.getThongSo().getTen();
                String thongSoGiaTri = chiTiet.getGiaTri();

                if (configBuilder.length() > 0) {
                    configBuilder.append("\n");
                }
                configBuilder.append("- ").append(thongSoTen).append(": ").append(thongSoGiaTri);
            }
        }

        for (Map.Entry<String, StringBuilder> entry : serverConfigurations.entrySet()) {
            String serverName = entry.getKey();
            String config = entry.getValue().toString();
            String notes = serverNotes.get(serverName);

            RowRenderData row = Rows.create(
                    Cells.of(String.valueOf(tt)).center().create(),
                    Cells.of(serverName).create(),
                    Cells.of(config).create(),
                    Cells.of(notes).create());

            table.addRow(row);
            tt++;
        }

        return table;
    }

    private TableRenderData createKyThuatCongNgheTable(BaoGiaResponse baoGia) {
        RowRenderData headerRow = Rows
                .of("STT", "Nội dung", "Kỹ thuật")
                .textBold().textColor("FFFFFF").bgColor("4472C4").center().create();

        TableRenderData table = Tables.create(headerRow);

        TableStyle style = new TableStyle();
        style.setWidth("100%");
        style.setColWidths(new int[] { 10, 40, 50 });
        table.setTableStyle(style);

        int stt = 1;
        for (KyThuatCongNgheResponse kyThuat : baoGia.getListKyThuatCongNghe()) {
            RowRenderData row = Rows.create(
                    Cells.of(String.valueOf(stt)).center().create(),
                    Cells.of(kyThuat.getNoiDung()).create(),
                    Cells.of(kyThuat.getGiaTri()).create());
            table.addRow(row);
            stt++;
        }

        return table;
    }

    private TableRenderData createTenMienTruyCapTable(BaoGiaResponse baoGia) {
        RowRenderData headerRow = Rows
                .of("STT", "Phần mềm", "Tên miền truy cập")
                .textBold().textColor("FFFFFF").bgColor("4472C4").center().create();

        TableRenderData table = Tables.create(headerRow);

        TableStyle style = new TableStyle();
        style.setWidth("100%");
        style.setColWidths(new int[] { 10, 35, 55 });
        table.setTableStyle(style);

        RowRenderData row = Rows.create(
                Cells.of("STT").center().create(),
                Cells.of("Phần mềm").create(),
                Cells.of("Tên miền truy cập").create());
        table.addRow(row);

        return table;
    }

    private static final String[] tensNames = {
            "", " mười", " hai mươi", " ba mươi", " bốn mươi",
            " năm mươi", " sáu mươi", " bảy mươi", " tám mươi", " chín mươi"
    };

    private static final String[] numNames = {
            "", " một", " hai", " ba", " bốn", " năm", " sáu", " bảy", " tám", " chín"
    };

    private String convertNumberToWords(long number) {
        if (number == 0)
            return "Không đồng";

        String soTienBangChu = "";

        if (number >= 1_000_000_000) {
            soTienBangChu += convertThreeDigits((int) (number / 1_000_000_000)) + " tỷ";
            number %= 1_000_000_000;
        }
        if (number >= 1_000_000) {
            soTienBangChu += convertThreeDigits((int) (number / 1_000_000)) + " triệu";
            number %= 1_000_000;
        }
        if (number >= 1_000) {
            soTienBangChu += convertThreeDigits((int) (number / 1_000)) + " nghìn";
            number %= 1_000;
        }
        if (number > 0) {
            soTienBangChu += convertThreeDigits((int) number);
        }

        soTienBangChu = soTienBangChu.trim() + " đồng";

        return Character.toUpperCase(soTienBangChu.charAt(0)) + soTienBangChu.substring(1);
    }

    private String convertThreeDigits(int number) {
        String result = "";

        if (number >= 100) {
            result += numNames[number / 100] + " trăm";
            number %= 100;
        }
        if (number >= 10) {
            result += tensNames[number / 10];
            number %= 10;
        } else if (number >= 1 && result.length() > 0) {
            result += " linh";
        }
        if (number > 0) {
            result += numNames[number];
        }

        return result;
    }

    private String convertNumberToWordsWithoutCurrency(long number) {
        if (number == 0)
            return "không";

        String soTienBangChu = "";

        if (number >= 1_000_000_000) {
            soTienBangChu += convertThreeDigits((int) (number / 1_000_000_000)) + " tỷ";
            number %= 1_000_000_000;
        }
        if (number >= 1_000_000) {
            soTienBangChu += convertThreeDigits((int) (number / 1_000_000)) + " triệu";
            number %= 1_000_000;
        }
        if (number >= 1_000) {
            soTienBangChu += convertThreeDigits((int) (number / 1_000)) + " nghìn";
            number %= 1_000;
        }
        if (number > 0) {
            soTienBangChu += convertThreeDigits((int) number);
        }

        return soTienBangChu.trim().toLowerCase();
    }

    private TableRenderData createPhuLucTable(BaoGiaResponse baoGia) {

        RowRenderData headerRow = Rows
                .of("TT", "Nhóm chức năng", "Tác nhân", "Mô tả")
                .textBold().textColor("FFFFFF").bgColor("4472C4").center().create();

        TableRenderData table = Tables.create(headerRow);

        TableStyle style = new TableStyle();
        style.setWidth("100%");
        style.setColWidths(new int[] { 5, 30, 20, 45 });
        table.setTableStyle(style);

        var listHangMuc = baoGia.getListChucNangHangMuc();
        Set<String> uniqueHangMucKeys = new HashSet<>();

        int hangMucCount = 1;

        for (int i = 0; i < listHangMuc.size(); i++) {
            var hangMuc = listHangMuc.get(i);
            String hangMucName = hangMuc.getHangMuc().getTen();
            var hangMucId = hangMuc.getHangMuc().getId();

            String hangMucKey = hangMucId + "_" + hangMucName;

            if (!uniqueHangMucKeys.contains(hangMucKey)) {
                uniqueHangMucKeys.add(hangMucKey);

                RowRenderData rowHangMuc = Rows.create(
                        Cells.of(String.valueOf(hangMucCount)).create(),
                        Cells.of(new TextRenderData(hangMucName, createStyle(true, false, "FF0000", 14))).create(),
                        Cells.of("").create(),
                        Cells.of("").create());
                table.addRow(rowHangMuc);

                int nhomChucNangCount = 1;

                Set<String> uniqueNhomChucNangNames = new HashSet<>();
                var listNhomChucNang = baoGia.getListChucNangHangMuc();

                for (var nhomChucNang : listNhomChucNang) {
                    if (nhomChucNang.getNhomChucNang() != null) {
                        String nhomChucNangName = nhomChucNang.getNhomChucNang().getTen();
                        var nhomChucNangId = nhomChucNang.getNhomChucNang().getId();

                        if (!uniqueNhomChucNangNames.contains(nhomChucNangName)) {
                            uniqueNhomChucNangNames.add(nhomChucNangName);

                            if (nhomChucNang.getHangMuc().getId() == hangMucId) {

                                String nhomChucNangNumber = hangMucCount + "." + nhomChucNangCount;

                                String tenTacNhan = nhomChucNangTacNhanJPA
                                        .findByNhomChucNang_Id(nhomChucNangId)
                                        .map(tacNhan -> tacNhan.getTacNhan().getTen())
                                        .orElse("Tên tác nhân không tồn tại");

                                RowRenderData rowNhomChucNang = Rows.create(
                                        Cells.of(nhomChucNangNumber).create(),
                                        Cells.of(new TextRenderData(nhomChucNangName,
                                                createStyle(true, false, "000000", 14))).create(),
                                        Cells.of(new TextRenderData(tenTacNhan,
                                                createStyle(true, false, "000000", 14))).create(),
                                        Cells.of("").create());
                                table.addRow(rowNhomChucNang);

                                nhomChucNangCount++;

                                for (int c = 0; c < listNhomChucNang.size(); c++) {
                                    var chucNang = listNhomChucNang.get(c);

                                    if (chucNang.getNhomChucNang() != null) {
                                        if (chucNang.getNhomChucNang().getId() == nhomChucNangId) {
                                            RowRenderData rowChucNang = Rows.create(
                                                    Cells.of("").create(),
                                                    Cells.of("").create(),
                                                    Cells.of("").create(),
                                                    Cells.of(chucNang.getChucNang().getTen()).create());
                                            table.addRow(rowChucNang);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                hangMucCount++;
            }
        }

        return table;
    }

    private String formatNgay(LocalDateTime dateTime, boolean isFullFormat) {
        DateTimeFormatter formatter = isFullFormat ? DateTimeFormatter.ofPattern("'Ngày' dd 'tháng' MM 'năm' yyyy")
                : DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return dateTime.format(formatter);
    }

}
