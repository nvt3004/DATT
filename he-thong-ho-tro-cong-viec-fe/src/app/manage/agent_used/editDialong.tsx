"use client";
import { Modal, Button, TextInput, Group, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {  useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import {
    fetchAgent,
    updateAgent,
} from "@/store/slices/agent_used/agentUsedAction";

interface Edit_Agent_Dialog_Props {
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

export default function Edit_Agent_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: Edit_Agent_Dialog_Props) {
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
                if (!value) return "Tác nhân không được để trống";

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

    const handleUpdate = async (values: typeof form.values) => {
        const res = await dispatch(updateAgent(values));
        if(res.payload.code === 1000){
            notifications.show({
                title: "Chỉnh sửa thành công",
                message: "Tác nhân đã chỉnh sửa.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        }else{
            notifications.show({
                title: "Chỉnh sửa thất bại",
                message: "Có lỗi xảy ra khi cập nhật tác nhân không thành công.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
        await dispatch(fetchAgent({ activePage, searchValue }));
        onClose();
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

            <Modal
                opened={opened}
                onClose={onClose}
                title="Cập nhật tác nhân"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleUpdate)}>
                    <TextInput
                     
                        placeholder="Nhập tên tác nhân"
                        key={form.key("id")}
                        {...form.getInputProps("id")}
                        size="sm"
                        type="hidden"
                        style={{ marginBottom: "1rem" }}
                    />
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
                            Cập nhật
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
