import { Modal, Button, TextInput, Textarea, Group } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { AddCate, fetchCate } from "@/store/slices/cate/cateAction";



interface AddMaychuDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

export default function Add_Nhomktcn_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddMaychuDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
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
            moTa: (value: string) => (!value ? "Mô tả không được để trống" : null),


        },
    });

    const handleSave = async (values: typeof form.values) => {
        try {
            await dispatch(AddCate(values));
            notifications.show({
                title: "Thêm thành công",
                message: "Danh mục đã được thêm thành công!",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
            await dispatch(fetchCate({ activePage, searchValue }));
            form.reset();
            onClose();
        } catch (error) {
            notifications.show({
                title: "Thêm thất bại",
                message: "Có lỗi xảy ra khi thêm danh mục!",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
    };

    return (
        <>

            <Modal
                opened={opened}
                onClose={onClose}
                title="Thêm danh mục"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleSave)}>
                    <TextInput
                        label="Tên"
                        placeholder="Nhập tên danh mục"
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
                        <Button type="submit" size="sm" >
                            Thêm
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
