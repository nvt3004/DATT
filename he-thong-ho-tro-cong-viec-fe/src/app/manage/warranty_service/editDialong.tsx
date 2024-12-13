"use client";
import { Modal, Button, TextInput, Group, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { nestApiInstance } from "@/config/api";
import { PATHS } from "@/store/configPath";

import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import {
    fetchWarrantyService,
    updateWarrantyService
} from "@/store/slices/warrantyservice/warrantyserviceAction";

interface ActiveWarrantyService {
    id: string;
    noiDung: string;
    baoHanh: number;
}

interface EditWarrantyServiceDialogProps {
    opened: boolean;
    onClose: () => void;
    Data: ActiveWarrantyService | undefined;
    activePage: number;
    searchValue: string | undefined;
}

interface EditDataWarrantyService {
    id: string;
    noiDung: string;
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

export default function EditWarrantyServiceDialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: EditWarrantyServiceDialogProps) {
    const [loading, setLoading] = useState(false);
    const [baoHanhOptions, setBaoHanhOptions] = useState<{ value: string, label: string }[]>([]);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const form = useForm<EditDataWarrantyService>({
        validateInputOnBlur: true,
        initialValues: {
            id: "",
            noiDung: "",
            baoHanhId: "",
        },
        validate: {
            noiDung: (value: string) => {
                if (!value) return "Nội dung không được để trống";
                if (value.length >= 100) return "Số lượng không vượt quá 100 kí tự";
                return null;
            },
            baoHanhId: (value) => (!value ? "Bảo hành không được để trống" : null),
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
                message: "Không thể tải dữ liệu bảo hành",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (values: EditDataWarrantyService) => {
        setLoading(true);
        try {
            const formattedValues = {
                ...values,
                baoHanhId: Number(values.baoHanhId)
            };

            const res = await dispatch(updateWarrantyService(formattedValues));
            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Cập nhật thành công",
                    message: "Phương thức bảo hành đã được cập nhật thành công.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                await dispatch(fetchWarrantyService({ activePage, searchValue }));
                form.reset();
                onClose();
            } else {
                notifications.show({
                    title: "Cập nhật thất bại",
                    message: res.payload.message || "Phương thức bảo hành chưa được cập nhật.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            notifications.show({
                title: "Lỗi",
                message: "Đã xảy ra lỗi khi cập nhật phương thức bảo hành.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (opened) {
            loadAllBaoHanh();
        }
    }, [opened]);

    useEffect(() => {
        if (Data && baoHanhOptions.length > 0) {
            form.setValues({
                id: Data.id,
                noiDung: Data.noiDung,
                baoHanhId: Data.baoHanh.toString(),
            });
        }
    }, [Data, baoHanhOptions]);

    return (
        <>
            <FullScreenLoader visible={loading} />
            <Modal
                opened={opened}
                onClose={() => {
                    form.reset();
                    onClose();
                }}
                title="Chỉnh sửa dịch vụ bảo hành"
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
                        <Button
                            type="submit"
                            size="sm"
                            loading={loading}
                        >
                            Lưu
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
