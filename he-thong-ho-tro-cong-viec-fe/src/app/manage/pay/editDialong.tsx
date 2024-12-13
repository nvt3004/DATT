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
import {  useForm } from "@mantine/form";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { fetchPay, updatePay } from "@/store/slices/pay/payAction";

interface Edit_pay_Dialog_Props {
    opened: boolean;
    onClose: () => void;
    Data:
        | {
              id: string;
              ten: string;
              moTa: string;
          }
        | undefined;
    activePage: number ;
    searchValue: string | undefined;
}

export default function Edit_pay_Dialog({
    opened,
    onClose,
    Data,
    activePage, 
    searchValue
}: Edit_pay_Dialog_Props) {
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
                if (!value) return "Phương thức chuyển khoản không được để trống";

                if (value.length >= 50) {
                    return "Số lượng không vượt quá 50 kí tự";
                }
                return null; 
            }, 
            moTa: (value) => (!value ? "Mô tả không được để trống" : null),
        },
    });

    const handleUpdate = async (values: typeof form.values) => {
        const res = await dispatch(updatePay(values));
        await dispatch(fetchPay({activePage , searchValue}));
        if(res.payload.code === 1000){
            notifications.show({
                title: "Chỉnh sửa thành công",
                message: "Phương thức thanh toán đã chỉnh sửa.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        }else{
            notifications.show({
                title: "Chỉnh sửa thất bại",
                message: `Phương thức thanh toán không được chỉnh sửa.`,
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
        form.reset();
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
                title="Cập nhật phương thức thanh toán"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleUpdate)}>
                    <TextInput
                        
                        placeholder="Nhập tên phương thức chuyển khoản"
                        key={form.key("id")}
                        {...form.getInputProps("id")}
                        size="sm"
                        type="hidden"
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextInput
                        label="Phương thức chuyển khoản"
                        placeholder="Nhập tên phương thức"
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
