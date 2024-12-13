"use client";
import {
    Modal,
    Button,
    TextInput,
    Group,
    
    Select,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { fetchAdvise, updateAdvise } from "@/store/slices/advise/adviseAction";

interface Edit_Advise_Dialog_Props {
    opened: boolean;
    onClose: () => void;
    Data?: {
        id: string;
        ten: string;
        soDienThoai: string;
        email: string;
        danhXung: any | number;
    };
    activePage: number;
    searchValue: string | undefined;
}

export default function Edit_Advise_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: Edit_Advise_Dialog_Props) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
            id: "",
            ten: "",
            soDienThoai: "",
            email: "",
            danhXungId: "",
        },
        validate: {
            ten: (value: string) => {
                if (!value) return "Tư vấn không được để trống";

                if (value.length >= 50) {
                    return "Số lượng không vượt quá 50 kí tự";
                }
                return null;
            },
            soDienThoai: matches(
                /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                "Số điện thoại không hợp lệ"
            ),
            email: isEmail("Email không hợp lệ"),
            danhXungId: isNotEmpty("Danh xưng không được để trống "),
        },
    });

    const handleUpdate = async (values: typeof form.values) => {

        const res = await dispatch(updateAdvise(values));
        await dispatch(fetchAdvise({ activePage, searchValue }));
        if (res?.payload?.code === 1000) {
            notifications.show({
                title: "Chỉnh sửa thành công",
                message: "Tư vấn đã chỉnh sửa.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        } else {
            notifications.show({
                title: "Chỉnh sửa thất bại",
                message: `Tư vấn không được chỉnh sửa.`,
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }

        onClose();
    };
    useEffect(() => {
        if (Data) {
            form.setValues({
                id: Data.id || "",
                ten: Data.ten || "",
                soDienThoai: Data.soDienThoai || "",
                email: Data.email || "",
                danhXungId: Data.danhXung.toString() || "",
            });
        }
    }, [Data]);
    return (
        <>
            <Modal
                opened={opened}
                onClose={onClose}
                title="Cập nhật tư vấn"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleUpdate)}>
                    <TextInput
                        label="Tên tư vấn"
                        placeholder="Nhập tên tư vấn"
                        key={form.key("ten")}
                        {...form.getInputProps("ten")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                    />

                    <TextInput
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        key={form.key("soDienThoai")}
                        {...form.getInputProps("soDienThoai")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Nhập email"
                        key={form.key("email")}
                        {...form.getInputProps("email")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                    />
                    <Select
                        label="Danh xưng"
                        placeholder="Chọn danh xưng"
                        key={form.key("danhXung")}
                        data={[
                            { value: "1", label: "Mr" },
                            { value: "2", label: "Ms" },
                            { value: "3", label: "Mss" },
                            { value: "4", label: "Mrs" },
                            { value: "5", label: "Trường" },
                            { value: "6", label: "Doanh nghiệp" },
                        ]}
                        {...form.getInputProps("danhXungId")}
                        style={{ marginBottom: "1rem" }}
                        size="sm"
                    />

                    <Group mt="xl" justify="flex-end">
                        <Button type="submit" size="sm">
                            Cập nhật
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
