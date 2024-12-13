import { Modal, Button, TextInput, Group, Select } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { addCustomer, fetchCustomer } from "@/store/slices/client/clientAction";

interface AddCustomerDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

export default function Add_Customer_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddCustomerDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
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

    const handleSave = async (values: typeof form.values) => {
        const convertData = {
            ten: values.ten,
            moTa: values.moTa,
            danhXung: Number(values.danhXung),
        };

        const res = await dispatch(addCustomer(convertData));

        if (res.payload.code === 1000) {
            notifications.show({
                title: "Thêm thành công",
                message: "Khách hàng đã được thêm.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        } else {
            notifications.show({
                title: "Thêm thất bại",
                message: `${res.payload.response.data.message}`,
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
        await dispatch(fetchCustomer({ activePage, searchValue }));
        form.reset();
        onClose();
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Thêm khách hàng" size="lg" padding="sm">
            <form onSubmit={form.onSubmit(handleSave)}>
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
                        Thêm
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}
