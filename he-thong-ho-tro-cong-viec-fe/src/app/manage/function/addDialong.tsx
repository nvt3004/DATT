import { Modal, Button, TextInput, Textarea, Group, Select } from "@mantine/core";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { nestApiInstance } from "@/config/api";
import { addChucnang, fetchChucnang } from "@/store/slices/chucnang/chucnangAction";
import { PATHS } from "@/store/configPath";

interface NewDataChucnang {
    ten: string;
    moTa: string;
    gia: number;
    nhomChucNang: string;
}

interface AddChucnangDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

interface NhomChucNang {
    id: number;
    ten: string;
    moTa: string;
    hangMuc: number;
}

export default function Add_Chucnang_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddChucnangDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [nhomChucNangOptions, setNhomChucNangOptions] = useState<{ value: string, label: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<NewDataChucnang>({
        initialValues: {
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

    const handleSave = async (values: NewDataChucnang) => {
        try {

            const formattedValues = {
                ...values,
                gia: Number(values.gia),
                nhomChucNang: Number(values.nhomChucNang)
            };
            
            const data_add = {
                ten: formattedValues.ten,
                moTa: formattedValues.moTa,
                gia: formattedValues.gia,
                nhomChucNangId: formattedValues.nhomChucNang
            }

            const res = await dispatch(addChucnang(data_add));

            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Thêm thành công",
                    message: "Chức năng đã được thêm thành công.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                await dispatch(fetchChucnang({ activePage, searchValue }));
                form.reset();
                onClose();
            } else {
                notifications.show({
                    title: "Thêm thất bại",
                    message: res.payload.message || "Chức năng chưa được thêm.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error('Error saving:', error);
            notifications.show({
                title: "Lỗi",
                message: "Đã xảy ra lỗi khi thêm chức năng.",
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
            title="Thêm chức năng"
            size="lg"
            padding="sm"
        >
            <form onSubmit={form.onSubmit(handleSave)}>
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
                    onChange={(value) => {
                        form.setFieldValue("nhomChucNang", value || "");
                    }}
                    error={form.errors.nhomChucNang}
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