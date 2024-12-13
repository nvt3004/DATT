import {
    addProductPackage,
    fetchProductPackage,
} from "@/store/slices/product_pakage/productPackageAction";
import { Modal, Button, TextInput, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

interface AddProductPackageDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

export default function Add_ProductPackage_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddProductPackageDialogProps) {
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
                if (!value) return "Tư vấn không được để trống";

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

    const handleSave = async (values: typeof form.values) => {
        const res = await dispatch(addProductPackage(values));

        if (res?.payload?.code === 1000) {
            notifications.show({
                title: "Thêm thành công",
                message: "Gói sản phẩm đã được thêm.",
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
        await dispatch(fetchProductPackage({ activePage, searchValue }));
        form.reset();
        onClose();
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={onClose}
                title="Thêm gói sản phẩm"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleSave)}>
                    <TextInput
                        label="Gói sản phẩm"
                        placeholder="Nhập gói sản phẩm"
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
