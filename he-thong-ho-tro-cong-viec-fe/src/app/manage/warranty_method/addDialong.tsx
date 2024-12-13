import { Modal, Button, TextInput, Textarea, Group, Select } from "@mantine/core";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { nestApiInstance } from "@/config/api";
import { PATHS } from "@/store/configPath";
import {
    addWarrantyMethod,
    fetchWarrantyMethod,
} from "@/store/slices/warrantymethod/warrantymethodAction";

interface NewDataWarrantyMethod {
    noiDung: string;
    moTa: string;
    baoHanhId: string;
}

interface AddWarrantyMethodDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

interface BaoHanh {
    id: number;
    moTa: string;
}

export default function Add_WarrantyMethod_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddWarrantyMethodDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [isLoading, setIsLoading] = useState(false);
    const [baoHanhOptions, setBaoHanhOptions] = useState<{ value: string, label: string }[]>([]);

    const form = useForm<NewDataWarrantyMethod>({
        initialValues: {
            noiDung: "",
            moTa: "",
            baoHanhId: "",
        },
        validate: {
            noiDung: (value) => {
                if (!value) return "Nội dung không được để trống";
                if (value.length >= 50) {
                    return "Số lượng không vượt quá 50 kí tự";
                }
                return null;
            },
            baoHanhId: (value) => (!value ? "Bảo hành không được để trống" : null),
            moTa: (value) => (!value ? "Mô tả không được để trống" : null),

        },
    });

    const loadBaoHanhOptions = async () => {
        setIsLoading(true);
        try {
            const response = await nestApiInstance.get(
                `${PATHS.WARRANTY}?page=1&size=100`
            );

            if (response.data && response.data.result && response.data.result.content) {
                const baoHanhData: BaoHanh[] = response.data.result.content;

                const options = baoHanhData.map(bh => ({
                    value: bh.id.toString(),
                    label: bh.moTa
                }));

                setBaoHanhOptions(options);
            } else {
                notifications.show({
                    title: "Thông báo",
                    message: "Không có dữ liệu bảo hành",
                    color: "blue",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error('Error fetching bao hanh:', error);
            notifications.show({
                title: "Lỗi",
                message: "Không thể tải danh sách bảo hành",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (opened) {
            loadBaoHanhOptions();
        }
    }, [opened]);

    const handleSave = async (values: NewDataWarrantyMethod) => {
        try {

            const formattedValues = {
                ...values,
                baoHanhId: Number(values.baoHanhId)
            };

            setIsLoading(true);

            const res = await dispatch(addWarrantyMethod(formattedValues));

            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Thêm thành công",
                    message: "Phương thức bảo hành đã được thêm thành công.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                await dispatch(fetchWarrantyMethod({ activePage, searchValue }));
                form.reset();
                onClose();
            } else {
                notifications.show({
                    title: "Thêm thất bại",
                    message: res.payload.message || "Phương thức bảo hành chưa được thêm.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error('Error saving:', error);
            notifications.show({
                title: "Lỗi",
                message: "Đã xảy ra lỗi khi thêm phương thức bảo hành.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={() => {
                form.reset();
                onClose();
            }}
            title="Thêm phương thức bảo hành"
            size="lg"
            padding="sm"
        >
            <form onSubmit={form.onSubmit(handleSave)}>
                <TextInput
                    label="Nội dung"
                    placeholder="Nhập nội dung bảo hành"
                    {...form.getInputProps("noiDung")}
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                />
                <Textarea
                    label="Mô tả"
                    placeholder="Nhập mô tả"
                    resize="vertical"
                    {...form.getInputProps("moTa")}
                    style={{ marginBottom: "1rem" }}
                    minRows={6}
                    maxRows={100}
                    autosize
                />
                <Select
                    label="Bảo hành"
                    placeholder="Chọn bảo hành"
                    data={baoHanhOptions}
                    value={form.values.baoHanhId}
                    onChange={(value) => {
                        form.setFieldValue("baoHanhId", value || "");
                    }}
                    error={form.errors.baoHanhId}
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                    searchable
                    clearable
                />
                <Group mt="xl" justify="flex-end">
                    <Button
                        type="submit"
                        size="sm"
                        loading={isLoading}
                    >
                        Thêm
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}