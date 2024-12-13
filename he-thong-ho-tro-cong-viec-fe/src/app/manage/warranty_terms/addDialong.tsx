import { Modal, Button, TextInput, Textarea, Group, Select } from "@mantine/core";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { nestApiInstance } from "@/config/api";
import { PATHS } from "@/store/configPath";
import {
    addWarrantyTerm,
    fetchWarrantyTerm,
} from "@/store/slices/warrantytermsc/warrantytermAction";

interface NewDataWarrantyTerm {
    noiDung: string;
    moTa: string;
    baoHanhId: string;
}

interface AddWarrantyTermDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

interface BaoHanh {
    id: number;
    moTa: string;
}

export default function Add_WarrantyTerm_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddWarrantyTermDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [isLoading, setIsLoading] = useState(false);
    const [baoHanhOptions, setBaoHanhOptions] = useState<{ value: string, label: string }[]>([]);

    const form = useForm<NewDataWarrantyTerm>({
        initialValues: {
            noiDung: "",
            moTa: "",
            baoHanhId: "",
        },
        validate: {
            noiDung: (value) => (!value ? "Nội dung không được để trống" : null),
            baoHanhId: (value) => (!value ? "Bảo hành không được để trống" : null),
            moTa: (value) => (!value ? "Mô tả không được để trống" : null),

        },
    });

    const loadBaoHanhOptions = async () => {
        setIsLoading(true);
        try {
            const response = await nestApiInstance.get(`${PATHS.WARRANTY}?page=1&size=100`);
            if (response.data?.result?.content) {
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

    const handleSave = async (values: NewDataWarrantyTerm) => {
        setIsLoading(true);
        try {
            const formattedValues = {
                ...values,
                baoHanhId: Number(values.baoHanhId),
            };
            const res = await dispatch(addWarrantyTerm(formattedValues));
            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Thêm thành công",
                    message: "Điều khoản bảo hành đã được thêm thành công.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                await dispatch(fetchWarrantyTerm({ activePage, searchValue }));
                form.reset();
                onClose();
            } else {
                notifications.show({
                    title: "Thêm thất bại",
                    message: res.payload.message || "Điều khoản bảo hành chưa được thêm.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            notifications.show({
                title: "Lỗi",
                message: "Đã xảy ra lỗi khi thêm điều khoản bảo hành.",
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
            title="Thêm điều khoản bảo hành"
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
                    onChange={(value) => form.setFieldValue("baoHanhId", value || "")}
                    error={form.errors.baoHanhId}
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                    searchable
                    clearable
                />
                <Group mt="xl" justify="flex-end">
                    <Button type="submit" size="sm" loading={isLoading}>
                        Thêm
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}
