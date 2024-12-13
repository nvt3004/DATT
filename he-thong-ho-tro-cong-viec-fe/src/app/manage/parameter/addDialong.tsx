import { Modal, Button, TextInput, Textarea, Group } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import {
    addThongso,
    fetchThongso,
} from "@/store/slices/thongso/thongsoAction";

interface AddThongsoDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

export default function Add_AddThongso_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddThongsoDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
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

    const handleSave = async (values: typeof form.values) => {
        const res = await dispatch(addThongso(values));
        if (res.payload.code === 1000) {
            notifications.show({
                title: "Thêm thành công",
                message: "Thông số đã được thêm.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        } else {
            notifications.show({
                title: "Thêm thất bại",
                message: "Thông số chưa được thêm.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
        await dispatch(fetchThongso({ activePage, searchValue }));
        form.reset();
        onClose();
    };

    return (
        <>

            <Modal
                opened={opened}
                onClose={onClose}
                title="Thêm thông số"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleSave)}>
                    <TextInput
                        label="Mã"
                        placeholder="Nhập Mã thông số"
                        key={form.key("ma")}
                        {...form.getInputProps("ma")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextInput
                        label="Tên"
                        placeholder="Nhập tên thông số"
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
                        minRows={4}
                        maxRows={10}
                        autosize
                    />
                    <Group mt="xl" justify="flex-end">
                        <Button type="submit" size="sm" >
                            Thêm
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
