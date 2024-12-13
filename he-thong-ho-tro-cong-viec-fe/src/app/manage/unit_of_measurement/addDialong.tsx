import { Modal, Button, TextInput, Textarea, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { addDonViTinh, fetchDonViTinh } from "@/store/slices/donvitinh/donViTinhAction";

interface Add_DonViTinh_DialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

export default function Add_DonViTinh_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: Add_DonViTinh_DialogProps) {
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
                if (!value)
                    return "Đơn vị  không được để trống";

                if (value.length >= 50) {
                    return "Số lượng không vượt quá 50 kí tự";
                }
                return null;
            },
            moTa: (value) => (!value ? "Mô tả không được để trống" : null),
        },
    });

    const handleSave = async (values: typeof form.values) => {
        const res = await dispatch(addDonViTinh(values));
        if (res.payload.code === 1000) {
            notifications.show({
                title: "Thêm thành công",
                message: "Đơn Vị Tính đã được thêm.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        } else {
            notifications.show({
                title: "Thêm thất bại",
                message: "Đơn Vị Tính không thể thêm.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
        await dispatch(fetchDonViTinh({ activePage, searchValue }));
        form.reset();
        onClose();
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={onClose}
                title="Thêm đơn vị tính"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleSave)}>
                    <TextInput
                        label="Đơn vị tính"
                        placeholder="Nhập tên đơn vị"
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
                        <Button type="submit" size="sm">
                            Thêm
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
