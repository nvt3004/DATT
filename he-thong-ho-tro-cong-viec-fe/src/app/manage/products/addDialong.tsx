import {
    Modal,
    Button,
    TextInput,
    Group,
    Select,
    Textarea,
} from "@mantine/core";
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { addAdvise, fetchAdvise } from "@/store/slices/advise/adviseAction";
import { useEffect } from "react";
import { fetchWrranty } from "@/store/slices/warranty/warrantyAction";
import { useSelector } from "react-redux";
import { addPackage, fetchPackage } from "@/store/slices/product/productAction";

interface AddAdviseDialogProps {
    opened: boolean;
    onClose: () => void;
    activePage: number;
    searchValue: string | undefined;
}

export default function Add_Product_Dialog({
    opened,
    onClose,
    activePage,
    searchValue,
}: AddAdviseDialogProps) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { items, loading, error } = useSelector((state: any) => state.wrranty);    
    useEffect(() => {
        const pagedata = {
            activePage: 1,
            searchValue: "100",
        };
        dispatch(fetchWrranty(pagedata));
    }, [dispatch, activePage, searchValue]);

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
            ten: "",
            moTa: "",
            baoHanhId: "",
        },
        validate: {
            ten: (value: string) => {
                if (!value) return "Tên Sản phẩm không được để trống";

                if (value.length >= 100) {
                    return "Số lượng không vượt quá 100 kí tự";
                }
                return null;
            },
            moTa: (value: string) => {
                if (!value) return "Mô tả không được để trống";

                if (value.length >= 250) {
                    return "Số lượng không vượt quá 250 kí tự";
                }
                return null;
            },
            baoHanhId: (value: string) => {
                if (!value) return "Mô tả không được để trống";

                if (value.length >= 250) {
                    return "Số lượng không vượt quá 250 kí tự";
                }
                return null;
            },
        },
    });
    const handleSave = async (values: typeof form.values) => {
        const convertData = {
            ten: values?.ten,
            moTa: values?.moTa,
            baoHanhId: Number(values?.baoHanhId)
        }

        const res = await dispatch(addPackage(convertData));
        if (res.payload.code === 1000) {
            notifications.show({
                title: "Thêm thành công",
                message: "Sản phẩm đã được thêm.",
                color: "teal",
                autoClose: 3000,
                position: "top-right",
            });
        } else {
            notifications.show({
                title: "Thêm Thất bại",
                message: `${res.payload.response.data.message}`,
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
         dispatch(fetchPackage({ activePage, searchValue }));
        form.reset();
        onClose();
    };
    const selectOptionsBaoHanh = items?.content?.map((option: any) => ({
        value: option.id.toString(),
        label: option.moTa,
    }));
    return (
        <>
            <Modal
                opened={opened}
                onClose={onClose}
                title="Thêm sản phẩm"
                size="lg"
                padding="sm"
            >
                <form onSubmit={form.onSubmit(handleSave)}>
                    <TextInput
                        label="Sản phẩm"
                        placeholder="Nhập tên sản phẩm"
                        key={form.key("ten")}
                        {...form.getInputProps("ten")}
                        size="sm"
                        style={{ marginBottom: "1rem" }}
                    />
                    <Textarea
                        label="Mô tả"
                        placeholder="Nhập mô tả"
                        resize="vertical"
                        key={form.key("moTa")}
                        {...form.getInputProps("moTa")}
                        style={{ marginBottom: "1rem" }}
                        minRows={4}
                        maxRows={10}
                        autosize
                    />
                    <Select
                        label="Bảo hành"
                        placeholder="Chọn bảo hành"
                        key={form.key("baoHanhId")}
                        data={selectOptionsBaoHanh}
                        {...form.getInputProps("baoHanhId")}
                        style={{ marginBottom: "1rem" }}
                        size="sm"
                    />
                    <Group mt="xl" justify="flex-end">
                        <Button type="submit" size="sm">
                            Thêm
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
