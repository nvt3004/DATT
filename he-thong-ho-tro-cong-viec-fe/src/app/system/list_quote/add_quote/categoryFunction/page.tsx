"use client";
import {
    Box,
    Select,
    Group,
    Button,
    Table,
    Checkbox,
    Text,
    Title,
    Divider,
    Alert,
    TextInput,
    Modal,
    // Modal,
} from "@mantine/core";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "@/store/slices/category_system/categoryAction";
import { fetchNhom_chucnang } from "@/store/slices/nhom_chucnang/nhom_chucnangAction";
import { addFunction_category } from "@/store/slices/chucnang_hangmuc/chucnang_hangmucAction";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { formatPrice } from "@/component/Format/FormatProce";
// import Link from "next/link";
import {
    selectQuoteIdBaogia,
    selectQuoteIdSanpham,
} from "@/store/slices/quote/quoteSlice";
import Engineering_Technology from "../engineeringTechnology/page";
import { IconFileCheck } from "@tabler/icons-react";
import {
    deleteQuote,
    fetchDeatailQuote,
} from "@/store/slices/quote/quoteAction";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";

function Category_Function() {
    const router = useRouter();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const cate = useSelector((state: any) => state.category);
    const function_Group = useSelector((state: any) => state.nhomchucnang);
    const IdBaogia = useSelector(selectQuoteIdBaogia);
    const IdSanpham = useSelector(selectQuoteIdSanpham);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [isAllChecked, setIsAllChecked] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | any>(
        null
    );
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedItem, setSelectedItem] = useState<string | any>(null);

    const [selectedFunctionGroup, setSelectedFunctionGroup] = useState<
        any | null
    >(null);
    const [continuequote4, setContinueQuote] = useState<boolean | undefined>(
        false
    );
    // const { items, loading, error } = useSelector((state: any) => state.quote);

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<null | any>(0);

    const handleCategoryChange = (value: string | null) => {
        if (!value) {
            setSelectedCategory(null);
            return;
        }
        const selectedData = cate?.items?.content?.find(
            (item: any) => item.id.toString() === value
        );
        setSelectedCategory(selectedData || null);
        setSelectedFunctionGroup(null);
    };

    // Hàm chọn nhóm chức năng
    const handleFunctionGroupChange = (value: string | null) => {
        if (!value || !selectedCategory) {
            setSelectedFunctionGroup(null);
            return;
        }
        const selectedGroup = selectedCategory.listNhomChucNang?.find(
            (group: any) => group.id.toString() === value
        );
        setSelectedFunctionGroup(selectedGroup || null);
    };

    useEffect(() => {
        dispatch(fetchNhom_chucnang({ activePage: 1, searchValue: "100" }));
        dispatch(fetchCategory());
    }, [dispatch]);

    const handleAdd = async () => {
        const data_add_ChucNangHangMuc = {
            baoGiaId: IdBaogia,
            sanPhamId: IdSanpham,
            hangMucId: selectedCategory?.id || null,
            nhomChucNangId: selectedFunctionGroup?.id || null,
            chucNangId: selectedRows,
        };

        if (data_add_ChucNangHangMuc.chucNangId.length !== 0) {
            try {
                const res = await dispatch(
                    addFunction_category(data_add_ChucNangHangMuc)
                );
                notifications.show({
                    title: "Thành công",
                    message: "Đã thêm hạng mục",
                    color: "green",
                    position: "top-right",
                });
                setSelectedCategory(null);
                setSelectedFunctionGroup(null);
                setSelectedRows([]);
                setTotalPrice(0);
                const id = IdBaogia;
                const resQuoteDetail = await dispatch(
                    fetchDeatailQuote({ id })
                );
                setTotalAmount(resQuoteDetail?.payload);
            } catch (error) {
                console.error("Có lỗi xảy ra khi thêm dữ liệu:", error);
                notifications.show({
                    title: "Lỗi",
                    message: "Có lỗi xảy ra khi thêm chức năng - hạng mục!",
                    color: "red",
                    position: "top-right",
                });
            }
        } else {
            notifications.show({
                title: "Cảnh báo",
                message: "Vui lòng chọn ít nhất một chức năng!",
                color: "yellow",
                position: "top-right",
            });
            return;
        }
    };
    const submitContinue = () => {
        setContinueQuote(true);
    };

    useEffect(() => {
        if (selectedFunctionGroup?.listChucNang) {
            const allIds = selectedFunctionGroup.listChucNang.map((item: any) => item.id);
            const total = selectedFunctionGroup.listChucNang.reduce((sum: number, item: any) => sum + item.gia, 0);

            setSelectedRows(allIds); // Chọn tất cả các mục
            setTotalPrice(total); // Tính tổng giá tiền
            setIsAllChecked(true); // Cập nhật trạng thái "Chọn tất cả"
        }
    }, [selectedFunctionGroup]);


    const rows = selectedFunctionGroup?.listChucNang.map(
        (element: any, index: number) => (
            <Table.Tr key={element.id}>
                <Table.Td>
                    <Checkbox
                        aria-label="Select row"
                        checked={selectedRows.includes(element.id)}
                        onChange={(event) => handleCheckboxChange(event, element)}
                    />
                </Table.Td>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{element.ten}</Table.Td>
                <Table.Td>{element.moTa}</Table.Td>
                <Table.Td>{formatPrice(element.gia)}</Table.Td>
            </Table.Tr>
        )
    );

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, element: any) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedRows((prev) => [...prev, element.id]);
            setTotalPrice((prev) => prev + element.gia);
        } else {
            setSelectedRows((prev) => prev.filter((id) => id !== element.id));
            setTotalPrice((prev) => prev - element.gia);
            setIsAllChecked(false); // Bỏ chọn trạng thái "Chọn tất cả"
        }
    };

    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            const allIds = selectedFunctionGroup?.listChucNang.map((item: any) => item.id) || [];
            const total = selectedFunctionGroup?.listChucNang.reduce((sum: number, item: any) => sum + item.gia, 0) || 0;

            setSelectedRows(allIds);
            setTotalPrice(total);
        } else {
            setSelectedRows([]);
            setTotalPrice(0);
        }

        setIsAllChecked(isChecked);
    };

    useEffect(() => {
        const allIds = selectedFunctionGroup?.listChucNang.map((item: any) => item.id) || [];
        setIsAllChecked(selectedRows.length === allIds.length && allIds.length > 0);
    }, [selectedRows, selectedFunctionGroup]);


    const submitDeleteQuote = async () => {
        try {
            await dispatch(deleteQuote(IdBaogia));
            router.push("/system/list_quote");
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };


    const groupedListChucNangHangMuc = totalAmount?.listChucNangHangMuc?.reduce(
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
    const listChucNangHangMuc = groupedListChucNangHangMuc ? groupedListChucNangHangMuc?.map(
        (element: string | any, index: number) => (
            <Table.Tr key={element.name}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td width={"60%"}>{element?.hangMuc?.ten}</Table.Td>
                <Table.Td>{element?.hangMuc?.donViTinh?.ten}</Table.Td>
                <Table.Td>{element?.hangMuc?.soLuong}</Table.Td>
                <Table.Td>
                    {formatPrice(element?.gia)}
                </Table.Td>
                <Table.Td>
                    <Button onClick={() => handleDetailClick(element)}>
                              Chi tiết
                    </Button>
                </Table.Td>
            </Table.Tr>
        )
    ) : <Table.Tr><Table.Td style={{ textAlign: "center", margin: "10px 0px" }} colSpan={12}>Không có dữ liệu</Table.Td></Table.Tr>

    const handleDetailClick = (item: string | any) => {
        setSelectedItem(item);
        open();
    };
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
            <div className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3">
                <h1>Chức năng - hạng mục</h1>
            </div>

            <Box className="bg-[#eceef0] p-4 rounded mb-3">
                <Box className="flex md:flex-nowrap flex-wrap mt-4">
                    <Select
                        label="Chọn hạng mục"
                        placeholder="Chọn hạng mục..."
                        withAsterisk
                        className="mr-4 mb-2"
                        style={{ width: "100%" }}
                        value={selectedCategory?.id?.toString() || null}
                        onChange={handleCategoryChange}
                        data={
                            cate?.items?.content?.map((data: any) => ({
                                value: data.id.toString(),
                                label: data.ten,
                            })) || []
                        }
                    />

                    <Select
                        label="Chọn nhóm chức năng"
                        placeholder="Chọn nhóm chức năng..."
                        withAsterisk
                        className="mr-4 mb-2"
                        style={{ width: "100%" }}
                        value={selectedFunctionGroup?.id?.toString() || null}
                        onChange={handleFunctionGroupChange}
                        data={
                            selectedCategory?.listNhomChucNang?.map((group: any) => ({
                                value: group.id.toString(),
                                label: group.ten,
                            })) || []
                        }
                    />
                </Box>

                <Text fw={500} style={{ margin: "10px 0px" }}>
                    Chọn chức năng
                </Text>
                <Table highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ width: "70px" }}>
                                <Checkbox
                                    aria-label="Check All"
                                    checked={isAllChecked}
                                    indeterminate={selectedRows.length > 0 && !isAllChecked}
                                    onChange={handleCheckAll}
                                    style={{ minWidth: "50px" }}
                                />
                            </Table.Th>
                            <Table.Th>STT</Table.Th>
                            <Table.Th>Tên chức năng</Table.Th>
                            <Table.Th>Mô tả</Table.Th>
                            <Table.Th>Giá</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {selectedFunctionGroup?.listChucNang?.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td
                                    colSpan={5}
                                    className="text-center"
                                    style={{ padding: "15px 0px" }}
                                >
                                    Chưa có dữ liệu
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>

                </Table>
                <Group justify="flex-end" style={{ width: "100%", paddingRight: "30px" }}>
                    <Title order={4} style={{ whiteSpace: "nowrap" }}>
                        Giá trị tiền: {formatPrice(totalPrice)}
                    </Title>
                </Group>

                <Box style={{  margin: "20px 0px" }}>
                    <Table
                        striped
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                    >
                        <Table.Thead style={{ backgroundColor: "#339af0" }}>
                            <Table.Tr>
                                <Table.Th className="text-center" style={{ color: "white" }}>STT</Table.Th>
                                <Table.Th className="text-center" style={{ color: "white" }}>
                                    Hạng mục công việc
                                </Table.Th>
                                <Table.Th className="text-center" style={{ color: "white" }}>
                                    Đơn vị tính
                                </Table.Th>
                                <Table.Th className="text-center" style={{ color: "white" }}>
                                    Số lượng
                                </Table.Th>
                                <Table.Th className="text-center" style={{ color: "white" }}>
                                    Tổng giá trị (đồng)
                                </Table.Th>
                                <Table.Th className="text-center" style={{ color: "white" }}>
                                    Thao tác
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{listChucNangHangMuc}</Table.Tbody>
                    </Table>
                </Box>
                <Divider my="md" />

                <Group justify="flex-end">
                    <Title order={4}>
                        Tổng tiền (VND): {formatPrice(totalAmount?.tongtien)}
                    </Title>
                </Group>
             
                {continuequote4 ? null : (
                    <>
                        <Button
                            variant="filled"
                            type="submit"
                            onClick={handleAdd}
                            className="mt-1"
                        >
                            Thêm hạng mục công việc
                        </Button>
                    </>
                )}
            </Box>
            {continuequote4 ? (
                <Engineering_Technology />
            ) : (
                <>
                    <Box className="flex justify-end mt-6">
                        <Button
                            variant="filled"
                            color="gray"
                            onClick={submitDeleteQuote}
                        >
                            Hủy bỏ
                        </Button>

                        <Button
                            variant="filled"
                            type="submit"
                            onClick={submitContinue}
                            className="ml-2"
                        >
                            <IconFileCheck stroke={2} />
                            Tiếp tục báo giá
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
}

export default Category_Function;
