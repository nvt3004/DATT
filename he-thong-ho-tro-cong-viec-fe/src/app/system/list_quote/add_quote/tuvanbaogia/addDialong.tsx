import { Modal, Button, TextInput, Group, Select } from "@mantine/core";
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { addAdvise, fetchAdvise } from "@/store/slices/advise/adviseAction";

interface AddAdviseDialogProps {
    opened: boolean;
    onClose: () => void;
}

export default function Add_Advise_Dialog({
    opened,
    onClose,
}: AddAdviseDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
            ten: "",
            soDienThoai: "",
            email: "",
            danhXungTen: "",
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
            danhXungTen: isNotEmpty("Danh xưng không được để trống "),
        },
    });

    const handleSave = async (values: typeof form.values) => {
        const convertData = {
            ten: values.ten,
            soDienThoai: values.soDienThoai,
            email: values.email,
            danhXungId: Number(values.danhXungTen),
        };

        const res = await dispatch(addAdvise(convertData));

        if (res.payload.code === 1000) {
            notifications.show({
                title: "Thêm thành công",
                message: "Tư vấn đã được thêm.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
           
        } else {
            notifications.show({
                title: "Thêm Thất bại",
                message: `${res.payload.response.data.message}`,
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
        const activePage = 1;
        const searchValue = "100";
        await dispatch(fetchAdvise({ activePage, searchValue }));
        form.reset();
        onClose();
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={onClose}
                title="Thêm Tư Vấn Mới"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleSave)}>
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
                        key={form.key("danhXungTen")}
                        data={[
                            { value: "1", label: "Mr" },
                            { value: "2", label: "Ms" },
                            { value: "3", label: "Mss" },
                            { value: "4", label: "Mrs" },
                            { value: "5", label: "Trường" },
                            { value: "6", label: "Doanh nghiệp" },
                        ]}
                        {...form.getInputProps("danhXungTen")}
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
        </>
    );
}
