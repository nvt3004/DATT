import {
    Modal,
    Button,
    TextInput,
    Textarea,
    Group,
    Select,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { nestApiInstance } from "@/config/api";
import { PATHS } from "@/store/configPath";
import {
    addNhom_chucnang,
    addNhom_chucnangTacNhan,
    fetchNhom_chucnang,
} from "@/store/slices/nhom_chucnang/nhom_chucnangAction";
import { fetchWrranty } from "@/store/slices/warranty/warrantyAction";
import { useSelector } from "react-redux";
import { fetchAgent } from "@/store/slices/agent_used/agentUsedAction";

interface NewDataNhom_chucnang {
    ten: string;
    moTa: string;
    hangMuc: string;
    tacNhanId: any;
}

interface AddNhomchucnangDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

interface HangMuc {
    id: number;
    ten: string;
    moTa: string;
}

export default function Add_Nhomchucnang_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddNhomchucnangDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [isLoading, setIsLoading] = useState(false);
    const [hangMucOptions, setHangMucOptions] = useState<
        { value: string; label: string }[]
    >([]);
    const tacnhan = useSelector((state: any) => state.agent);
    useEffect(() => {
        const activePage = 1;
        const searchValue = "100";
        dispatch(fetchAgent({ activePage, searchValue }));
    }, [dispatch, activePage, searchValue]);

    const form = useForm<NewDataNhom_chucnang>({
        initialValues: {
            ten: "",
            moTa: "",
            hangMuc: "",
            tacNhanId: "",
        },
        validate: {
            ten: (value) => {
                if (!value) return "Tên không được để trống";
                if (value.length >= 50) {
                    return "Số lượng không vượt quá 50 kí tự";
                }
                return null;
            },
            hangMuc: (value) =>
                !value ? "Hạng mục không được để trống" : null,
            moTa: (value) => (!value ? "Mô tả không được để trống" : null),
            tacNhanId: (value) => (!value ? "Mô tả không được để trống" : null),
        },
    });

    const loadHangMucOptions = async () => {
        setIsLoading(true);
        try {
            const response = await nestApiInstance.get(
                `${PATHS.HANGMUC_PM}?page=1&size=100`
            );

            if (
                response.data &&
                response.data.result &&
                response.data.result.content
            ) {
                const hangMucData: HangMuc[] = response.data.result.content;

                const options = hangMucData.map((hm) => ({
                    value: hm.id.toString(),
                    label: hm.ten,
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
            console.error("Error fetching hang muc:", error);
            notifications.show({
                title: "Lỗi",
                message: "Không thể tải danh sách hạng mục",
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
            loadHangMucOptions();
        }
    }, [opened]);

    const handleSave = async (values: NewDataNhom_chucnang) => {
        try {
            const formattedValues = {
                ...values,
                hangMucId: Number(values.hangMuc),
            };

            const data_add = {
                ten: formattedValues.ten,
                moTa: formattedValues.moTa,
                hangMucId: formattedValues.hangMucId,
            };
           

            setIsLoading(true);

            const res = await dispatch(addNhom_chucnang(data_add));
            if (res.payload.code === 1000) {
                notifications.show({
                    title: "Thêm thành công",
                    message: "Nhóm chức năng đã được thêm thành công.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                const data_addnhomchucnangtacnhan = {
                    nhomChucNangId: res.payload.result.id,
                    tacNhanId: formattedValues.tacNhanId,
                };
               
                const resnhomchucnangtacnhan = await dispatch(addNhom_chucnangTacNhan(data_addnhomchucnangtacnhan))
                await dispatch(fetchNhom_chucnang({ activePage, searchValue }));
                form.reset();
                onClose();
            } else {
                notifications.show({
                    title: "Thêm thất bại",
                    message:
                        res.payload.message || "Nhóm chức năng chưa được thêm.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error("Error saving:", error);
            notifications.show({
                title: "Lỗi",
                message: "Đã xảy ra lỗi khi thêm nhóm chức năng.",
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const selectOptions = tacnhan?.items?.result?.content?.map((option: any) => ({
        value: option.id.toString(),
        label: option.ten,
    }));
    return (
        <Modal
            opened={opened}
            onClose={() => {
                form.reset();
                onClose();
            }}
            title="Thêm nhóm chức năng"
            size="lg"
            padding="sm"
        >
            <form onSubmit={form.onSubmit(handleSave)}>
                <TextInput
                    label="Tên"
                    placeholder="Nhập tên nhóm chức năng"
                    {...form.getInputProps("ten")}
                    size="sm"
                    style={{ marginBottom: "1rem" }}
                    withAsterisk
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
                    withAsterisk
                />
                <Select
                    label="Tác nhân sử dụng"
                    withAsterisk
                    placeholder="Tùy chọn"
                    data={selectOptions}
                    key={form.key("tacNhanId")}
                    {...form.getInputProps("tacNhanId")}
                    style={{ width: "100%" }}
                    className="mr-4"
                />
                <Textarea
                    label="Mô tả"
                    placeholder="Nhập mô tả"
                    resize="vertical"
                    {...form.getInputProps("moTa")}
                    style={{ marginBottom: "1rem" }}
                    withAsterisk
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
