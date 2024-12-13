package com.cusc.toolbaogia.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {
    NGUOIDUNG_NOT_EXISTED(1012, "Người dùng không tồn tại", HttpStatus.NOT_FOUND),
    DIEUKHOANBAOHANH_NOT_EXISTED(1013, "Điều khoản bảo hành không tồn tại", HttpStatus.NOT_FOUND),
    BAOHANH_NOT_EXISTED(1014, "Bảo hành không tồn tại", HttpStatus.NOT_FOUND),
    PHUONGTHUCBAOHANH_NOT_EXISTED(1015, "Phương thức bảo hành không tồn tại", HttpStatus.NOT_FOUND),
    DICHVUBAOHANH_NOT_EXISTED(1016, "Dịch vụ bảo hành không tồn tại", HttpStatus.NOT_FOUND),
    THOIGIAN_NOT_EXISTED(1017, "Thời gian không tồn tại", HttpStatus.NOT_FOUND),
    HANGMUC_NOT_EXISTED(1018, "Hạng mục không tồn tại", HttpStatus.NOT_FOUND),
    DONVITINH_NOT_EXISTED(1019, "Đơn vị tính không tồn tại", HttpStatus.NOT_FOUND),
    MOCTHOIGIAN_INVALID(1020, "Mốc thời gian phải lớn hơn 0", HttpStatus.BAD_REQUEST),
    GIA_INVALID(1021, "Giá phải lớn hơn 1000", HttpStatus.BAD_REQUEST),
    SOLUONG_INVALID(1022, "Số lượng phải lớn hơn 1", HttpStatus.BAD_REQUEST),
    DANHXUNG_NOT_EXISTED(1900, "Danh xưng không tồn tại", HttpStatus.BAD_REQUEST),
    THOIGIAN_NOT_NULL(1023, "Thời gian không được bỏ trống", HttpStatus.BAD_REQUEST),
    ID_NOT_NULL(1024, "ID không được bỏ trống", HttpStatus.BAD_REQUEST),
    IDBAOHANH_NOT_NULL(1025, "ID bảo hành không được bỏ trống", HttpStatus.BAD_REQUEST),
    MOCTHOIGIAN_NOT_NULL(1026, "Mốc thời gian không được bỏ trống", HttpStatus.BAD_REQUEST),
    NGUOIDUNG_NOT_NULL(1027, "Người dùng không được bỏ trống", HttpStatus.BAD_REQUEST),
    NOIDUNG_NOT_BLANK(1028, "Nội dung không được bỏ trống", HttpStatus.BAD_REQUEST),
    TEN_NOT_BLANK(1029, "Tên không được bỏ trống", HttpStatus.BAD_REQUEST),
    GIA_NOT_NULL(1030, "Giá không được bỏ trống", HttpStatus.BAD_REQUEST),
    NGAYHIEULUC_NOT_NULL(1031, "Ngày hiệu lực không được bỏ trống", HttpStatus.BAD_REQUEST),
    SOLUONG_NOT_NULL(1032, "Số lượng không được bỏ trống", HttpStatus.BAD_REQUEST),
    DONVITINH_NOT_NULL(1033, "Đơn vị tính không được bỏ trống", HttpStatus.BAD_REQUEST),
    MAYCHU_NOT_EXISTED(1901, "Máy chủ không tồn tại", HttpStatus.BAD_REQUEST),
    LOAI_MUST_BE_GREATER_THAN_ZERO(1902, "Loại phải lớn hơn 0", HttpStatus.BAD_REQUEST),
    THONGSO_NOT_EXISTED(1903, "Thông số không tồn tại", HttpStatus.BAD_REQUEST),
    PHUONGTHUCTHANHTOAN_NOT_EXISTED(1904, "Phương thức thanh toán không tồn tại", HttpStatus.BAD_REQUEST),

    UNCATEGORIZED_EXCEPTION(9999, "Lỗi chưa được phân loại", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHENTICATED(2001, "Chưa được xác thực", HttpStatus.UNAUTHORIZED),
    INVALID_KEY(2002, "Lỗi chưa được phân loại", HttpStatus.BAD_REQUEST),
    PAGE_NUMBER_INVALID(2003, "Số trang không hợp lệ", HttpStatus.BAD_REQUEST),
    OBJECT_NOT_EXISTED(2004, "%s không tồn tại", HttpStatus.NOT_FOUND),
    OBJECT_EXISTED(2005, "%s đã tồn tại", HttpStatus.NOT_FOUND),
    FIELD_NOT_BLANK(2006, "{field} không được bỏ trống!", HttpStatus.BAD_REQUEST),
    FIELD_FUTURE(2007, "{field} phải là thời gian trong tương lai!", HttpStatus.BAD_REQUEST),
    FIELD_MIN(2008, "{field} phải lớn hơn hoặc bằng {min}!", HttpStatus.BAD_REQUEST),
    FIELD_MAX(2009, "{field} phải bé hơn {max}!", HttpStatus.BAD_REQUEST),
    FIELD_ID_NOT_VALID(2010, "Id {field} chưa hợp lệ!", HttpStatus.BAD_REQUEST),
    TIME_RANGE_INVALID(2011, "Thời gian bắt đầu phải trước thời gian kết thúc", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_VALID(2012, "Email không hợp lệ!", HttpStatus.BAD_REQUEST),
    BAOGIA_PHUONGTHUCTHANHTOAN_NOT_EXISTED(1905, "Báo giá phương thức thanh toán không tồn tại", HttpStatus.BAD_REQUEST),
    THONGSO_GROUP_NOT_EXISTED(1905, "Nhóm thông số không tồn tại", HttpStatus.BAD_REQUEST),
    TACNHAN_NOT_EXISTED(1907, "Tác nhân không tồn tại", HttpStatus.BAD_REQUEST),
    GOISANPHAM_NOT_EXISTED(1908, "Tác nhân không tồn tại", HttpStatus.BAD_REQUEST),
    TUVAN_NOT_EXISTED(1005, "Tư vấn không tồn tại", HttpStatus.NOT_FOUND),

    KHACHHANG_NOT_EXISTED(1006, "Khách hàng không tồn tại", HttpStatus.NOT_FOUND),
    ;

    int code;
    String message;
    HttpStatus httpStatus;

    public String formatMessage(Object... params) {
        return String.format(message, params);
    }
}
