import { Modal, Button, TextInput, Textarea, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { addPay, fetchPay } from "@/store/slices/pay/payAction";

interface AddPayDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

export default function Add_Pay_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddPayDialogProps) {
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
                    return "Phương thức chuyển khoản không được để trống";

                if (value.length >= 255) {
                    return "Số lượng không vượt quá 255 kí tự";
                }
                return null;
            },
            moTa: (value) => (!value ? "Mô tả không được để trống" : null),
        },
    });

    const handleSave = async (values: typeof form.values) => {
        const res = await dispatch(addPay(values));
        if (res.payload.code === 1000) {
            notifications.show({
                title: "Thêm thành công",
                message: "Phương thức thanh toán đã được thêm.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        } else {
            notifications.show({
                title: "Thêm thất bại",
                message: "Phương thức thanh toán không thể thêm.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
        await dispatch(fetchPay({ activePage, searchValue }));
        form.reset();
        onClose();
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={onClose}
                title="Thêm phương thức thanh toán"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleSave)}>
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
                        <Button type="submit" size="sm">
                            Thêm
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
