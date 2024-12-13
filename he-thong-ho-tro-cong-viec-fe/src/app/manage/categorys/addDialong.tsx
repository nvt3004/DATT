import { Modal, Button, TextInput, Textarea, Group, Select } from "@mantine/core";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { nestApiInstance } from "@/config/api";
import { addHangmuc, fetchHangmuc } from "@/store/slices/hangmuc/hangmucAction";
import { PATHS } from "@/store/configPath";

interface NewDataHangmuc {
    ten: string;
    moTa: string;
    gia: number;
    soLuong: number;
    donViTinh: string;
}

interface AddHangmucDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: any | undefined;
}

interface DonViTinh {
    id: number;
    ten: string;
    moTa: string;
}

export default function Add_Hangmuc_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddHangmucDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [donViTinhOptions, setDonViTinhOptions] = useState<{ value: string, label: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<NewDataHangmuc>({
        initialValues: {
            ten: "",
            moTa: "",
            gia: 0,
            soLuong: 0,
            donViTinh: ""
        },
        validate: {
            ten: (value) => (!value ? "Tên không được để trống" : value.length >= 50 ? "Số lượng không vượt quá 50 kí tự" : null),
            gia: (value) => (value < 0 ? "Giá không được âm" : !value ? "Giá không được để trống" : null),
            soLuong: (value) => (value < 0 ? "Số lượng không được âm" : !value ? "Số lượng không được để trống" : null),
            donViTinh: (value) => (!value ? "Đơn vị tính không được để trống" : null),
            moTa: (value) => (!value ? "Mô tả không được để trống" : null),
        },
    });

    const loadDonViTinhOptions = async () => {
        setIsLoading(true);
        try {
            const response = await nestApiInstance.get(
                `${PATHS.DONVITINH}?page=1&size=100`
            );

            if (response.data && response.data.result && response.data.result.content) {
                const donViTinhData: DonViTinh[] = response.data.result.content;

                const options = donViTinhData.map(dvt => ({
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
            console.error('Error fetching don vi tinh:', error);
            notifications.show({
                title: "Lỗi",
                message: "Không thể tải danh sách đơn vị tính",
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
            loadDonViTinhOptions();
        }
    }, [opened]);

    const handleSave = async (values: NewDataHangmuc) => {
        try {
            const formattedValues = {
                ...values,
                gia: Number(values.gia),
                soLuong: Number(values.soLuong),
                donViTinh: Number(values.donViTinh)
            };

            const data_add ={
                ten: formattedValues.ten,
                gia: formattedValues.gia,
                soLuong: formattedValues.soLuong,
                moTa: formattedValues.moTa,
                donViTinhId: formattedValues.donViTinh
            }
            

            const res = await dispatch(addHangmuc(data_add));

            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Thêm thành công",
                    message: "Hạng mục đã được thêm thành công.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                await dispatch(fetchHangmuc({ activePage, searchValue }));
                form.reset();
                onClose();
            } else {
                notifications.show({
                    title: "Thêm thất bại",
                    message: res.payload.message || "Hạng mục chưa được thêm.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error('Error saving:', error);
            notifications.show({
                title: "Lỗi",
                message: "Đã xảy ra lỗi khi thêm hạng mục.",
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
            title="Thêm hạng mục"
            size="lg"
            padding="sm"
        >
            <form onSubmit={form.onSubmit(handleSave)}>
                <TextInput
                    label="Tên"
                    placeholder="Nhập tên hạng mục"
                    {...form.getInputProps("ten")}
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                />
                <TextInput
                    label="Giá"
                    type="number"
                    placeholder="Nhập giá hạng mục"
                    {...form.getInputProps("gia")}
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                />
                <TextInput
                    label="Số lượng"
                    type="number"
                    placeholder="Nhập số lượng"
                    {...form.getInputProps("soLuong")}
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                />
                <Select
                    label="Đơn Vị Tính"
                    placeholder="Chọn đơn vị tính"
                    data={donViTinhOptions}
                    value={form.values.donViTinh}
                    onChange={(value) => {
                        form.setFieldValue("donViTinh", value || "");
                    }}
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
                    <Button type="submit" size="sm">
                        Thêm
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}