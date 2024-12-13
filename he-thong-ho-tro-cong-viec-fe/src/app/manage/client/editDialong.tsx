import { Modal, Button, TextInput, Group, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { fetchCustomer, updateCustomer } from "@/store/slices/client/clientAction";

interface EditCustomerDialogProps {
    opened: boolean;
    onClose: () => void;
    Data?: {
        id: string;
        ten: string;
        moTa: string;
        danhXung: any | number;
    };
    activePage: number;
    searchValue: string | undefined;
}

export default function Edit_Customer_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: EditCustomerDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
            id: "",
            ten: "",
            moTa: "",
            danhXung: "",
        },
        validate: {
            ten: isNotEmpty("Tên khách hàng không được để trống"),
            moTa: isNotEmpty("Mô tả không được để trống"),
            danhXung: isNotEmpty("Danh xưng không được để trống"),
        },
    });

    const handleUpdate = async (values: typeof form.values) => {
        const convertData = {
            id: values.id,
            ten: values.ten,
            moTa: values.moTa,
            danhXung: Number(values.danhXung),
        };

        const res = await dispatch(updateCustomer(convertData));
        await dispatch(fetchCustomer({ activePage, searchValue }));

        if (res?.payload?.code === 1000) {
            notifications.show({
                title: "Chỉnh sửa thành công",
                message: "Khách hàng đã chỉnh sửa.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        } else {
            notifications.show({
                title: "Chỉnh sửa thất bại",
                message: "Khách hàng không được chỉnh sửa.",
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
                moTa: Data.moTa || "",
                danhXung: Data.danhXung.toString() || "",
            });
        }
    }, [Data]);

    return (
        <Modal opened={opened} onClose={onClose} title="Cập nhật khách hàng" size="lg" padding="sm">
            <form onSubmit={form.onSubmit(handleUpdate)}>
                <TextInput
                    label="Tên khách hàng"
                    placeholder="Nhập tên khách hàng"
                    {...form.getInputProps("ten")}
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                />
                <TextInput
                    label="Mô tả"
                    placeholder="Nhập mô tả"
                    {...form.getInputProps("moTa")}
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                />
                <Select
                    label="Danh xưng"
                    placeholder="Chọn danh xưng"
                    data={[
                        { value: "1", label: "Mr" },
                        { value: "2", label: "Ms" },
                        { value: "3", label: "Mss" },
                        { value: "4", label: "Mrs" },
                        { value: "5", label: "Trường" },
                        { value: "6", label: "Doanh nghiệp" },
                    ]}
                    {...form.getInputProps("danhXung")}
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
    );
}
