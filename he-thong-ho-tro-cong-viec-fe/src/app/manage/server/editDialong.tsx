"use client";
import { Modal, Button, TextInput, Group, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import {
    fetchMaychu,
    updateMaychu,
} from "@/store/slices/maychu/maychuAction";

interface Edit_Maychu_Dialog_Props {
    opened: boolean;
    onClose: () => void;
    Data: {
        id: string;
        ten: string;
        moTa: string;
    } | undefined;
    activePage: number;
    searchValue: string | undefined;
}

export default function Edit_Maychu_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: Edit_Maychu_Dialog_Props) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
            id: "",
            ten: "",
            moTa: "",
        },

        validate: {
            ten: (value: string) => {
                if (!value) return "Máy chủ không được để trống";
                if (value.length >= 50) return "Số lượng không vượt quá 50 kí tự";
                return null;
            },
            moTa: (value: string) => {
                if (!value) return "Mô Tả không được để trống"
                return null;
            },
        },

        
    });



    const handleUpdate = async (values: typeof form.values) => {
        setLoading(true); // Bắt đầu loading
        try {
            const res = await dispatch(updateMaychu(values));
            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Chỉnh sửa thành công",
                    message: "Máy chủ đã chỉnh sửa.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
            } else {
                notifications.show({
                    title: "Chỉnh sửa thất bại",
                    message: "Có lỗi xảy ra khi cập nhật máy chủ không thành công.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
            await dispatch(fetchMaychu({ activePage, searchValue }));
            onClose();
        } catch (error) {
            notifications.show({
                title: "Lỗi hệ thống",
                message: "Đã xảy ra lỗi khi cập nhật máy chủ.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    useEffect(() => {
        if (Data) {
            form.setValues({
                id: Data.id || "",
                ten: Data.ten || "",
                moTa: Data.moTa || "",
            });
        }
    }, [Data]);

    

    return (
        <>
            <FullScreenLoader visible={loading} />
            <Modal
                opened={opened}
                onClose={onClose}
                title="Cập nhật máy chủ"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleUpdate)}>
                    <TextInput
                        placeholder="ID"
                        {...form.getInputProps("id")}
                        type="hidden" // Giữ trường ẩn
                    />
                    <TextInput
                        label="Tên Máy chủ"
                        placeholder="Nhập tên Máy chủ"
                        {...form.getInputProps("ten")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                    />
                    <Textarea
                        label="Mô tả"
                        placeholder="Nhập mô tả"
                        resize="vertical"
                        {...form.getInputProps("moTa")}
                        style={{ marginBottom: "1rem" }}
                        minRows={6}
                        maxRows={100}
                        autosize
                    />

                    <Group mt="xl" justify="flex-end">
                        <Button type="submit" size="sm" disabled={loading}>
                            Cập nhật
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
