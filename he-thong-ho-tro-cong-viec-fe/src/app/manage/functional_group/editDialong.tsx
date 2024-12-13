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
    fetchNhom_chucnang,
    updateNhom_chucnang
} from "@/store/slices/nhom_chucnang/nhom_chucnangAction";

interface ActiveUser {
    id: string;
    ten: string;
    moTa: string;
    hangMuc: number;
}

interface Edit_Nhomchucnang_Dialog_Props {
    opened: boolean;
    onClose: () => void;
    Data: ActiveUser | undefined;
    activePage: number;
    searchValue: string | undefined;
}

interface EditDataNhom_chucnang {
    id: string;
    ten: string;
    moTa: string;
    hangMuc: string;
}

interface HangMuc {
    id: number;
    ten: string;
    moTa: string;
}

interface ApiResponse {
    result: {
        content: HangMuc[];
        totalElements: number;
    };
}

export default function Edit_Nhomchucnang_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: Edit_Nhomchucnang_Dialog_Props) {
    const [loading, setLoading] = useState(false);
    const [hangMucOptions, setHangMucOptions] = useState<{ value: string, label: string }[]>([]);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    console.log("check Data porps edit", Data);
    

    const form = useForm<EditDataNhom_chucnang>({
        validateInputOnBlur: true,
        initialValues: {
            id: "",
            ten: "",
            moTa: "",
            hangMuc: "",
        },
        validate: {
            ten: (value: string) => {
                if (!value) return "Tên không được để trống";
                if (value.length >= 50) return "Số lượng không vượt quá 50 kí tự";
                return null;
            },
            hangMuc: (value) => (!value ? "Hạng mục không được để trống" : null),
            moTa: (value) => (!value ? "Mô tả không được để trống" : null),

        },
    });

    const loadAllHangMuc = async () => {
        setLoading(true);
        try {
            // First, get total count
            const initialResponse = await nestApiInstance.get<ApiResponse>(
                `${PATHS.HANGMUC_PM}?page=1&size=1`
            );

            // Then fetch all data in one request
            const response = await nestApiInstance.get<ApiResponse>(
                 `${PATHS.HANGMUC_PM}?page=1&size=100`
            );

            if (response.data?.result?.content) {
                const hangMucData = response.data.result.content;
                const options = hangMucData.map(hm => ({
                    value: hm.id.toString(),
                    label: hm.ten
                }));

                setHangMucOptions(options);
            } else {
                notifications.show({
                    title: "Thông báo",
                    message: "Không có dữ liệu hạng mục",
                    color: "blue",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error('Error fetching hang muc:', error);
            notifications.show({
                title: "Lỗi",
                message: "Không thể tải danh sách hạng mục",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values: EditDataNhom_chucnang) => {
        setLoading(true);
        try {
            const formattedValues = {
                ...values,
                hangMuc: Number(values.hangMuc)
            };


            const data_edit = {
                id: formattedValues.id,
                ten: formattedValues.ten,
                moTa: formattedValues.moTa,
                hangMucId: formattedValues.hangMuc
            }
            

            const res = await dispatch(updateNhom_chucnang(data_edit));
            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Chỉnh sửa thành công",
                    message: "Nhóm chức năng đã chỉnh sửa.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                await dispatch(fetchNhom_chucnang({ activePage, searchValue }));
                onClose();
            } else {
                notifications.show({
                    title: "Chỉnh sửa thất bại",
                    message: "Có lỗi xảy ra khi cập nhật Nhóm chức năng không thành công.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            notifications.show({
                title: "Lỗi hệ thống",
                message: "Đã xảy ra lỗi khi cập nhật nhóm chức năng.",
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
            loadAllHangMuc();
        }
    }, [opened]);

    useEffect(() => {
        if (Data) {
            form.setValues({
                id: Data.id,
                ten: Data.ten,
                moTa: Data.moTa,
                hangMuc: Data.hangMuc?.toString() || "",
            });
        }
    }, [Data]);

    return (
        <>
            <FullScreenLoader visible={loading} />
            <Modal
                opened={opened}
                onClose={() => {
                    form.reset();
                    onClose();
                }}
                title="Cập nhật nhóm chức năng"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleUpdate)}>
                    <TextInput
                        placeholder="ID"
                        {...form.getInputProps("id")}
                        type="hidden"
                    />
                    <TextInput
                        label="Tên"
                        placeholder="Nhập tên nhóm chức năng"
                        {...form.getInputProps("ten")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                    />
                    <Select
                        label="Hạng mục"
                        placeholder="Chọn hạng mục"
                        data={hangMucOptions}
                        value={form.values.hangMuc}
                        onChange={(value) => {
                            form.setFieldValue("hangMuc", value || "");
                        }}
                        error={form.errors.hangMuc}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                        searchable
                        clearable
                        maxDropdownHeight={200}
                    />
                    <Textarea
                        label="Mô tả"
                        placeholder="Nhập mô tả"
                        resize="vertical"
                        {...form.getInputProps("moTa")}
                        style={{ marginBottom: "1rem" }}
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