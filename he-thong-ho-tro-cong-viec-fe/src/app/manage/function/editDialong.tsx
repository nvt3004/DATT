import { Modal, Button, TextInput, Textarea, Group, Select } from "@mantine/core";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { nestApiInstance } from "@/config/api";
import { updateChucnang, fetchChucnang } from "@/store/slices/chucnang/chucnangAction";
import { PATHS } from "@/store/configPath";

interface EditDataChucnang {
    id: number;
    ten: string;
    moTa: string;
    gia: number;
    nhomChucNang: string;
}

interface EditChucnangDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
    data?: EditDataChucnang;
}

interface NhomChucNang {
    id: number;
    ten: string;
    moTa: string;
    hangMuc: number;
}

export default function Edit_Chucnang_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
    data,
}: EditChucnangDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [nhomChucNangOptions, setNhomChucNangOptions] = useState<{ value: string, label: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<EditDataChucnang>({
        initialValues: {
            id: 0,
            ten: "",
            moTa: "",
            gia: 0,
            nhomChucNang: ""
        },
        validate: {
            ten: (value) => (!value ? "Tên không được để trống" : value.length >= 50 ? "Số lượng không vượt quá 50 kí tự" : null),
            gia: (value) => (value < 0 ? "Giá không được âm" : !value ? "Giá không được để trống" : null),
            nhomChucNang: (value) => (!value ? "Nhóm chức năng không được để trống" : null),
            moTa: (value) => (!value ? "Mô tả không được để trống" : null),
        },
    });

    const loadNhomChucNangOptions = async () => {
        setIsLoading(true);
        try {
            const response = await nestApiInstance.get(
                `${PATHS.NHOMCHUCNANG}?page=1&size=100`
            );

            if (response.data && response.data.result && response.data.result.content) {
                const nhomChucNangData: NhomChucNang[] = response.data.result.content;

                const options = nhomChucNangData.map(ncn => ({
                    value: ncn.id.toString(),
                    label: ncn.ten
                }));

                setNhomChucNangOptions(options);
            } else {
                notifications.show({
                    title: "Thông báo",
                    message: "Không có dữ liệu nhóm chức năng",
                    color: "blue",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error('Error fetching nhom chuc nang:', error);
            notifications.show({
                title: "Lỗi",
                message: "Không thể tải danh sách nhóm chức năng",
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
            loadNhomChucNangOptions();
        }
    }, [opened]);

    useEffect(() => {
        if (data) {
            form.setValues({
                id: data.id,
                ten: data.ten,
                gia: data.gia,
                nhomChucNang: data.nhomChucNang?.toString() || "",
                moTa: data.moTa,
            });
        }
    }, [data]);

    const handleUpdate = async (values: EditDataChucnang) => {
        try {
            const formattedValues = {
                ...values,
                gia: Number(values.gia),
                nhomChucNangId: Number(values.nhomChucNang)
            };

            const data_edit = {
                id: formattedValues.id,
                ten: formattedValues.ten,
                gia: formattedValues.gia,
                moTa: formattedValues.moTa,
                nhomChucNangId: Number(values.nhomChucNang)
            }

            const res = await dispatch(updateChucnang(data_edit));

            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Cập nhật thành công",
                    message: "Chức năng đã được cập nhật thành công.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                await dispatch(fetchChucnang({ activePage, searchValue }));
                onClose();
            } else {
                notifications.show({
                    title: "Cập nhật thất bại",
                    message: res.payload.message || "Chức năng chưa được cập nhật.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            notifications.show({
                title: "Lỗi",
                message: "Đã xảy ra lỗi khi cập nhật chức năng.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Cập nhật chức năng"
            size="lg"
            padding="sm"
        >
            <form onSubmit={form.onSubmit(handleUpdate)}>
                <TextInput
                    {...form.getInputProps("id")}
                    type="hidden"
                />
                <TextInput
                    label="Tên"
                    placeholder="Nhập tên chức năng"
                    {...form.getInputProps("ten")}
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                />
                <TextInput
                    label="Giá"
                    type="number"
                    placeholder="Nhập giá chức năng"
                    {...form.getInputProps("gia")}
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                />
                <Select
                    label="Nhóm Chức Năng"
                    placeholder="Chọn nhóm chức năng"
                    data={nhomChucNangOptions}
                    value={form.values.nhomChucNang}
                    onChange={(value) => form.setFieldValue("nhomChucNang", value || "")}
                    error={form.errors.nhomChucNang}  // Hiển thị lỗi nếu không có lựa chọn
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
                    <Button type="submit" size="sm">
                        Cập nhật
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}