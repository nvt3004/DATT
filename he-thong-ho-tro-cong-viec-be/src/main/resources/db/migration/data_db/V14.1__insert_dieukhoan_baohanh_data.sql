INSERT INTO dieukhoan_baohanh(dieukhoan_baohanh_noidung,dieukhoan_baohanh_mota,baohanh_id)
VALUES
-- Bảo hành 1
('Không được sửa chữa tại các cơ sở không được ủy quyền', 'Khách hàng không được sửa chữa sản phẩm tại các cửa hàng không chính thức.', 1),
('Sản phẩm phải còn nguyên tem bảo hành', 'Chỉ bảo hành các sản phẩm còn nguyên tem và không bị sửa đổi.', 1),
-- Bảo hành 2
('Sản phẩm phải trong thời gian bảo hành để được hỗ trợ.', 'Thời gian bảo hành phải còn hiệu lực.', 2),
('Không bảo hành cho sản phẩm bị va đập mạnh.', 'Sản phẩm bị rơi hoặc va đập sẽ không được bảo hành.', 2),
-- Bảo hành 3
('Sản phẩm không được tháo rời hoặc can thiệp từ bên thứ ba.', 'Chỉ bảo hành cho sản phẩm còn nguyên trạng.', 3),
('Khách hàng cần cung cấp hóa đơn mua hàng.', 'Phải có hóa đơn gốc để được bảo hành.', 3),
-- Bảo hành 4
('Không bảo hành cho sản phẩm bị ẩm hoặc ngập nước.', 'Bảo hành không áp dụng nếu sản phẩm bị hư hỏng do nước.', 4),
('Chỉ bảo hành cho lỗi từ nhà sản xuất.', 'Bảo hành chỉ áp dụng cho các lỗi do nhà sản xuất.', 4),
-- Bảo hành 5
('Phải bảo quản sản phẩm đúng cách.', 'Không bảo hành cho sản phẩm không được bảo quản theo hướng dẫn.', 5),
('Không bảo hành cho sản phẩm bị cháy nổ.', 'Các trường hợp cháy nổ sẽ không được bảo hành.', 5),
-- Bảo hành 6
('Bảo hành áp dụng cho các linh kiện chính hãng.', 'Không bảo hành cho linh kiện không chính hãng.', 6),
('Không bảo hành cho các trường hợp hao mòn tự nhiên.', 'Bảo hành không bao gồm hao mòn tự nhiên.', 6),
-- Bảo hành 7
('Sản phẩm không được tự ý sửa chữa.', 'Bảo hành sẽ bị từ chối nếu sản phẩm tự ý sửa chữa.', 7),
('Chỉ bảo hành cho lỗi từ nhà sản xuất.', 'Lỗi do người sử dụng sẽ không được bảo hành.', 7),
-- Bảo hành 8
('Không bảo hành cho sản phẩm đã hết hạn.', 'Bảo hành không áp dụng cho sản phẩm hết hạn bảo hành.', 8),
('Khách hàng phải cung cấp phiếu bảo hành.', 'Yêu cầu phải có phiếu bảo hành hợp lệ.', 8);