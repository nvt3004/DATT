"use client";
import {
    Modal,
    Button,
    TextInput,
    Group,
    Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import { fetchDonViTinh, updateDonViTinh } from "@/store/slices/donvitinh/donViTinhAction";

interface Edit_donvitinh_Dialog_Props {
    opened: boolean;
    onClose: () => void;
    Data:
    | {
        id: string;
        ten: string;
        moTa: string;
    }
    | undefined;
    activePage: number;
    searchValue: string | undefined;
}

export default function Edit_donvitinh_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue
}: Edit_donvitinh_Dialog_Props) {
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
                if (!value) return "Đơn vị tính không được để trống";

                if (value.length >= 50) {
                    return "Số lượng không vượt quá 50 kí tự";
                }
                return null;
            },
            moTa: (value) => (!value ? "Mô tả không được để trống" : null),
        },
    });

 // In Edit_donvitinh_Dialog:
const handleUpdate = async (values: typeof form.values) => {
    if (!values.id) {
        notifications.show({
            title: "Lỗi cập nhật",
            message: "Không tìm thấy ID của đơn vị tính",
            color: "red",
            autoClose: 3000,
            position: "top-right",
        });
        return;
    }
    
    setLoading(true);
    try {
        const res = await dispatch(updateDonViTinh(values));
        if (res.payload.code === 1000) {
            notifications.show({
                title: "Chỉnh sửa thành công",
                message: "Đơn Vị Tính đã được cập nhật",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
            await dispatch(fetchDonViTinh({ activePage, searchValue }));
            onClose();
        } else {
            throw new Error(res.payload.message || "Cập nhật thất bại");
        }
    } catch (error) {
        notifications.show({
            title: "Lỗi cập nhật",
            message:"Đã xảy ra lỗi khi cập nhật đơn vị tính",
            color: "red",
            autoClose: 3000,
            position: "top-right",
        });
    } finally {
        setLoading(false);
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
                title="Cập nhật đơn vị tính"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleUpdate)}>
                    <TextInput

                        placeholder="Nhập tên Đơn Vị Tính"
                        key={form.key("id")}
                        {...form.getInputProps("id")}
                        size="sm"
                        type="hidden"
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextInput
                        label="Đơn Vị Tính"
                        placeholder="Nhập tên Đơn Vị Tính"
                        key={form.key("ten")}
                        {...form.getInputProps("ten")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                    />
                    <Textarea
                        label="Mô tả"
                        placeholder="Nhập mô tả"
                        resize="vertical"
                        key={form.key("moTa")}
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
