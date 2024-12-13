"use client";
import { Modal, Button, TextInput, Group, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import {
    fetchThongso,
    updateThongso,
} from "@/store/slices/thongso/thongsoAction";

interface Edit_Thongso_Dialog_Props {
    opened: boolean;
    onClose: () => void;
    Data: {
        id: string;
        ma: string;
        ten: string;
        moTa: string;
    } | undefined;
    activePage: number;
    searchValue: string | undefined;
}

export default function Edit_Thongso_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: Edit_Thongso_Dialog_Props) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
            id: "",
            ma: "",
            ten: "",
            moTa: "",
        },
        validate: {
            ten: (value: string) => {
                if (!value) return "Tên không được để trống";
                if (value.length >= 50) {
                    return "Số lượng không vượt quá 50 kí tự";
                }
                return null;
            },
            ma: (value: string) => {
                if (!value) return "Mã không được để trống";
                return null;
            },
            moTa: (value: string) => {
                if (!value) return "Mô tả không được để trống";
                if (value.length >= 100) {
                    return "Mô tả không vượt quá 100 kí tự";
                }
                return null;
            },
        },
    });

    const handleUpdate = async (values: typeof form.values) => {
        setLoading(true); // Bắt đầu loading
        try {
            const res = await dispatch(updateThongso(values));
            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Chỉnh sửa thành công",
                    message: "Thông số đã chỉnh sửa.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
            } else {
                notifications.show({
                    title: "Chỉnh sửa thất bại",
                    message: "Có lỗi xảy ra khi cập nhật thông số không thành công.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
            await dispatch(fetchThongso({ activePage, searchValue }));
            onClose();
        } catch (error) {
            notifications.show({
                title: "Lỗi hệ thống",
                message: "Đã xảy ra lỗi khi cập nhật thông số.",
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
                ma: Data.ma || "",
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
                title="Cập nhật thông số"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleUpdate)}>
                    <TextInput
                        placeholder="Id"
                        {...form.getInputProps("id")}
                        type="hidden"
                    />
                    <TextInput
                        label="Mã "
                        placeholder="Nhập mã thông số"
                        {...form.getInputProps("ma")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextInput
                        label="Tên Thông số"
                        placeholder="Nhập tên thông số"
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
                        minRows={4}
                        maxRows={10}
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
