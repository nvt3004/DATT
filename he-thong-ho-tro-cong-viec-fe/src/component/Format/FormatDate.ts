// FormatDate.ts
const FormatDate = (inputDate: Date | string): string => {
  const dateObj = new Date(inputDate);

  // Kiểm tra nếu đối tượng date hợp lệ
  if (isNaN(dateObj.getTime())) {
    return "Ngày không hợp lệ";
  }

  // Lấy ngày, tháng, năm, giờ và phút
  const day = String(dateObj.getDate()).padStart(2, "0"); // Ngày
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Tháng (0-11)
  const year = String(dateObj.getFullYear()); // Năm (2 chữ số cuối)
  const hours = String(dateObj.getHours()).padStart(2, "0"); // Giờ
  const minutes = String(dateObj.getMinutes()).padStart(2, "0"); // Phút

  // Trả về chuỗi đã định dạng
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default FormatDate;
