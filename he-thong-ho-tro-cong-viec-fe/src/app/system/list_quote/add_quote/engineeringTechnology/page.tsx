"use client";
import { useState, useEffect } from "react";
import {
    TextInput,
    Button,
    Modal,
    Table,
    ActionIcon,
    Box,
    Select,
} from "@mantine/core";
import { IconTrash, IconEdit, IconCheck, IconX } from "@tabler/icons-react";
import {
    Getall_Engineering_Technology,
    addEngineering_Technology,
    deleteEngineering_Technology,
    upDateEngineering_Technology
} from "@/store/slices/kythuatcongnghe/kythuatcongngheAction";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import {
    selecidKyThuatCongNghe,
    selectQuoteIdBaogia,
    selectQuoteIdSanpham,
    setIdKyThuatCongNghe,
    setIdSanPhamBaoGia,
} from "@/store/slices/quote/quoteSlice";
import { addSanPhamBaoGia } from "@/store/slices/baohanhbaogia/baohanhbaogiaAction";
import SanPhamMayChu from "../sanphammaychu/page";
import { fetchCate } from "@/store/slices/cate/cateAction";
import { addTechnologycate } from "@/store/slices/techologycate/techologycateAction";
import { deleteQuote } from "@/store/slices/quote/quoteAction";

function Engineering_Technology() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { items } = useSelector((state: any) => state.engineering_Technology);
    const cate = useSelector((state: any) => state.cate);

    const router = useRouter();

    const [opened, setOpened] = useState(false);
    const [newValue, setNewValue] = useState<string>("");
    const [newCate, setnewCate] = useState<string | null>('');
    const [newContent, setNewContent] = useState<string>("");
    const IdBaogia = useSelector(selectQuoteIdBaogia);
    const IdSanpham = useSelector(selectQuoteIdSanpham);
    const [continuequote4, setContinueQuote] = useState<boolean | undefined>(
        false
    );
    const [editingRow, setEditingRow] = useState<number | null>(null); // Chỉ số hàng đang chỉnh sửa
    const [editData, setEditData] = useState({ noiDung: "", giaTri: "" }); // Dữ liệu tạm thời khi chỉnh sửa


    const idKyThuatCongNghe = useSelector(selecidKyThuatCongNghe);
    useEffect(() => {
        dispatch(
            Getall_Engineering_Technology({
                id: IdBaogia || 1,
                page: 1,
                size: 100,
            })
        );
        dispatch(
            fetchCate({
                activePage: 1,
                searchValue: "100",
            })
        );
    }, [dispatch]);

    const [touchedFields, setTouchedFields] = useState({
        newContent: false,
        newValue: false,
        newCate: false,
    });

    const handleAddInput = async () => {
        if (newValue.trim() && newContent.trim() && newCate) {
            setNewValue(newValue);
            setNewContent(newContent);

            const data = {
                noiDung: newContent,
                giaTri: newValue,
                baoGiaId: IdBaogia,
                sanPhamId: IdSanpham,
            };

            try {
                const res = await dispatch(addEngineering_Technology(data));
                if (res.payload.code === 1000) {
                    await dispatch(
                        Getall_Engineering_Technology({
                            id: IdBaogia,
                            page: 1,
                            size: 100,
                        })
                    );

                    const dataresTechnologycate = {
                        danhMuc: newCate,
                        kythuat_congnghe: res.payload.result.id
                    }
                    const resTechnologycate = await dispatch(addTechnologycate(dataresTechnologycate));
                    if (resTechnologycate.payload.code === 1000) {
                        notifications.show({
                            title: "Thành công",
                            message: "Đã thêm kỹ thuật công nghệ!",
                            color: "green",
                            position: "top-right",
                        });
                        setnewCate("")
                        setNewValue("");
                        setNewContent("");
                        setOpened(false);
                    } else {
                        notifications.show({
                            title: "Thêm thất bại",
                            message: `${res.payload.response.data.message}`,
                            color: "red",
                            autoClose: 3000,
                            position: "top-right",
                        });
                    }
                } else {
                    notifications.show({
                        title: "Thêm thất bại",
                        message: `${res.payload.response.data.message}`,
                        color: "red",
                        autoClose: 3000,
                        position: "top-right",
                    });
                }
            } catch (error) {
                setnewCate("")
                setNewValue("");
                setNewContent("");
                console.error("Có lỗi xảy ra khi thêm dữ liệu:", error);
            }
        } else {
            setTouchedFields({
                newContent: true,
                newValue: true,
                newCate: true,
            });
            return;
        }
    };

    const handleDelete = async (id: number | string) => {
        try {
            await dispatch(deleteEngineering_Technology(id));
            dispatch(
                Getall_Engineering_Technology({
                    id: IdBaogia,
                    page: 1,
                    size: 100,
                })
            );
            notifications.show({
                title: "Thành công",
                message: "Xóa thành công!",
                color: "green",
                position: "top-right",
            });
        } catch (error) {
            console.error("Error deleting or fetching:", error);
            notifications.show({
                title: "Lỗi!",
                message: "Có lỗi xảy ra khi xóa kỹ thuật công nghệ!",
                color: "green",
                position: "top-right",
            });
        }
    };

    const handleEdit = (index: number, item: any) => {
        setEditingRow(index);
        setEditData({ noiDung: item.noiDung, giaTri: item.giaTri });
    };

    const handleSaveEdit = async (id: string) => {
        try {
            const updatedItem = { ...editData, id };
            const dataUpdate = {
                id: updatedItem.id,
                noiDung: updatedItem.noiDung,
                giaTri: updatedItem.giaTri,
                baoGiaId: IdBaogia,
                sanPhamId: IdSanpham
            }
            await dispatch(upDateEngineering_Technology(dataUpdate)).unwrap();
            dispatch(
                Getall_Engineering_Technology({
                    id: IdBaogia || 1,
                    page: 1,
                    size: 100,
                })
            );
            notifications.show({
                title: "Thành công",
                message: "Dữ liệu đã được cập nhật thành công!",
                color: "green",
                position: "top-right"
            });
            setEditingRow(null);
            setEditData({ noiDung: "", giaTri: "" });

        } catch (error) {
            notifications.show({
                title: "Thất bại!",
                message: "Có lỗi xảy ra khi cập nhật dữ liệu!",
                color: "red",
                position: "top-right"
            });
            console.error("Lỗi khi lưu dữ liệu:", error);
        }
    };

    const rows = items?.result && items.result.length > 0 ? (
        items.result.map((item: any, index: number) => (
            <Table.Tr key={index}>
                {/* Nếu đang chỉnh sửa, hiển thị ô nhập liệu */}
                {editingRow === index ? (
                    <>
                        <Table.Td>
                            <TextInput
                                value={editData.noiDung}
                                onChange={(e) =>
                                    setEditData((prev) => ({
                                        ...prev,
                                        noiDung: e.target.value,
                                    }))
                                }
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                value={editData.giaTri}
                                onChange={(e) =>
                                    setEditData((prev) => ({
                                        ...prev,
                                        giaTri: e.target.value,
                                    }))
                                }
                            />
                        </Table.Td>
                        <Table.Td>
                            <ActionIcon
                                color="green"
                                style={{ margin: "0px 10px" }}
                                onClick={() => handleSaveEdit(item.id)}
                            >
                                <IconCheck size={20} />
                            </ActionIcon>

                            <ActionIcon
                                color="red"
                                style={{ margin: "0px 10px" }}
                                onClick={() => setEditingRow(null)}
                            >
                                <IconX size={20} />
                            </ActionIcon>
                        </Table.Td>
                    </>
                ) : (
                    <>
                        {/* Nếu không chỉnh sửa, hiển thị dữ liệu tĩnh */}
                        <Table.Td>
                            <Box>{item?.noiDung}</Box>
                        </Table.Td>
                        <Table.Td>{item?.giaTri}</Table.Td>
                        <Table.Td>
                            <ActionIcon
                                color="blue"
                                style={{ margin: "0px 10px" }}
                                onClick={() => handleEdit(index, item)}
                            >
                                <IconEdit size={20} />
                            </ActionIcon>

                            <ActionIcon
                                color="red"
                                onClick={() => handleDelete(item.id)}
                                style={{ margin: "0px 10px" }}
                            >
                                <IconTrash size={20} />
                            </ActionIcon>
                        </Table.Td>
                    </>
                )}
            </Table.Tr>
        ))
    ) : (
        <Table.Tr>
            <Table.Td colSpan={3} style={{ textAlign: "center" }}>
                Không có dữ liệu
            </Table.Td>
        </Table.Tr>
    );


    const selectOptionsCustomer = cate?.items?.content?.map((option: any) => ({
        value: option.id.toString(),
        label: option.ten,
    }));

    const submitDeleteQuote = async () => {
        try {
            await dispatch(deleteQuote(IdBaogia));
            router.push("/system/list_quote");
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };
    return (
        <>
            <div className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3">
                <h2>Kỹ thuật công nghệ!</h2>
            </div>

            <div className="bg-[#eceef0] p-4 rounded mb-3">
                <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                >
                    <Table.Thead className="bg-[#339af0] text-white ">
                        <Table.Tr>
                            <Table.Th>
                                Nội dung
                            </Table.Th>
                            <Table.Th>
                                Giá trị
                            </Table.Th>
                            <Table.Th>
                                Thao tác
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                {continuequote4 ? (
                    null
                ) : (  <Button
                    onClick={() => setOpened(true)}
                    variant="filled"
                    color="blue"
                    className="mt-1 mr-2 mt-2"
                >
                    Thêm công nghệ
                </Button>)}
               
                {continuequote4 ? (
                    <SanPhamMayChu />
                ) : (
                    <>
                        <div className="text-right">
                            <Button
                                variant="filled"
                                color="gray"
                                onClick={submitDeleteQuote}
                                className="mt-1 mr-2 mt-2"
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                onClick={() => {
                                    setContinueQuote(true);
                                }}
                                className="mt-1 mr-2 mt-2"
                            >
                                Tiếp tục báo giá
                            </Button>
                        </div>
                    </>
                )}
            </div>

            {/* Modal */}

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Kỹ thuật công nghệ"
                centered
                size="lg"
            >
                <TextInput
                    label="Nội dung"
                    placeholder="Nhập nội dung"
                    value={newContent}
                    withAsterisk
                    onChange={(e) => {
                        setNewContent(e.target.value);
                        setTouchedFields((prev) => ({ ...prev, newContent: true }));
                    }}
                    className="mb-3"
                    error={touchedFields.newContent && !newContent.trim() && "Nội dung không được để trống"}
                />
                <TextInput
                    label="Giá trị"
                    placeholder="Nhập giá trị"
                    withAsterisk
                    value={newValue}
                    onChange={(e) => {
                        setNewValue(e.target.value);
                        setTouchedFields((prev) => ({ ...prev, newValue: true }));
                    }}
                    className="mb-3"
                    error={touchedFields.newValue && !newValue.trim() && "Giá trị không được để trống"}
                />
                <Select
                    label="Danh mục"
                    placeholder="Chọn danh mục"
                    data={selectOptionsCustomer || []}
                    className="mb-3"
                    withAsterisk
                    value={newCate}
                    onChange={(value) => {
                        setnewCate(value);
                        setTouchedFields((prev) => ({ ...prev, newCate: true }));
                    }}
                    error={touchedFields.newCate && !newCate && "Danh mục không được bỏ trống"}
                />
                <Button onClick={handleAddInput} fullWidth>
                    Thêm kỹ thuật công nghệ
                </Button>
            </Modal>

        </>
    );
}

export default Engineering_Technology;
