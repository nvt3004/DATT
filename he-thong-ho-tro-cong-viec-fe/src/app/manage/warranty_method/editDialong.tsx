"use client";
import { Modal, Button, TextInput, Group, Textarea, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { nestApiInstance } from "@/config/api";
import { PATHS } from "@/store/configPath";

import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import {
    fetchWarrantyMethod,
    updateWarrantyMethod
} from "@/store/slices/warrantymethod/warrantymethodAction";

interface ActiveWarrantyMethod {
    id: string;
    noiDung: string;
    moTa: string;
    baoHanh: number;
}

interface EditWarrantyMethodDialogProps {
    opened: boolean;
    onClose: () => void;
    Data: ActiveWarrantyMethod | undefined;
    activePage: number;
    searchValue: string | undefined;
}

interface EditDataWarrantyMethod {
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

export default function EditWarrantyMethodDialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: EditWarrantyMethodDialogProps) {
    const [loading, setLoading] = useState(false);
    const [baoHanhOptions, setBaoHanhOptions] = useState<{ value: string, label: string }[]>([]);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const form = useForm<EditDataWarrantyMethod>({
        validateInputOnBlur: true,
        initialValues: {
            id: "",
            noiDung: "",
            moTa: "",
            baoHanhId: "",
        },
        validate: {
            noiDung: (value: string) => {
                if (!value) return "Nội dung không được để trống";
                if (value.length >= 100) return "Số lượng không vượt quá 100 kí tự";
                return null;
            },
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
                    label: bh.moTa.toString(),
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

    const handleUpdate = async (values: EditDataWarrantyMethod) => {
        setLoading(true);
        try {
            const formattedValues = {
                ...values,
                baoHanhId: Number(values.baoHanhId)
            };

            const res = await dispatch(updateWarrantyMethod(formattedValues));
            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Chỉnh sửa thành công",
                    message: "Phương thức bảo hành đã được chỉnh sửa.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                await dispatch(fetchWarrantyMethod({ activePage, searchValue }));
                onClose();
            } else {
                notifications.show({
                    title: "Chỉnh sửa thất bại",
                    message: "Có lỗi xảy ra khi cập nhật phương thức bảo hành.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            notifications.show({
                title: "Lỗi hệ thống",
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
                moTa: Data.moTa,
                baoHanhId: Data.baoHanh?.toString() || "", // Đảm bảo baoHanh là chuỗi
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
                title="Cập nhật phương thức bảo hành"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleUpdate)}>

                    <TextInput
                        label="Nội dung"
                        placeholder="Nhập nội dung phương thức bảo hành"
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
                        maxDropdownHeight={200}
                    />
                    <Group mt="xl" justify="flex-end">
                        <Button
                            type="submit"
                            size="sm"
                            loading={loading}
                        >
                            Cập nhật
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
