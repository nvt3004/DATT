import { Modal, Button, TextInput, Textarea, Group } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import {
    addMaychu,
    fetchMaychu,
} from "@/store/slices/maychu/maychuAction";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

interface AddMaychuDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

export default function Add_Maychu_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddMaychuDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [loading, setLoading] = useState(false);

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
            moTa: (value: string) => {
                if (!value) return "Mô Tả không được để trống"
                return null;
            },

        },
    });

    const handleSave = async (values: typeof form.values) => {
        setLoading(true);
        const res = await dispatch(addMaychu(values));
        if (res.payload.code === 1000) {
            notifications.show({
                title: "Thêm thành công",
                message: "Máy chủ đã được thêm.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
            setLoading(false);
        } else {
            notifications.show({
                title: "Thêm thất bại",
                message: "Máy chủ chưa được thêm.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
        await dispatch(fetchMaychu({ activePage, searchValue }));
        form.reset();
        onClose();
    };

    return (
        <>
            <FullScreenLoader visible={loading} />
            <Modal
                opened={opened}
                onClose={onClose}
                title="Thêm máy chủ"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleSave)}>
                    <TextInput
                        label="Tên"
                        placeholder="Nhập tên máy chủ"
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
