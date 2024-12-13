"use client";

import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import {
    Alert,
    Box,
    Button,
    Input,
    Modal,
    Paper,
    Table,
    TextInput,
    Title,
    Group,
} from "@mantine/core";
import Link from "next/link";
import { fetchDeatailQuote } from "@/store/slices/quote/quoteAction";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { fetchWrrantyDetail } from "@/store/slices/warranty/warrantyAction";
import { formatPrice } from "@/component/Format/FormatProce";
import { IconFileDownload, IconArrowNarrowLeft } from "@tabler/icons-react";

const arr = [
    { title: "Trang chủ", href: "/system" },
    { title: "Danh sách báo giá", href: "/system/list_quote" },
    { title: "Chi tiết báo giá", href: "/system/list_quote/[slug]" },
];

export default function QuoteDetail({ params }: { params: { slug: string } }) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { items, loading, error } = useSelector((state: any) => state.quote);

    const [opened, { open, close }] = useDisclosure(false);
    const [selectedItem, setSelectedItem] = useState<string | any>(null);
    const [listbaohanh, setListbaohanh] = useState<string | any>(null);
    const dataListBaoHanh = useSelector((state: any) => state.warranty);
    useEffect(() => {
        const id = params.slug;
        dispatch(fetchDeatailQuote({ id }));
    }, [dispatch, params.slug]);
    useEffect(() => {
        if (items?.listBaoHanhBaoGia) {
            setListbaohanh(items.listBaoHanhBaoGia);
        }
    }, [items]);
    useEffect(() => {
        if (listbaohanh) {
            dispatch(
                fetchWrrantyDetail({
                    id: listbaohanh[0]?.baoHanh?.id,
                })
            );
        }
    }, [listbaohanh]);

    const handleDetailClick = (item: string | any) => {
        setSelectedItem(item);
        open();
    };
    const listKyThuatCongNghe = items?.listKyThuatCongNghe
        ? items.listKyThuatCongNghe.map(
            (element: string | any, index: number) => (
                <Table.Tr key={element.name || index}>
                    {" "}
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td width={"60%"}>{element?.noiDung}</Table.Td>
                    <Table.Td>{element?.giaTri}</Table.Td>
                </Table.Tr>
            )
        )
        : "Không có dữ liệu";
    const groupedListChucNangHangMuc = items?.listChucNangHangMuc?.reduce(
        (acc: any[], current: any) => {
            // Tìm mục đã tồn tại theo hangMuc.id
            const existingIndex = acc.findIndex(
                (item) => item.hangMuc.id === current.hangMuc.id
            );

            if (existingIndex !== -1) {
                // Nếu đã tồn tại, cộng giá và gộp chức năng
                acc[existingIndex].gia += current.gia;
                acc[existingIndex].chucNang.push(current.chucNang);
            } else {
                // Nếu chưa tồn tại, thêm mục mới và khởi tạo mảng chức năng
                acc.push({
                    ...current,
                    chucNang: [current.chucNang], // Đưa chucNang vào mảng
                });
            }

            return acc;
        },
        []
    );

    const listChucNangHangMuc = groupedListChucNangHangMuc
        ? groupedListChucNangHangMuc?.map(
            (element: string | any, index: number) => (
                <Table.Tr key={element.name}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td width={"60%"}>{element?.hangMuc?.ten}</Table.Td>
                    <Table.Td>{element?.hangMuc?.donViTinh?.ten}</Table.Td>
                    <Table.Td>{element?.hangMuc?.soLuong}</Table.Td>
                    <Table.Td>{formatPrice(element?.gia)}</Table.Td>
                    <Table.Td>
                        <Button onClick={() => handleDetailClick(element)}>
                            Chi tiết
                        </Button>
                    </Table.Td>
                </Table.Tr>
            )
        )
        : "Không có dữ liệu";

    const listBaoGiaKhachHang = items?.listBaoGiaKhachHang
        ? items?.listBaoGiaKhachHang.map(
            (element: string | any, index: number) => (
                <Table.Tr key={element.id}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{element?.khachHang?.danhXung?.ten}</Table.Td>
                    <Table.Td>{element?.khachHang?.ten}</Table.Td>
                </Table.Tr>
            )
        )
        : "Không có dữ liệu";
    const listTuVanKhachHang = listbaohanh?.[0]?.listTuVanBaoHanh?.length
        ? listbaohanh[0].listTuVanBaoHanh.map(
            (element: string | any, index: number) => (
                <Table.Tr key={element.id}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{element?.tuVan?.danhXung?.ten}</Table.Td>
                    <Table.Td>{element?.tuVan?.ten}</Table.Td>
                    <Table.Td>{element?.tuVan?.soDienThoai}</Table.Td>
                    <Table.Td>{element?.tuVan?.email}</Table.Td>
                </Table.Tr>
            )
        )
        : "Không có dữ liệu";
    const listSanPhamMayChu = items?.listSanPhamBaoGia?.length
        ? items?.listSanPhamBaoGia?.map((element: any, indexBaoGia: number) =>
            element?.listSanPhamMayChu?.map(
                (mayChuItem: any, indexMayChu: number) => {
                    return (
                        <Table.Tr key={`${element.id}-${mayChuItem.id}`}>
                            <Table.Td>{indexMayChu + 1}</Table.Td>
                            <Table.Td>
                                {mayChuItem?.mayChu?.ten || "N/A"}
                            </Table.Td>
                            <Table.Td>
                                {mayChuItem?.mayChu?.listSanPhamMayChuChiTiet
                                    ?.length ? (
                                    <ul>
                                        {mayChuItem?.mayChu?.listSanPhamMayChuChiTiet?.map(
                                            (
                                                chiTiet: any,
                                                indexChiTiet: number
                                            ) => {
                                                return (
                                                    <li key={chiTiet.id}>
                                                        {chiTiet?.thongSo
                                                            ?.ten || "N/A"}
                                                        :{" "}
                                                        {chiTiet?.giaTri ||
                                                            "Không có giá trị"}
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                ) : (
                                    "Không có thông tin chi tiết"
                                )}
                            </Table.Td>
                            <Table.Td>
                                {mayChuItem?.mayChu?.moTa || "Không có mô tả"}
                            </Table.Td>
                        </Table.Tr>
                    );
                }
            )
        )
        : "Không có dữ liệu";

    return (
        <>
            <Modal opened={opened} onClose={close} title="Chi tiết hạn mục">
                <TextInput
                    label="Sản phẩm"
                    className="mr-4"
                    readOnly
                    value={selectedItem?.sanPham?.ten}
                    styles={{
                        input: {
                            border: "none",
                            borderBottom: "2px solid #ccc",
                            borderRadius: 0,
                        },
                    }}
                />
                <TextInput
                    label=" Hạng mục"
                    className="mr-4"
                    readOnly
                    value={selectedItem?.hangMuc?.ten}
                    styles={{
                        input: {
                            border: "none",
                            borderBottom: "2px solid #ccc",
                            borderRadius: 0,
                        },
                    }}
                />
                <TextInput
                    label="Nhóm chức năng"
                    className="mr-4"
                    readOnly
                    value={selectedItem?.nhomChucNang?.ten}
                    styles={{
                        input: {
                            border: "none",
                            borderBottom: "2px solid #ccc",
                            borderRadius: 0,
                        },
                    }}
                />
                <TextInput
                    label="Tổng tiền"
                    className="mr-4"
                    readOnly
                    value={
                        selectedItem?.gia
                            ? ` ${selectedItem.gia.toLocaleString()} VND`
                            : ""
                    }
                    styles={{
                        input: {
                            border: "none",
                            borderBottom: "2px solid #ccc",
                            borderRadius: 0,
                        },
                    }}
                />
                <Alert
                    className="mt-2"
                    variant="light"
                    color="blue"
                    title="Chức năng"
                >
                    {selectedItem?.chucNang?.map((item: any, index: number) => {
                        return (
                            <>
                                <div>
                                    - {item?.ten} ,<strong>Giá: </strong>{" "}
                                    {formatPrice(item?.gia)}
                                </div>
                            </>
                        );
                    })}
                </Alert>
            </Modal>
            <Paper style={{ maxWidth: "100%" }}>
                <Box className="my-3 flex justify-between">
                    <Breadcrumbst ArrBreadcrumb={arr} />

                </Box>
                {error}
                <Box className="py-3 px-3 bg-[#339af0] text-white rounded-md my-3 ">
                    <Title order={2}>Chi tiết báo giá sản phẩm</Title>
                </Box>
                <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3 ">
                    <p>Thông tin chung </p>
                </Box>
                <div>
                    <div className=" bg-[#eceef0] p-4 rounded mb-3 ">
                        <div className="flex items-center">
                            <div className="text-gray-500">
                                Ngày báo giá:
                                <span className="font-bold text-black">
                                    {" "}
                                    {items?.ngayTao}
                                </span>
                            </div>

                            <div className="text-gray-500 ml-2 ">
                                Ngày hiệu lực:
                                <span className="font-bold text-black">
                                    {" "}
                                    {items?.ngayHieuLuc}
                                </span>
                            </div>
                        </div>
                        <TextInput
                            label="Nội dung báo giá"
                            placeholder="Nhập nội dung cần báo giá "
                            className="mr-4"
                            value={items?.tieuDe}
                        />

                        <Box className="flex md:flex-nowrap flex-wrap">
                            <TextInput
                                label="Thời gian"
                                value={items?.mocThoiGian}
                                readOnly
                                className="mr-4 w-[100%] md:w-[20%]"
                            />
                            <TextInput
                                label=" "
                                readOnly
                                value={items?.thoiGian?.loai}
                                className="mr-4 w-[100%] md:w-[15%]"
                            />

                            <TextInput
                                label="Gói sản phẩm"
                                value={items?.goiBaoGia?.ten}
                                readOnly
                                className="mr-4 w-full"
                            />
                        </Box>
                        <div className=" bg-[#eceef0] p-4 rounded mt-3">
                            <Input.Label>Danh sách khách hàng</Input.Label>
                            <Table
                                striped
                                highlightOnHover
                                withTableBorder
                                withColumnBorders
                            >
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th className="text-center">
                                            STT
                                        </Table.Th>
                                        <Table.Th className="text-center">
                                            Danh xưng
                                        </Table.Th>
                                        <Table.Th className="text-center">
                                            Tên
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{listBaoGiaKhachHang}</Table.Tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3 ">
                    <p>Thông tin báo giá </p>
                </Box>
                <div className=" bg-[#eceef0] p-4 rounded mt-3">
                    <Input.Label>Chi phí thực hiện</Input.Label>
                    <Table
                        striped
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th className="text-center">STT</Table.Th>
                                <Table.Th className="text-center">
                                    Hạng mục công việc
                                </Table.Th>
                                <Table.Th className="text-center">
                                    Đơn vị tính
                                </Table.Th>
                                <Table.Th className="text-center">
                                    Số lượng
                                </Table.Th>
                                <Table.Th className="text-center">
                                    Tổng giá trị (đồng)
                                </Table.Th>
                                <Table.Th className="text-center">
                                  Thao tác
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{listChucNangHangMuc}</Table.Tbody>
                    </Table>
                    <Box className="mt-2">
                        <Alert variant="light" color="blue" title="Tổng tiền">
                            <Title order={3}>
                                {formatPrice(items?.tongtien)}
                            </Title>
                        </Alert>
                    </Box>
                </div>
                <div className=" bg-[#eceef0] p-4 rounded mt-3">
                    <Input.Label>Kỹ thuật công nghệ</Input.Label>
                    <Table
                        striped
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th className="text-center">STT</Table.Th>
                                <Table.Th className="text-center">
                                    Nội dung
                                </Table.Th>
                                <Table.Th className="text-center">
                                    Kỹ thuật - công nghệ
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{listKyThuatCongNghe}</Table.Tbody>
                    </Table>
                </div>

                <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3 ">
                    <p>Thông tin bảo hành </p>
                </Box>
                <Box className=" bg-[#eceef0] p-4 ">
                    <Title order={3}>
                        Thời gian bảo hành:{" "}
                        {listbaohanh?.[0]?.thoiGianBaoHanh || ""}{" "}
                        {listbaohanh?.[0]?.thoiGian?.loai || ""}
                    </Title>
                    <Box className="">
                        <Title order={4}>Dịch vụ bảo hành: </Title>
                        {dataListBaoHanh?.items?.listDichVuBaoHanh?.length >
                            0 ? (
                            dataListBaoHanh?.items.listDichVuBaoHanh.map(
                                (item: string | any, index: number) => (
                                    <div key={index}>- {item.noiDung}</div>
                                )
                            )
                        ) : (
                            <div>không có dữ liệu</div>
                        )}
                    </Box>
                    <Box className="mt-2">
                        <Title order={4}>Điều khoản bảo hành: </Title>
                        {dataListBaoHanh?.items?.listDieuKhoanBaoHanh?.length >
                            0 ? (
                            dataListBaoHanh?.items.listDieuKhoanBaoHanh.map(
                                (item: string | any, index: number) => (
                                    <div key={index}>- {item.noiDung}</div>
                                )
                            )
                        ) : (
                            <div>không có dữ liệu</div>
                        )}
                    </Box>
                    <Box className="mt-2">
                        <Title order={4}>Phương thức bảo hành: </Title>
                        {dataListBaoHanh?.items?.listPhuongThucBaoHanh?.length >
                            0 ? (
                            dataListBaoHanh?.items.listPhuongThucBaoHanh.map(
                                (item: string | any, index: number) => (
                                    <div key={index}>- {item.noiDung}</div>
                                )
                            )
                        ) : (
                            <div>không có dữ liệu</div>
                        )}
                    </Box>
                </Box>
                <div className=" bg-[#eceef0] p-4 rounded mt-3">
                    <Input.Label>Danh sách tư vấn</Input.Label>
                    <Table
                        striped
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th className="text-center">STT</Table.Th>
                                <Table.Th className="text-center">
                                    Danh xưng
                                </Table.Th>
                                <Table.Th className="text-center">
                                    Họ và tên
                                </Table.Th>

                                <Table.Th className="text-center">
                                    Số điện thoại
                                </Table.Th>
                                <Table.Th className="text-center">
                                    Email
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{listTuVanKhachHang}</Table.Tbody>
                    </Table>
                </div>
                <div className=" bg-[#eceef0] p-4 rounded mt-3">
                    <Input.Label>Sản phẩm máy chủ</Input.Label>
                    <Table
                        striped
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th className="text-center">STT</Table.Th>
                                <Table.Th className="text-center">
                                    Máy chủ
                                </Table.Th>
                                <Table.Th className="text-center">
                                    Cấu hình
                                </Table.Th>
                                <Table.Th className="text-center">
                                    Mô tả
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{listSanPhamMayChu}</Table.Tbody>
                    </Table>
                </div>
                <Box className="mb-3 flex justify-end">
                    <Group justify="center" className="mt-6">
                        <Link href="/system/list_quote">
                            <Button variant="filled" color="blue" leftSection={<IconArrowNarrowLeft size={16} />}>
                                Trở lại
                            </Button>
                        </Link>
                        <Button
                            onClick={() => {
                                window.location.href = `http://172.16.1.98:8003/api/cusc-quote/v1/word/bangbaogia?baoGiaId=${params.slug}`;
                            }}
                            leftSection={<IconFileDownload size={16} />}
                        >
                            Tải file
                        </Button>


                    </Group>
                </Box>
            </Paper>
        </>
    );
}
