"use client";
import { Modal, Button, TextInput, Group, Textarea, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import { fetchHangmuc, updateHangmuc } from "@/store/slices/hangmuc/hangmucAction";
import { nestApiInstance } from "@/config/api";
import { PATHS } from "@/store/configPath";

interface EditDataHangmuc {
    id: number;
    ten: string;
    gia: number;
    soLuong: number;
    moTa: string;
    donViTinhId: string;
}
interface Edit_Hangmuc_Dialog_Props {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
    Data?: EditDataHangmuc | any
}

interface DonViTinh {
    id: number;
    ten: string;
}

export default function Edit_Hangmuc_Dialog({
    opened,
    onClose,
    Data,
    activePage,
    searchValue,
}: Edit_Hangmuc_Dialog_Props) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [loading, setLoading] = useState(false);
    const [donViTinhOptions, setDonViTinhOptions] = useState<{ value: string, label: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<EditDataHangmuc>({
        initialValues: {
            id: 0,
            ten: "",
            gia: 0,
            soLuong: 0,
            moTa: "",
            donViTinhId: ""
        },
        validate: {
            ten: (value: string) => (!value ? "Hạng mục không được để trống" : value.length >= 50 ? "Số lượng không vượt quá 50 kí tự" : null),
            gia: (value) => {
                if (!value) {
                    return "Giá không được để trống";
                }
                if (Number(value) < 1000) {
                    return "Giá không được nhỏ hơn 1000";
                }
                return null;
            },
            soLuong: (value) => (Number(value) < 0 ? "Số lượng không được âm" : !value ? "Số lượng không được để trống" : null),
            donViTinhId: (value) => (!value ? "Đơn vị tính không được để trống" : null),
            moTa: (value) => (!value ? "Mô tả không được để trống" : null),
        },
    });

    const loadDonViTinhOptions = async () => {
        setLoading(true);
        try {
            const response = await nestApiInstance.get(`${PATHS.DONVITINH}?page=1&size=100`);
            if (response.data?.result?.content) {
                const options = response.data.result.content.map((dvt: DonViTinh) => ({
                    value: dvt.id.toString(),
                    label: dvt.ten
                }));
                setDonViTinhOptions(options);
            } else {
                notifications.show({
                    title: "Thông báo",
                    message: "Không có dữ liệu đơn vị tính",
                    color: "blue",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            notifications.show({
                title: "Lỗi",
                message: "Không thể tải danh sách đơn vị tính",
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
            loadDonViTinhOptions();
        }
    }, [opened]);
    useEffect(() => {
        if (Data) {
            form.setValues({
                id: Data.id,
                ten: Data.ten,
                gia: Data.gia,
                soLuong: Data.soLuong,
                moTa: Data.moTa,
                donViTinhId: Data.donViTinh?.toString() ?? "",
            });
        }
    }, [opened, Data]);



    const handleUpdate = async (values: EditDataHangmuc) => {

        setLoading(true);
        try {
            const formattedValues: any = {
                ...values,
            };

            const data_edit = {
                id: formattedValues.id,
                ten: formattedValues.ten,
                gia: formattedValues.gia,
                soLuong: formattedValues.soLuong,
                moTa: formattedValues.moTa,
                donViTinhId: Number(formattedValues.donViTinhId)
            }
            const res = await dispatch(updateHangmuc(data_edit));

            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Chỉnh sửa thành công",
                    message: "Hạng mục đã được chỉnh sửa thành công.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                await dispatch(fetchHangmuc({ activePage, searchValue }));
                onClose();
            } else {
                notifications.show({
                    title: "Chỉnh sửa thất bại",
                    message: res.payload.message || "Hạng mục chưa được chỉnh sửa.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            notifications.show({
                title: "Lỗi hệ thống",
                message: "Đã xảy ra lỗi khi cập nhật hạng mục.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <FullScreenLoader visible={loading} />
            <Modal
                opened={opened}
                onClose={onClose}
                title="Cập nhật hạng mục"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleUpdate)}>
                    <TextInput
                        placeholder="Nhập tên hạng mục"
                        {...form.getInputProps("id")}
                        type="hidden"
                    />
                    <TextInput
                        label="Tên"
                        placeholder="Nhập tên hạng mục"
                        {...form.getInputProps("ten")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextInput
                        label="Giá"
                        placeholder="Nhập giá"
                        {...form.getInputProps("gia")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                        type="number"
                    />
                    <TextInput
                        label="Số lượng"
                        placeholder="Nhập số lượng"
                        {...form.getInputProps("soLuong")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                        type="number"
                    />
                    <Select
                        label="Đơn Vị Tính"
                        placeholder="Chọn đơn vị tính"
                        data={donViTinhOptions}
                        value={form.values.donViTinhId}
                        onChange={(value) => form.setFieldValue("donViTinhId", value || "")}
                        error={form.errors.donViTinh}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                        searchable
                        clearable
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

                    <Group mt="xl" justify="flex-end">
                        <Button type="submit" size="sm" disabled={loading}>
                            Cập nhật
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}