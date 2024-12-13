export const formatPrice = (price: number | string): string => {
  // Kiểm tra nếu giá trị không phải là số thì trả về 0
  const priceNumber = Number(price);
  if (isNaN(priceNumber)) {
    return "0VND"; // Trường hợp giá trị không hợp lệ
  }

  // Định dạng giá trị và trả về kết quả với "VND" ở cuối
  return new Intl.NumberFormat("vi-VN").format(priceNumber) + "VND";
};
