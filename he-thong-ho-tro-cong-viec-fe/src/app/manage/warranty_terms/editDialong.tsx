import { Modal, Button, TextInput, Group, Textarea, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { nestApiInstance } from "@/config/api";
import { PATHS } from "@/store/configPath";
import {
    fetchWarrantyTerm,
    updateWarrantyTerm,
} from "@/store/slices/warrantytermsc/warrantytermAction";

interface ActiveWarrantyTerm {
    id: string;
    noiDung: string;
    moTa: string;
    baoHanh: number;
}

interface EditWarrantyTermDialogProps {
    opened: boolean;
    onClose: () => void;
    Data: ActiveWarrantyTerm | undefined;
    activePage: number;
    searchValue: string | undefined;
}

interface EditDataWarrantyTerm {
    id: string;
    noiDung: string;
    moTa: string;
    baoHanhId: string;
}

interface BaoHanh {
    id: number;
    moTa: string;
}


interface ApiResponse {
    result: {
        content: BaoHanh[];
        totalElements: number;
    };
}


export default function Edit_WarrantyTerm_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: EditWarrantyTermDialogProps) {
    const [loading, setLoading] = useState(false);
    const [baoHanhOptions, setBaoHanhOptions] = useState<{ value: string, label: string }[]>([]);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const form = useForm<EditDataWarrantyTerm>({
        initialValues: {
            id: "",
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

    const loadAllBaoHanh = async () => {
        setLoading(true);
        try {
            const initialResponse = await nestApiInstance.get<ApiResponse>(
                `${PATHS.WARRANTY}?page=1&size=1`
            );

            const totalElements = initialResponse.data.result.totalElements;

            const response = await nestApiInstance.get<ApiResponse>(
                `${PATHS.WARRANTY}?size=${totalElements}`
            );

            if (response.data?.result?.content) {
                const baoHanhData = response.data.result.content;
                const options = baoHanhData.map(bh => ({
                    value: bh.id.toString(), // Sử dụng mocThoiGian làm value
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
            setLoading(false);
        }
    };

    const handleUpdate = async (values: EditDataWarrantyTerm) => {
        setLoading(true);
        try {
            const formattedValues = {
                ...values,
                baoHanhId: Number(values.baoHanhId),
            };
            const res = await dispatch(updateWarrantyTerm(formattedValues));
            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Cập nhật thành công",
                    message: "Điều khoản bảo hành đã được cập nhật.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                await dispatch(fetchWarrantyTerm({ activePage, searchValue }));
                form.reset();
                onClose();
            } else {
                notifications.show({
                    title: "Cập nhật thất bại",
                    message: res.payload.message || "Không thể cập nhật điều khoản bảo hành.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            notifications.show({
                title: "Lỗi",
                message: "Đã xảy ra lỗi khi cập nhật điều khoản bảo hành.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (Data) {
            form.setValues({
                id: Data.id,
                noiDung: Data.noiDung,
                moTa: Data.moTa,
                baoHanhId: Data.baoHanh.toString(),
            });
        }
    }, [Data]);

    useEffect(() => {
        if (opened) {
            loadAllBaoHanh();
        }
    }, [opened]);

    return (
        <Modal
            opened={opened}
            onClose={() => {
                form.reset();
                onClose();
            }}
            title="Chỉnh sửa điều khoản bảo hành"
            size="lg"
            padding="sm"
        >
            <form onSubmit={form.onSubmit(handleUpdate)}>
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
                    <Button type="submit" size="sm" loading={loading}>
                        Cập nhật
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}
