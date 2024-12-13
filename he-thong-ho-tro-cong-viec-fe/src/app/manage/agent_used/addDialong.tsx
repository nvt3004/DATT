import { Modal, Button, TextInput, Textarea, Group } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import {
    addAgent,
    fetchAgent,
} from "@/store/slices/agent_used/agentUsedAction";

interface AddAgentDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

export default function Add_Agent_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddAgentDialogProps) {
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
            moTa: (value: string) => {
                if (!value) return "Mô tả không được để trống";

                if (value.length >= 250) {
                    return "Số lượng không vượt quá 250 kí tự";
                }
                return null;
            },
        },
    });

    const handleSave = async (values: typeof form.values) => {
        const res = await dispatch(addAgent(values));
        if (res.payload.code === 1000) {
            notifications.show({
                title: "Thêm thành công",
                message: "Tác nhân đã được thêm.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        } else {
            notifications.show({
                title: "Thêm thất bại",
                message: "Tác nhân chưa được thêm.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
        await dispatch(fetchAgent({ activePage, searchValue }));
        form.reset();
        onClose();
    };

    return (
        <>

            <Modal
                opened={opened}
                onClose={onClose}
                title="Thêm tác nhân"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleSave)}>
                    <TextInput
                        label="Tên tác nhân"
                        placeholder="Nhập tên tác nhân"
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
