"use client";
import { Modal, Button, TextInput, Group, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import { UpdateCate, fetchCate } from "@/store/slices/cate/cateAction";
import { fetchMaychu } from "@/store/slices/maychu/maychuAction";

interface Edit_Nhomktcn_Dialog_Props {
    opened: boolean;
    onClose: () => void;
    Data: {
        id: string;
        ten: string;
        moTa: string;
    } | any;
    activePage: number;
    searchValue: string | undefined;
}

export default function Edit_Nhomktcn_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: Edit_Nhomktcn_Dialog_Props) {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState<string>("");   // State cho id
    const [ten, setTen] = useState<string>("");  // State cho ten
    const [moTa, setMota] = useState<string>("");   // State cho id
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const handleUpdate = async () => {
        setLoading(true);
        const values = { id, ten, moTa };
        try {
            await dispatch(UpdateCate(values));
            await dispatch(fetchCate({ activePage, searchValue }));
            notifications.show({
                title: "Chỉnh sửa thành công",
                message: "Danh mục đã chỉnh sửa thành công!",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
            onClose();
        } catch (error) {
            notifications.show({
                title: "Lỗi hệ thống",
                message: "Đã xảy ra lỗi khi cập nhật danh mục!",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    // Cập nhật giá trị của input khi `Data` thay đổi
    useEffect(() => {
        if (Data) {
            setId(Data.id || "");
            setTen(Data.ten || "");
            setMota(Data.moTa || "")
        }
    }, [Data]);

    return (
        <>
            <FullScreenLoader visible={loading} />
            <Modal
                opened={opened}
                onClose={onClose}
                title="Cập nhật danh mục"
                size="lg"
                padding="sm"
            >
                <TextInput
                    placeholder="ID"
                    value={id} // Sử dụng giá trị từ state
                    onChange={(e) => setId(e.target.value)} // Cập nhật giá trị state khi người dùng thay đổi
                    type="hidden"
                />
                <TextInput
                    label="Tên danh mục"
                    placeholder="Nhập tên danh mục"
                    value={ten} // Sử dụng giá trị từ state
                    onChange={(e) => setTen(e.target.value)} // Cập nhật giá trị state khi người dùng thay đổi
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                />
                <Textarea
                    label="Mô tả"
                    placeholder="Nhập mô tả"
                    resize="vertical"
                    value={moTa}
                    onChange={(e) => setMota(e.target.value)}
                    style={{ marginBottom: "1rem" }}
                    minRows={6}
                    maxRows={100}
                    autosize
                />

                <Group mt="xl" justify="flex-end">
                    <Button
                        size="sm"
                        onClick={handleUpdate} // Gọi handleUpdate khi nhấn nút
                        disabled={loading}
                    >
                        Cập nhật
                    </Button>
                </Group>
            </Modal>
        </>
    );
}
