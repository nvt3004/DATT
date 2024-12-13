"use client";
import { Modal, Button, TextInput, Group, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {  useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { fetchProductPackage, updateProductPackage } from "@/store/slices/product_pakage/productPackageAction";

interface Edit_ProductPackage_Dialog_Props {
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

export default function Edit_ProductPackage_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: Edit_ProductPackage_Dialog_Props) {
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
                if (!value) return "Tư vấn không được để trống";

                if (value.length >= 200) {
                    return "Số lượng không vượt quá 200 kí tự";
                }
                return null;
            },
           
        },
    });

    const handleUpdate = async (values: typeof form.values) => {
        const res = await dispatch(updateProductPackage(values));
        if(res.payload.code === 1000){
            notifications.show({
                title: "Chỉnh sửa thành công",
                message: "Gói sản phẩm đã chỉnh sửa.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        }else{
            notifications.show({
                title: "Chỉnh sửa thất bại",
                message: `${res.payload.response.data.message}`,
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
        await dispatch(fetchProductPackage({ activePage, searchValue }));
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
                title="Cập nhật gói sản phẩm"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleUpdate)}>
                    <TextInput
                     
                        placeholder="Nhập Gói sản phẩm"
                        key={form.key("id")}
                        {...form.getInputProps("id")}
                        size="sm"
                        type="hidden"
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextInput
                        label="Gói sản phẩm"
                        placeholder="Nhập Gói sản phẩm"
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
                        minRows={50}  
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
